import React, { Component } from "react";
import "./App.css";
import ProjectInfo from "./components/ProjectInfo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="flex-container-main">
          {/* <PersonalInfo className="column" /> */}
          <ProjectInfo className="column" />
        </div>
      </div>
    );
  }
}

export default App;
