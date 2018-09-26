import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Table from "./components/full-table";
import io from "socket.io-client";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colVals: [],
      displayed: [
        "directoryblockheight--heights",
        "leaderheight--heights",
        "entryblockheight--heights",
        "entryheight--heights",
        "factomdversion--properties",
        "factomdapiversion--properties",
        "NetworkNumbernetwork-info",
        "NetworkNamenetwork-info",
        "NetworkIDnetwork-info"
      ]
    };
  }

  componentDidMount() {
    this.socket = io("localhost:5001");
    this.socket.emit("firstcall");
  }

  render() {
    return (
      <div className="App">
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
    );
  }
}
export default App;
