// node
// vendors
import React, { Component, PropTypes } from "react";
// project
import Navbar from "./components/views/partials/navbar";
import Main from "./components/views/main";
import Search from "./components/views/search";
import { Switch, Route } from "react-router-dom";
import "./stylesheets/style.scss";

window.GAPIKEY = "AIzaSyBTC2Tc_rx9ICTBrzF_dEJLpkkcX9tNPcw";
class App extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }
  componentWillMount() {
    let self = this;
  }
  render() {
    return (
      <div className="main-app">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/search/" component={Search} />
        </Switch>
      </div>
    );
  }
}

export default App;
