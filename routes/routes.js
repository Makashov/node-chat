import express from 'express';
import user from '../controllers/usersController.js';
import path from "path";

const router = express.Router();

router
  .get('/', (req, res) => {
    res.sendFile( 'index.html', { root: path.resolve( './static') });
  })
  .delete('/user/token/:token', user.onDeleteToken)

export default router;