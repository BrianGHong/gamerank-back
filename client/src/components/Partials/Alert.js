import React from 'react';

export class Alert extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`container alert alert-${this.props.type} alert-dismissible fade show`} role="alert">
                <strong>{this.props.message}</strong>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}