import React from "react";
import AppName from "../../components/appName/appName.js";
import Score from "../../components/score/score.js";
import Story from "../../components/story/story.js";
import UserIcon from "../../components/userIcon/userIcon.js";
import "./voteStage.css";

class VoteStage extends React.Component {
  state = {
    stage: 0,
    prompt: 0
  };

  render() {
    // Import mock data
    this.stories = require("./../../data/stories.json");
    this.usersData = require("./../../data/users.json");

    let raconteur;
    for (var i in this.usersData.users) {
      let user = this.usersData.users[i];
      if (user.raconteur) {
        raconteur = user.username;
      }
    }

    return (
      <div className="vote-stage">
        {/* TODO: Make this header into a component so it's reusable in every page */}
        <div className="input-stage-header">
          <AppName></AppName>
          <Score user={this.usersData.users[0]}></Score>
        </div>
        <div className="vote-stage-content">
          <div className="vote-stage-story">
            <div className="story-content">
              <Story story={this.stories.stories[0]}></Story>
            </div>
          </div>
          <div className="vote-stage-turns">
            <div className="vote-stage-raconteur">
              <span className="raconteur">{raconteur}</span>'s turn
            </div>
            <div className="vote-stage-options">
              {this.usersData.users.map((e, i) => {
                if (e.username != raconteur) {
                  return (
                    <div key={i} className="vote-stage-option">
                      <UserIcon username={e.username} icon={e.icon}></UserIcon>
                      <div className="vote-option-text">
                        {e.currentSentence}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="vote-stage-sentence">
          <div className="sentence-title">YOUR SENTENCE</div>
          {/* TODO: placeholder sentence here. Change to what you picked in InputStage. */}
          <div className="sentence-content">chris tries to murder a rabbit</div>
        </div>
      </div>
    );
  }
}

export default VoteStage;
