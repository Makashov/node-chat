import axios from "axios";
import userModel from "../models/user.js"

export const authMiddleware = async (socket, next) => {
  const token = socket.handshake.auth.token;

  axios.get(`${process.env.LARAVEL_URL}/api/user`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  })
    .then( async response => {
      let user = await userModel.findOne( {id: response.data.id} ).exec()

      if (user === null) {
        user = await userModel.createUser(response.data.id,  response.data.name,  response.data.email)
      } else {
        user = await userModel.updateUser(response.data.id,  response.data.name,  response.data.email)
      }

      socket.userToken = token;
      socket.user = user;
      socket.join(user.id)
      next();
    })
    .catch(error => {
      next(error)
    })
}