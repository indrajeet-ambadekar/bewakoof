import React, { Component, PropTypes } from "react";
import API from "../api/";

class Main extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      keyword: this.parseQueryString()["q"],
      data: [],
      response: {}
    };
  }
  parseQueryString = () => {
    var urlParams = {};
    var url = window.location.href;
    url.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function(
      $0,
      $1,
      $2,
      $3
    ) {
      urlParams[$1] = $3;
    });

    return urlParams;
  };
  componentDidMount() {
    let keyword = this.parseQueryString()["q"];
    let self = this;
    if (keyword) {
      API.search(keyword)
        .then(resp => {
          self.setState({ data: resp });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  parseNestedObj = tree => {
    console.log(tree);
    let rows = [];
    for (var key in tree) {
      console.log(key, tree[key]);
      if (key == "image") {
        rows.push(
          <div key={Math.random()} className="col s12">
            <img className="posterImg" src={tree[key]} width="100px" />
          </div>
        );
      }
    }
    return <div className="row">{rows}</div>;
  };

  graphParse = graph => {
    return this.parseNestedObj(graph);
  };

  render() {
    return (
      <div className="container resultContainer">
        {this.state.data.organic_results ? (
          <div className="row">
            <div className="col l8">
              {this.state.data.organic_results.map((row, i) => {
                return (
                  <div key={i} className="resultRow">
                    <div className="title">
                      <a href={row.link}>{row.title}</a>
                    </div>
                    <div className="link">{row.displayed_link}</div>
                    <div className="context">{row.snippet}</div>
                  </div>
                );
              })}
            </div>
            <div className="col l4">
              {this.graphParse(this.state.data.knowledge_graph)}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Main;
