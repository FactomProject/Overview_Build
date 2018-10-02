import React, { Component } from "react";
import "../App.css";
import $ from "jquery";

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
      console.log(split);
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
