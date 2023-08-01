import express from 'express';
import { createSubFolder } from '../Controller/SubFolderController.js';
import { jwtAuth } from '../MiddleWare/JWTAuthentication.js';

const router = express.Router();

router.post('/createSubFolder', jwtAuth, createSubFolder);

export default router;