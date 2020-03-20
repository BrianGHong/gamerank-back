import React from 'react';
import './index.css'
import { getTheRest } from './igdb.js';

export class PreviewCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { exported: false };
        this.exportSQL = this.exportSQL.bind(this);
    }

    // https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
    download(data, filename, type) {
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

    multivalueSQL(table, gameID, values) {
        if (values.length == 0) {
            return "";
        }
        let query = "INSERT INTO " + table + " VALUES ";
        for (var i = 0; i < values.length; i++) {
            query += "\n(" + gameID + ", '" + values[i] + "')";
            query += i < values.length - 1 ? ", " : ";\n\n";
        }
        return query;
    }

    async exportSQL() {
        let theRest = await getTheRest({ gameID: this.props.details.id });
        this.setState({ exported: true });
        if (theRest.success) {
            let gameQuery = "INSERT INTO Game VALUES (\n'" +
                this.props.details.id + "', \n'" +
                this.props.details.name + "', \n'" +
                theRest.dor.toISOString().slice(0, 19).replace('T', ' ') + "', \n'" +
                this.props.details.summary + "', \n'" +
                this.props.details.url + "', \n'" +
                theRest.bg_img + "', \n'" +
                this.props.details.coverURL + "', \n'" +
                theRest.trailer + "');\n\n";

            let genreQuery = this.multivalueSQL("Game_details_genre", this.props.details.id, theRest.genres);
            let modeQuery = this.multivalueSQL("Game_details_gamemodes", this.props.details.id, theRest.game_modes);
            let platformQuery = this.multivalueSQL("Game_details_platforms", this.props.details.id, theRest.platforms);
            let developerQuery = this.multivalueSQL("Game_details_developers", this.props.details.id, theRest.developers);
            let publisherQuery = this.multivalueSQL("Game_details_publishers", this.props.details.id, theRest.publishers);

            let allQueries = gameQuery + genreQuery + modeQuery + platformQuery + developerQuery + publisherQuery;
            this.download(allQueries, './export-test' + this.props.details.id + '.sql', 'text/plain');
        }
        else {
            console.log('Something went wrong.')
        }

    }

    render() {
        return (
            <div>
                <div className="card gamecard">
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-4">
                            <img className="game-img" src={this.props.details.coverURL} />
                        </div>
                        <div className="col-lg-10 col-md-9 col-8" style={{ marginTop: "10px" }}>
                            <h2 style={{ wordWrap: "break-word" }}>{this.props.details.name}</h2>
                            <div className="summary">
                                {this.props.details.summary}
                            </div>
                            <div style={{ justifyContent: "space-between", alignContent: "space-between", display: "flex" }}>
                                <a href={this.props.details.url}>More information</a>
                                {this.state.exported
                                    ? <button className="btn btn-secondary btn-game" style={{ color: "white", marginRight: "10px" }} > Export </button>
                                    : <button className="btn btn-primary btn-game" style={{ color: "white", marginRight: "10px" }} onClick={() => this.exportSQL()}> Export </button>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}