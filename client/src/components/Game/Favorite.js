import axios from 'axios';
import React from 'react';

// Favorites Component
export class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: false,
            favCount: 0
        }

        this.isFavorite = this.isFavorite.bind(this);
        this.favCount = this.favCount.bind(this);
        this.updateFavorite = this.updateFavorite.bind(this);
    }

    componentDidMount() {
        this.favCount(this.props.gid);
        this.isFavorite(this.props.gid);
    }

    isFavorite(gid) {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/game/isFavorite/${gid}`)
            .then(result => {
                if (result.data.isFavorite) {
                    this.setState({
                        favorite: true,
                    });
                } else {
                    this.setState({
                        favorite: false,
                    });
                }
            })
            .catch(err => {
                this.setState({
                    error: err
                });
            });
    }

    favCount(gid) {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/game/favCount/${gid}`)
            .then(result => {
                this.setState({
                    favCount: result.data.favCount,
                });
            })
            .catch(err => {
                this.setState({
                    error: err
                });
            });
    }

    updateFavorite(gid) {
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/game/updateFavorite/${gid}`)
            .then(result => {
                this.isFavorite(gid);
                this.favCount(gid);
            })
            .catch(err => {
                this.setState({
                    error: err
                });
            });
    }

    render() {
        if (this.state.favorite) {
            return (
                <button onClick={() => this.updateFavorite(this.props.gid)} className="btn btn-secondary" style={{borderRadius: "20px"}}>
                    <i className="fa fa-heart"></i> <span className="d-none d-md-inline">Favorited!</span>
                </button>
                
            );
        } else {
            return (
                <button onClick={() => this.updateFavorite(this.props.gid)} className="btn btn-danger" style={{borderRadius: "20px"}}>
                    <i className="fa fa-heart"></i> {this.state.favCount} <span className="d-none d-md-inline">Favorite(s)</span>
                </button>
            );
        }
    }
}