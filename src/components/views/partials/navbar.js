import React, { Component, PropTypes } from "react";
import { Switch, Route } from "react-router-dom";

class Navbar extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      keyword: this.parseQueryString()["q"]
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
    if (window.location.pathname == "/") {
      this.setState({ route: "main" });
    } else {
      this.setState({ route: "search" });
    }
  }

  render() {
    return (
      <div className="navbar">
        <nav>
          <div className="nav-wrapper" style={{ padding: "0px 15px" }}>
            <a href="/" className="brand-logo">
              Searcher
            </a>
            {this.state.route == "search" ? (
              <div className="pull-left">
                <div className="header-searchBox">
                  <input type="text" defaultValue={this.state.keyword} />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
