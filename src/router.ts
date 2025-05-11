import { Router } from "express";
import * as bigEventHandler from "./handler/bigEvent";
import * as smallEventHandler from "./handler/smallEvent";
import * as ticketHandler from "./handler/ticket";
import * as organizationHandler from "./handler/organization";
import * as userHandler from "./handler/user";
import * as friendHandler from "./handler/friend";
import * as counrtyHandler from "./handler/country";
import * as cityHandler from "./handler/city";
import { upload } from "./middleware/fileware";

const router = Router();

router.get("/testjwt", (req, res) => {
  res.status(200).json(req.user);
});

//USER ROTUES
router.get("/user/addFriend/:id", friendHandler.addFriend);
router.get("/user/listFriendships/", friendHandler.getListFriendRequests);
router.get(
  "/user/acceptFriendshipRequest/:id",
  friendHandler.acceptFriendshipRequest
);
router.get(
  "/user/rejectFriendshipRequest/:id",
  friendHandler.rejectFriendshipRequest
);
router.get("/user/removeFriend/:id", friendHandler.removeFriend);
router.get("/user/findfriendship/:id", friendHandler.findFriendshipID);
// BIG EVENT ROUTES
router.post(
  "/bigevent/create",
  upload.fields([{ name: "eventphotos", maxCount: 3 }]),
  bigEventHandler.newBigEvent
);
router.post("/bigevent/comment", bigEventHandler.makeAComment);

router.get("/bigevent/list", bigEventHandler.listAllEvents);
router.get("/bigevent/filter", bigEventHandler.listEvents);
router.get("/bigevent/comment/:id", bigEventHandler.getComments);
router.get("/bigevent/:id", bigEventHandler.getEvent); //last in order

// SMALL EVENT ROUTES
router.get("/smallevent/nearby-locations", smallEventHandler.getSmallEvents);
router.get("/smallevent", smallEventHandler.getSmallEventByID);
router.get(
  "/smallevent/attandancelist/:id",
  smallEventHandler.getAttandanceRequest
);
router.post("/smallevent/create", smallEventHandler.createSmallEvent);
router.post("/smallevent/join", smallEventHandler.sendAttandanceRequest);
router.put(
  "/smallevent/approverequest",
  smallEventHandler.approveAttandanceRequest
);
router.put(
  "/smallevent/atendee/increment",
  smallEventHandler.incrementAtendeeCount
);
router.put(
  "/smallevent/atendee/decrement",
  smallEventHandler.decrementAtendeeCount
);
router.delete("/smallevent/:id", smallEventHandler.deleteEvent);

// TICKET ROUTES
router.post("/ticket/create", ticketHandler.buyTicket);
router.get("/ticket/user/:id", ticketHandler.getUserTickets);
router.get("/ticket/:id", ticketHandler.getTicketByID);
router.put("/ticket/refund/:id", ticketHandler.refundTicket);

// ADMIN ROTUES
router.get("/admin/verification/:id", organizationHandler.getOrgFile);

// COUNTRY ROUTES
router.get("/countries", counrtyHandler.getCountries);

// CITY ROUTES
router.get("/cities/:id", cityHandler.allCities);

export default router;
