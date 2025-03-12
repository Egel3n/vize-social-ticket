import { Router } from "express";
import * as bigEventHandler from "./handler/bigEvent";
import * as smallEventHandler from "./handler/smallEvent";
import * as ticketHandler from "./handler/ticket";
import * as multer from "multer";
const router = Router();

router.get("/testjwt", (req, res) => {
  res.status(200).json(req.user);
});

// BIG EVENT ROUTES
router.post("/bigevent/create", bigEventHandler.newBigEvent);
router.get("/bigevent/list", bigEventHandler.listAllEvents);
router.get("/bigevent/list/:country/:city", bigEventHandler.listEvents);
router.post("/bigevent/comment", bigEventHandler.makeAComment);
router.get("/bigevent/comment/:id", bigEventHandler.getComments);
router.get("/bigevent/:id", bigEventHandler.getEvent); //last in order

// SMALL EVENT ROUTES
router.post("/smallevent/create", smallEventHandler.createSmallEvent);
router.get("/smallevent/nearby-locations", smallEventHandler.getSmallEvents);
router.get("/smallevent", smallEventHandler.getSmallEventByID);
router.delete("/smallevent/:id", smallEventHandler.deleteEvent);

// TICKET ROUTES
router.post("/ticket/create", ticketHandler.buyTicket);
router.get("/ticket/user/:id", ticketHandler.getUserTickets);
router.get("/ticket/:id", ticketHandler.getTicketByID);
router.put("/ticket/refund/:id", ticketHandler.refundTicket);
export default router;
