import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Table from "./components/full-table";
import NavBar from "./components/nav-bar";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colVals: [],
      displayed: [
        "IP",
        "directoryblockheight--heights",
        "leaderheight--heights",
        "entryblockheight--heights",
        "entryheight--heights",
        "NetworkNumber--network-info",
        "NetworkName--network-info",
        "NetworkID--network-info",
        "leaderheight--current-minute",
        "directoryblockheight--current-minute",
        "minute--current-minute",
        "currentblockstarttime--current-minute",
        "currentminutestarttime--current-minute",
        "currenttime--current-minute",
        "directoryblockinseconds--current-minute",
        "stalldetected--current-minute"
      ],
      Google: {}
    };
  }

  isSignedIn = googleIsh => {
    this.setState({
      Google: googleIsh
    });
  };

  Main = () => {
    return (
      <div className="App">
        {this.state.Google.isSignedIn ===
          undefined ? null : this.state.Google.isSignedIn.get() ? (
            <div>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Information Display</h1>
              </header>
              <div className="row">
                <Table
                  rowList={this.state.colVals}
                  displayed={this.state.displayed}
                />
              </div>
            </div>
          ) : (
              <div className="animated-box in" style={{ margin: "2em 5em" }}><h1 style={{ fontWeight: "600", fontSize: "42px" }}>Please sign in.</h1></div>
            )}
      </div>
    );
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <NavBar isSignedIn={this.isSignedIn.bind(this)} />
            <hr />
            <Route exact={true} path="/" component={this.Main} />
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
