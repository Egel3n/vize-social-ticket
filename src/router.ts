import { Router } from "express";
import * as bigEventHandler from "./handler/bigEvent";

const router = Router();

router.get("/testjwt", (req, res) => {
  res.status(200).json(req.user);
});

// BIG EVENT ROUTES
router.post("/bigevent/create", bigEventHandler.newBigEvent);
router.get("/bigevent/list/:country/:city", bigEventHandler.listEvents);

router.get("/bigevent/:id", bigEventHandler.getEvent); //last in order
export default router;
