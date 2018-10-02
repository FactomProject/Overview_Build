import React, { Component } from "react";
import "../App.css";
import $ from "jquery";
import io from "socket.io-client";

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.uploadFile = this.uploadFile.bind(this);
    this.loadFileAsText = this.loadFileAsText.bind(this);
  }

  uploadFile = event => {
    var fileToLoad = document.getElementById("fileToLoad").files[0];
    event.preventDefault();

    let file = event.target.files[0];
    console.log(file);

    if (file) {
      let data = new FormData();
      data.append("file", file);
      console.log(data.getAll("file"));
    }
  };

  loadFileAsText = () => {
    var fileToLoad = document.getElementById("fileToLoad").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
      var textFromFileLoaded = fileLoadedEvent.target.result;
      let split = textFromFileLoaded.split("\n");
      // let IPLIST = split[0].match(new RegExp(`IPLIST = [` + "(.*)" + `] = IPLIST`))
      // let APILIST = textFromFileLoaded.match(new RegExp(`APILIST = [` + "(.*)" + `]`))
      // let price = ish[i].match(new RegExp(`Total: ` + "(.*)" + `}"`))[1];

      var regex = /\[(.*?)\]/;
      let IPLIST = regex.exec(split[0])[1].replace(/'/g, '').split(',');
      let APILIST = regex.exec(split[2])[1].replace(/'/g, '').split(',')

      console.log(textFromFileLoaded);
      console.log("IPLIST ", IPLIST)
      console.log("APILIST ", APILIST)

      // this.socket = io("localhost:5001");
      this.socket.emit("firstcall", {"ListOfURLs": IPLIST, "ListOfAPIs": APILIST});
    };

    fileReader.readAsText(fileToLoad, "UTF-8");
  };

  render() {
    return (
      <span>
        <input
          id="fileToLoad"
          type="file"
          name="myFile"
          onChange={this.loadFileAsText}
        />
      </span>
    );
  }
}

export default FileInput;
