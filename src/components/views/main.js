import React, { Component, PropTypes } from "react";

class Main extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      searchParams: ""
    };
  }
  componentWillMount() {
    console.log(this.props);
  }

  gotoSearch = () => {
    window.location.href = "/search/?q=" + this.state.searchParams;
  };

  watchInput = e => {
    if (e.keyCode == 13) {
      if (this.state.searchParams.length > 0) {
        this.gotoSearch();
      }
    } else {
      this.setState({ searchParams: e.target.value });
    }
  };

  render() {
    return (
      <div className="container" style={{ padding: "13vh 0px" }}>
        <div className="row">
          <div className="col l2" />
          <div className="col l8">
            <div className="doodle" />
            <div className="inputHolder">
              <div className="row no-pad-mar">
                <div className="col s12 no-pad-mar">
                  <input
                    type="text"
                    autoFocus={true}
                    placeholder="Search"
                    onKeyUp={this.watchInput.bind(this)}
                  />
                  <div className="pull-right" style={{ fontSize: "30px" }}>
                    <i
                      className="material-icons"
                      style={{
                        fontSize: "30px",
                        paddingTop: "9px",
                        display: "block",
                        cursor: "pointer"
                      }}
                      onClick={this.gotoSearch.bind(this)}
                    >
                      search
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col l2" />
        </div>
      </div>
    );
  }
}

export default Main;
