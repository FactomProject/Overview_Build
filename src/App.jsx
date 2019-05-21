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
      colorMode: "light"
    };
  }

  ToggleColorMode = () => {
    console.log("called")
    this.setState({
      colorMode: this.state.colorMode === "light" ? "dark" : "light"
    })
  }

  Main = () => {
    let { colorMode, displayed, colVals } = this.state;
    console.log(colorMode)
    return (
      <div className={`App ${colorMode}`}>
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Information Display</h1>
            <div className="mode-toggle" onClick={() => this.ToggleColorMode()}>
            <div className="toggle">
                <div id={colorMode === "dark" ? "dark-mode" : "light-mode"} type="checkbox"></div>
            </div>
        </div>
          </header>
          <div className="row">
            <Table
              rowList={colVals}
              displayed={displayed}
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
