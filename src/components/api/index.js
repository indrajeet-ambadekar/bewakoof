//https://www.googleapis.com/customsearch/v1?key=AIzaSyBTC2Tc_rx9ICTBrzF_dEJLpkkcX9tNPcw&cx=017576662512468239146:omuauf_lfve&q=lectures
import React, { Component, PropTypes } from "react";
import axios from "axios";
class API extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      searchParams: ""
    };
  }

  static search(keyword) {
    var $q = new Promise((resolve, reject) => {
      axios
        .get(
          "http://localhost:9000/search?q=" + keyword,
          {},
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function(err) {
          reject(err.response);
        });
    });
    return $q;
  }

  render() {
    return <div />;
  }
}

export default API;
