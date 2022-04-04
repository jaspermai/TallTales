import { socket } from "./socket";
// const log = console.log;

export const joinRoom = (user, room) => {
  socket.emit("join-room", {
    user: {
      username: user.username,
      icon: user.icon,
      score: 0,
      raconteur: false,
      currentSentence: ". . .",
      host: false
    },
    room: room
  });
};

export const updateRoom = app => {
  socket.on("update-users", ({ users, roomInProgress }) => {
    if (app.state.page === 4) {
      // User is on dashboard
      users[0].host = true;
      socket.emit("change-host", users);
      app.setState({
        page: 2,
        users: users,
        roomInProgress
      });
    } else if (app.state.page === 2) {
      // User is on lobby page
      users[0].host = true;
      socket.emit("change-host", users);
      app.setState({
        users: users,
        roomInProgress
      });
    } else {
      app.setState({
        // Updates current state of users
        users: users,
        roomInProgress
      });
    }
  });
};
