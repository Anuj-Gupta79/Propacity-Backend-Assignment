import express from 'express';
const router = express.Router();
import { createFolder } from '../Controller/FolderController.js';
import { jwtAuth } from '../MiddleWare/JWTAuthentication.js';

router.post('/createFolder', jwtAuth , createFolder);

// router.get('/folders/:folderId', authenticateJWT, getFolder);

// router.put('/folders/:folderId', authenticateJWT, updateFolder);

// router.delete('/folders/:folderId', authenticateJWT, deleteFolder);

export default router;
