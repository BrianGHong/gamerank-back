import React from 'react';
import './index.css';
import { getFirst, getPreviews } from './igdb.js';
import { PreviewCard } from './PreviewCard';
import {
    BrowserRouter as Router,
    useLocation
} from 'react-router-dom'

// heavily based off of https://reacttraining.com/react-router/web/example/query-parameters
const CRAWL_SAMPLE = [
    <PreviewCard details={{
        "id": "0",
        "name": "Fire Emblem Three Houses",
        "summary": "Here, order is maintained by the Church of Seiros, which hosts the prestigious Officer’s Academy within its headquarters. You are invited to teach one of its three mighty houses, each comprised of students brimming with personality and represented by a royal from one of three territories. As their professor, you must lead your students in their academic lives and in turn-based, tactical RPG battles wrought with strategic, new twists to overcome. Which house, and which path, will you choose?",
        "url": "https://www.igdb.com/games/fire-emblem-three-houses",
        "coverURL": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1n8t.jpg"
    }}
    />
];

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export class Crawler extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            previews: [],
            waiting: true,
            search: ""
        };
        this.CrawlList = this.CrawlList.bind(this);
    }

    CrawlList() {
        if (this.state.waiting) {
            let searchText = useQuery().get("s");
            if (searchText) {
                getPreviews({ searchText }).then(results => {
                    if (results.success) {
                        let crawlResults = [];
                        for (let i = 0; i < Object.keys(results).length - 1; i++) {
                            crawlResults.push(<PreviewCard details={results[i]} />);
                        }
                        this.setState({
                            previews: crawlResults,
                            waiting: false,
                            search: searchText
                        });
                    }
                    else {
                        this.setState({
                            previews: CRAWL_SAMPLE,
                            waiting: false,
                            search: searchText
                        });
                    }
                })
            }
        }
        if (this.state.previews.length > 0) {
            return (
                <div>
                    <h3>
                        Results for &quot;{this.state.search}&quot;
                    </h3>
                    {this.state.previews.map((item) => (
                        <span key={item.props.details.id}>{item}</span>
                    ))}
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <h1>IGDB Crawler</h1>

                    <form className="form-inline" onSubmit={() => this.crawl()}>
                        <div className="input-group" role="group">
                            <input name="s" className="form-control" style={{ borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px" }} type="search" placeholder="Crawl" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="gg-item btn btn-outline-light" style={{ borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }} type="submit" >
                                    Search IGDB
                                </button>
                            </div>
                        </div>
                    </form>
                    <this.CrawlList />
                </div>
            </Router>
        )
    }
}