import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

export class Gauge extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{color: this.props.color, margin: "0 5px"}}>
                <CircularProgressbarWithChildren
                    value={this.props.rating}
                    circleRatio={0.75}
                    styles={buildStyles({
                        rotation: 1 / 2 + 1 / 8,
                        pathColor: this.props.color,
                        trailColor: "#eee",
                    })}
                >
                    <i className={this.props.icon + " gauge-icon"}></i>
                    <div className="gauge-main d-md-block d-none"> {this.props.rating}%</div>
                    
                </CircularProgressbarWithChildren>
                <span className="d-md-none d-block gauge-main">{Math.round(this.props.rating * 10) / 10}%</span>
            </div>
        );
    }
}