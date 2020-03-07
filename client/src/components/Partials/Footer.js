import React from 'react';

export class Footer extends React.Component {
    render() {
        return (
            <div className="container">
                <hr></hr>
                <p><b>GameGauge</b> (2020) 
                    <span style={{fontSize: "13px"}}>
                    <br/>Powered by <a href="https://igdb.com">IGDB</a>
                    <br/>Made with ❤️ by Brian Hong, Carl Zhang, Peter Felland, Hua Uehara
                    </span>
                </p>
            </div>
        );
    }
}