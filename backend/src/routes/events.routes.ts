import express from 'express';
import { eventsListController, eventsAddController } from '../controllers/events.controller';
const router = express.Router();

router.get("/", eventsListController);

router.post("/new", eventsAddController);

export default router;
