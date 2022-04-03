import React from "react";
import AppName from "../../components/appName/appName.js";
import Button from "../../components/button/button.js";
import DropDown from "../../components/dropDown/dropDown.js";
import UserIcon from "../../components/userIcon/userIcon.js";
import "./lobby.css";

import { redirect, getGenres } from "../../actions/lobby/lobby.js";
import { gameStarted } from "../../actions/sockets/startGame.js";

class Lobby extends React.Component {
  state = {
    user: {
      username: "",
      icon: "avatar01.png",
      stories: []
    },
    genres: [],
    starts: [],
    start:
      "chris and jordan are trying to turn random cans of food into something remotely tasty. When most canned “food” is either pet food or well past its expiration date (or both), they’ve got to turn to other means.",
    prompts: [],
    prompt: {
      backstory: [
        "Backstory 1/3: Where is this happening exactly?",
        "Backstory 2/3: Who else is involved?",
        "Backstory 3/3: Anything else to set up?"
      ],
      conflict: [
        "Conflict 1/4: How can we make the story more spicy?",
        "Conflict 2/4: What if one of our heroes got attacked by a monkey?",
        "Conflict 3/4: Oh my god! Rats everywhere!",
        "Conflict 4/4: Last chance for things to go wrong!"
      ],
      resolution: [
        "Resolution 1/3: Okay, time to resolve the drama.",
        "Resolution 2/3: Any loose ends left?",
        "Resolution 3/3: Final chance to wrap things up!"
      ]
    }
  };

  componentDidMount() {
    getGenres(this);
  }

  render() {
    // socket.on("current-rooms", rooms => {
    //   console.log(rooms);
    // });

    gameStarted(this.props.app);

    const genres = this.state.genres.map(object => object.genre);

    return (
      <div className="lobby">
        {/* TODO: Make this header into a component so it's reusable in every page */}
        <div className="header">
          <AppName></AppName>
        </div>
        <div className="lobby-content">
          {this.props.app.state.users[0].username ===
          this.props.app.state.currUser ? (
            <div className="lobby-genre">
              <DropDown app={this.props.app} items={genres}></DropDown>
            </div>
          ) : (
            <span></span>
          )}

          <div className="lobby-column">
            <div className="lobby-header">LOBBY</div>
            <div className="lobby-players">
              {this.props.app.state.users.map((e, i) => {
                const username = e.host ? e.username + " (h)" : e.username;
                return (
                  <div key={i} className="lobby-player">
                    <UserIcon username={username} icon={e.icon}></UserIcon>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {this.props.app.state.users[0].username ===
        this.props.app.state.currUser ? (
          <Button
            text="START GAME"
            handleClick={() => {
              redirect(this.props.app, this.state.start, this.state.prompt);
            }}
          ></Button>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Lobby;
