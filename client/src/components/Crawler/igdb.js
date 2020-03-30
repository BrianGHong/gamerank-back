import axios from 'axios';
const USER_KEY = 'fbf8c51fc8298662fc1057f0e26c2399'
const HEADER = {
    'Accept': 'application/json',
    'user-key': USER_KEY
}
const DEFAULT_COVER_PATH = "/img/gg-logo.png";
const PROXY = "https://evening-scrubland-53471.herokuapp.com/";
const DOMAIN = "https://api-v3.igdb.com/";

// Helper function to make HTTP Requests to IGDB
async function igdbAPI({ endpoint, data }) {
    // console.log("Calling " + endpoint + " with " + data)
    return axios({
        url: PROXY + DOMAIN + endpoint,
        method: 'POST',
        headers: HEADER,
        data: data
    });
}

// cover query
function coverQuery({ gameID }) {
    return igdbAPI({
        endpoint: 'covers',
        data: 'fields image_id; where game = ' + gameID + ';'
    });
}

//gets the first 10 games with matching text
export async function getPreviews({ searchText }) {
    let gameData = {};
    try {
        const response = await igdbAPI({
            endpoint: 'games',
            data: 'search "' + searchText + '"; fields id, name, summary, url; limit 5;'
        });
        for (var i in response.data) {
            gameData[i] = {};
            gameData[i].id = response.data[i].id;
            gameData[i].name = response.data[i].name;
            gameData[i].summary = response.data[i].summary;
            gameData[i].url = response.data[i].url;
        }
        const numGames = response.data.length;
        let queryArray = [];
        for (let i_1 = 0; i_1 < numGames; i_1++) {
            queryArray.push(coverQuery({ gameID: gameData[i_1].id }));
        }
        const responseArray = await axios.all(queryArray);
        for (let i_2 = 0; i_2 < responseArray.length; i_2++) {
            if (responseArray[i_2].data[0]) {
                gameData[i_2].coverURL = "https://images.igdb.com/igdb/image/upload/t_cover_big/"
                    + responseArray[i_2].data[0].image_id + ".jpg";
            }
            else {
                gameData[i_2].coverURL = DEFAULT_COVER_PATH;
            }
        }
        gameData.success = true;
        return gameData;
    }
    catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
}

// retrieves background image url given game id
async function getBackground({ gameID }) {
    try {
        const response = await igdbAPI({
            endpoint: 'screenshots',
            data: 'fields image_id; where game = ' + gameID + ';'
        });
        // console.log("BG ");
        // console.log(response);
        if (response.data.length == 0){
            throw "no matching background image data";
        }
        return {
            url: "https://images.igdb.com/igdb/image/upload/t_cover_big/" + response.data[0].image_id + ".jpg",
            success: true
        };
    }
    catch (err) {
        console.error(err);
        return { url: DEFAULT_COVER_PATH, success: false };
    }
}

// retrieves first video url given game id
async function getTrailer({ gameID }) {
    try {
        const response = await igdbAPI({
            endpoint: 'game_videos',
            data: 'fields video_id; where game = ' + gameID + ';'
        });
        if (response.data.length == 0){
            throw "no matching trailer data";
        }
        return {
            url: "https://www.youtube.com/watch?v=" + response.data[0].video_id,
            success: true
        };
    }
    catch (err) {
        console.error(err);
        return { url: "/", success: false };
    }
}

// get metadata not retrieved in preview
async function getDetails({ gameID }) {
    let gameData = {};
    try {
        const response = await igdbAPI({
            endpoint: 'games',
            data: 'where id=' + gameID + '; fields first_release_date, game_modes, genres, involved_companies, platforms;'
        });
        if (response.data.length == 0){
            throw "no matching game data";
        }
        gameData.dor = new Date(response.data[0].first_release_date * 1000);
        gameData.game_modes = '(' + response.data[0].game_modes.toString() + ')';
        gameData.genres = '(' + response.data[0].genres.toString() + ')';
        gameData.platforms = '(' + response.data[0].platforms.toString() + ')';
        gameData.companies = '(' + response.data[0].involved_companies.toString() + ')';
        gameData.success = true;
        return gameData;
    }
    catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
}

// retrieves genre names given genreIDs
async function getGenres({ genreIDs }) {
    let genres = [];
    try {
        const response = await igdbAPI({
            endpoint: 'genres',
            data: 'where id=' + genreIDs + '; fields name;'
        });
        for (var i in response.data) {
            genres[i] = response.data[i].name;
        }
        return genres;
    }
    catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
}

// retrieves game modes names given modeIDs
async function getGameModes({ modeIDs }) {
    let gameModes = [];
    try {
        const response = await igdbAPI({
            endpoint: 'game_modes',
            data: 'where id=' + modeIDs + '; fields name;'
        });
        for (var i in response.data) {
            gameModes[i] = response.data[i].name;
        }
        return gameModes;
    }
    catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
}

// retrieves platform names given platformIDs
async function getPlatforms({ platformIDs }) {
    let platforms = [];
    try {
        const response = await igdbAPI({
            endpoint: 'platforms',
            data: 'where id=' + platformIDs + '; fields name;'
        });
        for (var i in response.data) {
            platforms[i] = response.data[i].name;
        }
        return platforms;
    }
    catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
}

// retrieves names of developers and publishers given gameID
async function getCompanies({ gameID }) {
    let companies = { developers: [], publishers: [] };
    try {
        const involvement = await igdbAPI({
            endpoint: 'involved_companies',
            data: 'where game=' + gameID + '; fields company, developer, publisher;'
        });
        let companyIDs = [];
        for (var i in involvement.data) {
            companyIDs.push(involvement.data[i].company);
        }
        if (companyIDs.length == 0) {
            return companies;
        }
        const names = await igdbAPI({
            endpoint: 'companies',
            data: 'where id=(' + companyIDs.toString() + '); fields name;'
        });
        for (var i in names.data) {
            for (var j in involvement.data){
                if (names.data[i].id == involvement.data[j].company){
                    if (involvement.data[j].developer) {
                        companies.developers.push(names.data[i].name);
                    }
                    if (involvement.data[j].publisher) {
                        companies.publishers.push(names.data[i].name);
                    }
                    break;
                }
            }
        }
        return companies;
    }
    catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
}

// get all data not retrieved in preview
export async function getTheRest({ gameID }) {
    try {
        let gameData = await getDetails({ gameID });
        let companies = await getCompanies({ gameID });
        gameData.bg_img = await getBackground({ gameID });
        gameData.bg_img  = gameData.bg_img.url;
        gameData.trailer = await getTrailer({ gameID });
        gameData.trailer  = gameData.trailer.url;
        if (gameData.genres) {
            gameData.genres = await getGenres({ genreIDs: gameData.genres });
        }
        if (gameData.game_modes) {
            gameData.game_modes = await getGameModes({ modeIDs: gameData.game_modes });
        }
        if (gameData.platforms) {
            gameData.platforms = await getPlatforms({ platformIDs: gameData.platforms });
        }
        gameData.developers = companies.developers;
        gameData.publishers = companies.publishers;
        delete gameData.companies
        // console.log(gameData);
        return gameData;
    }
    catch (err) {
        console.error(err);
        return { success: false };
    }
}