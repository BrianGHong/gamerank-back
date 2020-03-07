import React from 'react';

import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

export class GG extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{color: this.props.color}}>
                <CircularProgressbarWithChildren
                    value={this.props.rating}
                    circleRatio={0.75}
                    styles={buildStyles({
                        rotation: 1 / 2 + 1 / 8,
                        pathColor: this.props.color,
                        trailColor: "#eee",
                    })}
                    >
                    <h1 className="gauge-f1">{this.props.rating}%</h1>
                    <h5 id="r1head" className="gauge-f2"><i className={this.props.icon}></i> {this.props.cat}</h5>
                </CircularProgressbarWithChildren>
            </div>
        );
    }
}