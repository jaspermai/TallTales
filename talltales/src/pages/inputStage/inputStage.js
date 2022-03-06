import React from "react";
import AppName from "../../components/appName/appName.js";
import Button from "../../components/button/button.js";
import Score from "../../components/score/score.js";
import Story from "../../components/story/story.js";
import UserInput from "../../components/userInput/userInput.js";
import { Link } from "react-router-dom";

import { displayPrompt, isRaconteur } from "../../actions/prompt/displayPrompt.js";
import { saveInput } from "../../actions/input/input.js";

import "./inputStage.css";

class InputStage extends React.Component {
  render() {
    // Import mock data
    this.stories = this.props.app.state.stories; // Change to match the actual genre
    this.users = this.props.app.state.users;

    // Checks if user is raconteur
    isRaconteur(this.props.app, this.props.app.state.currUser, this.users);

    // Resets the story
    if (this.props.app.state.stage === 0 && this.props.app.state.prompt === 0) {
      this.stories.currStory.story = this.stories.stories[0].starts[0];
    }

    // Switches the prompt
    
    this.prompt = displayPrompt(this.props.app, this.stories);

    return (
      <div className="input-stage">
        <div className="input-stage-header">
          <AppName></AppName>
          <Score user={this.props.app.state.currUser}></Score>
        </div>
        <Story story={this.stories.currStory.story}></Story>
        <UserInput prompt={this.prompt} user={this.props.app.state.currUser}></UserInput>
        <Button
          text="SUBMIT"
          handleClick={() => {
            saveInput(this.props.app.state.currUser, this.props.app);
          }}
        ></Button>
      </div>
    );
  }
}

export default InputStage;
