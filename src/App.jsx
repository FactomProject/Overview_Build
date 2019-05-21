import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Table from "./components/full-table";
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
        "stalldetected--current-minute",
        "faulttimeout--current-minute",
        "roundtimeout--current-minute"
      ],
    };
  }

  Main = () => {
    return (
      <div className="App">
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
      </div>
    );
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <hr />
            <Route exact={true} path="/" component={this.Main} />
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
