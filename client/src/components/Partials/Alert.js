import React from 'react';

export class Alert extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.type) {
            return (
                <div className={`container alert alert-${this.props.type} alert-dismissible fade show`} role="alert">
                    <strong>{this.props.message}</strong>
                </div>
            )
        }
        return <div></div>
    }
}