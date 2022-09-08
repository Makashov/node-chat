import user from "../models/user.js";

class webSocket {
  connection(socket) {
    console.log(`${socket.user.name} connected`);
    socket.emit('authenticated', socket.user);

    socket.on('disconnect', () => {
      console.log(`${socket.user.name} disconnected`);
    });

    socket.on('searching', async (value) => {
      const users = await user.findUser({
        $or: [
          { name: {$regex: new RegExp(`.*${value}.*`, 'i')} },
          { email: {$regex: new RegExp(`.*${value}.*`, 'i')} },
        ],
        id: { $ne: socket.user.id },
      });

      socket.emit('searching', users);
    })
  }
}

export default new webSocket();