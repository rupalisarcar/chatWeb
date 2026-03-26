import express from 'express';
const router = express.Router()

import { getAllContacts, getmessagesById, getAllChats, sendMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

router.use(protectRoute)
router.get('/contacts', getAllContacts)
router.get('/chats', getAllChats)
router.get('/:id', getmessagesById)

router.post('/send/:id', sendMessage)
export default router;