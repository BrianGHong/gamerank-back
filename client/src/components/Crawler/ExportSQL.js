import { getTheRest, getTopGames } from './igdb.js'

const tableMap = {
    genres: 'genre',
    game_modes: 'gamemodes',
    platforms: 'platforms',
    developers: 'developer',
    publishers: 'publishers',
}
const multiVal = Object.keys(tableMap);

// https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function multivalueSQL(table, gameID, values) {
    if (values.length === 0) {
        return "";
    }
    let query = "INSERT INTO " + table + " VALUES ";
    for (var i = 0; i < values.length; i++) {
        query += "\n(" + gameID + ", '" + values[i].replace(/'/g, "\\'") + "')";
        query += i < values.length - 1 ? ", " : ";\n\n";
    }
    return query;
}

// returns SQL of all fields for 1 game
function getSQL(gameData) {
    let query = "INSERT INTO Game VALUES (\n'" +
        gameData.id + "', \n'" +
        gameData.name.replace(/'/g, "\\'") + "', \n'" +
        gameData.dor.toISOString().slice(0, 19).replace('T', ' ') + "', \n'" +
        gameData.summary.replace(/'/g, "\\'") + "', \n'" +
        gameData.url + "', \n'" +
        gameData.bg_img + "', \n'" +
        gameData.cover + "', \n'" +
        gameData.trailer + "');\n\n";

    for (const key of multiVal) {
        if (gameData[key] && gameData[key].length)
            query += multivalueSQL("Game_details_" + tableMap[key], gameData.id, gameData[key]);
    }
    return query;
}

export async function exportPreview(gameData) {
    await getTheRest(gameData);
    if (gameData.success) {
        let queries = getSQL(gameData);
        download(queries, './export-test' + gameData.id + '.sql', 'text/plain');
    }
    else {
        console.log('Something went wrong.')
    }
}

function mvSQLEntries(gameID, values) {
    if (values.length == 0) return
    let query = [];
    for (const value of values) {
        query.push("\n(" + gameID + ", '" + value.replace(/'/g, "\\'") + "')");
    }
    return query.toString();
}

export async function dump() {
    let entries = { games: [] };
    for (const key of multiVal) {
        entries[key] = [];
    }
    let response = await getTopGames();
    console.log("Starting Dump");
    for (var i in response.data) {
        if (i%50 == 0) console.log("Parsed " + i + " games!");
        let gameData = response.data[i];
        gameData.dor = new Date(gameData.first_release_date * 1000);
        await getTheRest(gameData);
        if (gameData.success) {

            entries.games.push("\n\n('" +
                gameData.id + "', \n'" +
                gameData.name.replace(/'/g, "\\'") + "', \n'" +
                gameData.dor.toISOString().slice(0, 19).replace('T', ' ') + "', \n'" +
                gameData.summary.replace(/'/g, "\\'") + "', \n'" +
                gameData.url + "', \n'" +
                gameData.bg_img + "', \n'" +
                gameData.cover + "', \n'" +
                gameData.trailer + "')"
            );

            for (const key of multiVal) {
                if (gameData[key] && gameData[key].length) entries[key].push(mvSQLEntries(gameData.id, gameData[key]));
            }
        }
        else {
            console.log('Something went wrong.')
        }
    }
    console.log("Finished Dump");

    let queries = "INSERT IGNORE INTO Game VALUES"
        + entries.games.toString() + ';\n';

    for (const key of multiVal) {
        queries += "\n\nINSERT INTO Game_details_" 
            + tableMap[key] + " VALUES"
            + entries[key].toString() + ';';
    }
    // console.log(queries);
    download(queries, 'dump_test.sql', 'text/plain');
}