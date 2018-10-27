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
  isArray = a => {
    return !!a && a.constructor === Array;
  };

  isObject = a => {
    return !!a && a.constructor === Object;
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
    let rows = [];
    for (var key in tree) {
      if (this.isArray(tree[key]) && key != "extensions") {
        rows.push(
          <span key={Math.random()}>
            <b>{key} :</b>
          </span>
        );
        let items = [];
        for (var j in tree[key]) {
          items.push(
            <div key={Math.random()} className="innerCol col s4 no-pad-mar">
              <div className="wrapper">{this.parseNestedObj(tree[key][j])}</div>
            </div>
          );
        }
        rows.push(
          <div key={Math.random()} className="row innerRow no-pad-mar">
            {items}
          </div>
        );
      } else if (this.isObject(tree[key])) {
        rows.push(
          <div key={Math.random()}>
            <span className="col-title">
              <b>{key}: </b>
            </span>
            <span>{this.parseNestedObj(tree[key])}</span>
          </div>
        );
      } else {
        console.log(key, tree[key]);
        if (key == "source") {
        } else if (key == "name") {
          rows.push(
            <a key={Math.random()} href={tree["link"]}>
              {tree[key]}
            </a>
          );
        } else if (key == "cast_link") {
          rows.push(
            <div key={Math.random()}>
              <a href={tree["cast_link"]}>View Full Cast</a>
            </div>
          );
        } else if (key == "image") {
          rows.push(
            <div key={Math.random()}>
              <img className="posterImg" src={tree[key]} width="100px" />
            </div>
          );
        } else if (key == "link") {
          rows.push(<div key={Math.random()} />);
        } else if (key == "people_also_search_for_link") {
          <div key={Math.random()}>
            <a href={tree["people_also_search_for_link"]}>
              people also search for link
            </a>
          </div>;
        } else {
          rows.push(
            <div key={Math.random()} className="item">
              <span className="col-title">
                <b>{key}</b>:
              </span>
              <span>{tree[key]}</span>
            </div>
          );
        }
      }
    }
    return <div className="">{rows}</div>;
  };

  graphParse = graph => {
    console.log(graph);
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
              <div>{this.graphParse(this.state.data.knowledge_graph)}</div>
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
