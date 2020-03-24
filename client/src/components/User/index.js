import React from 'react';
import './index.css';

import {GameIcon} from './GameIcon';

export class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container">
            
                <h1>User's Favorites: </h1>
                <div id="gamecards" className="card-deck">
                    <GameIcon title="Hello" url="https://images.igdb.com/igdb/image/upload/t_cover_big/co1n8t.jpg" />
                    <GameIcon title="Hello" url="https://images.igdb.com/igdb/image/upload/t_cover_big/co1j0g.jpg" />
                    <GameIcon title="Hello" url="https://images.igdb.com/igdb/image/upload/t_cover_big/co1iqw.jpg" />
                    <GameIcon title="Hello" url="https://images.igdb.com/igdb/image/upload/t_cover_big/co1r8b.jpg" />
                    <GameIcon title="Hello" url="https://images.igdb.com/igdb/image/upload/t_cover_big/co1tnr.jpg" />
                    <GameIcon title="Hello" url="https://images.igdb.com/igdb/image/upload/t_cover_big/co1rbi.jpg" />
                    <GameIcon title="Hello" url="https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcp.jpg" />
                    <GameIcon title="Hello" url="https://images.igdb.com/igdb/image/upload/t_cover_big/co1n83.jpg" />
                    <GameIcon title="Hello" url="https://images.igdb.com/igdb/image/upload/t_cover_big/co1rgi.jpg" />
                    <GameIcon title="Hello" url="https://images.igdb.com/igdb/image/upload/t_cover_big/co1v2p.jpg" />
                </div>
                <form>
                    <button className="btn-lg btn-danger" type="submit" style={{borderRadius: "20px"}}><i className="fa fa-arrow-down"></i> Load more</button>
                </form>
                <form action={`${process.env.REACT_APP_BASE_URL}/user/logout`} method="post">
                    <input className="btn btn-warning" type="submit" value="Sign Out" />
                </form>
            </div>
        );
    }
}