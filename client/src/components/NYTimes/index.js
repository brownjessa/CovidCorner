import React, { Component } from "react";
import API from "../../utils/API";

class NYT extends Component {

    state = {
        Results: [],
        loading: true
    }

    // Get results from API
    componentDidMount() {
        API.getArticles()
            .then(res => {
                console.log(res.data.response.docs);
                console.log(res.data.response.docs[1].multimedia[2].url)
                this.setState({ Results: res.data.response.docs, loading: false })
            })
            .catch(err => console.error(err));
    }

    // Search the NY Times API for `this.state.search`
    handleChange = event => {
        event.preventDefault();
        this.Results(this.state.Results);
    };

    // Map the results
    render = () => {
        return (
            <div>
                <h3>Results</h3>
                {this.state.Results.length ? (
                <ul>
                    {this.state.Results.map(article => (
                        <div>
                            <li key={article._id}>
                                <h5>{article.snippet}</h5>
                                <img src={`http://static01.nyt.com/${article.multimedia[2].url}`} alt="article img" />
                                <p>{article.lead_paragraph}</p>
                                <a href={article.web_url} target="_blank">View</a>
                            </li>
                        </div>
                    ))};
                </ul>
                ):(
                    <p>Results</p>
                )}
            </div>

        )
    }
}

export default NYT;