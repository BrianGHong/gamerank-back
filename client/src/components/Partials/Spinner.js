import React from 'react';
import { css } from "@emotion/core";
import PacmanLoader from 'react-spinners/PacmanLoader';

export class Spinner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const custom = css`
            display: block;
            margin: 0 auto;
            margin-top: 20vh;
        `;

        const divStyle= {
            "height": "100vh"
        };

        return (
            <div className="container d-block" style={divStyle}>
                <PacmanLoader
                    css={custom}
                    color={"orange"}
                /><br/>
            </div>
        );
    }
}