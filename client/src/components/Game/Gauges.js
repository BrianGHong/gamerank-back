import React from 'react';
import ReactTooltip from 'react-tooltip';

import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

import AnimatedProgressProvider from "./Anims/AnimatedProgressProvider";


class GG extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{color: this.props.color}}>
                <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={this.props.rating}
                >
                    {percentage => (
                        <div>
                            <CircularProgressbarWithChildren
                                value={percentage}
                                circleRatio={0.75}
                                styles={buildStyles({
                                    rotation: 1 / 2 + 1 / 8,
                                    pathColor: this.props.color,
                                    trailColor: "#eee",
                                })}
                                >
                                <h1 className="gauge-f1">{percentage}%</h1>
                                <h5 id="r1head" className="gauge-f2"><i className={this.props.icon}></i> <span className="d-lg-inline d-none">{this.props.cat}</span></h5>
                            </CircularProgressbarWithChildren>
                        </div>
                    )}
                </AnimatedProgressProvider>
            </div>
        );
    }
}

export class Gauges extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const colors = {
            c1: "#f7bd00",
            c2: "#0099f7",
            c3: "#ae00ff",
            c4: "#db2100",
            c5: "#11c24c",
        }

        return (
            <div className="row">
                <div className="col-1"></div>
                <div data-tip="Story Rating" className="col-2 gp">
                    <GG 
                        cat="Story"
                        icon="fa fa-book"
                        rating={this.props.r1}
                        color={colors.c1}
                    />
                </div>
                <div data-tip="Gameplay Rating" className="col-2 gp">
                    <GG 
                        cat="Gameplay"
                        icon="fa fa-gamepad"
                        rating={this.props.r2}
                        color={colors.c2}
                    />
                </div>
                <div data-tip="Art/Music Rating" className="col-2 gp">
                    <GG 
                        cat="Art/Music"
                        icon="fa fa-paint-brush"
                        rating={this.props.r3}
                        color={colors.c3}
                    />
                </div>
                <div data-tip="Difficulty Rating" className="col-2 gp">
                    <GG 
                        cat="Difficulty"
                        icon="fa fa-bolt"
                        rating={this.props.r4}
                        color={colors.c4}
                    />
                </div>
                <div data-tip="Value Rating" className="col-2 gp">
                    <GG 
                        cat="Worth it?"
                        icon="fa fa-money"
                        rating={this.props.r5}
                        color={colors.c5}
                    />
                </div>
                <ReactTooltip />
            </div>
        );
    }
}