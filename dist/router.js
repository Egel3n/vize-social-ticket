"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bigEventHandler = __importStar(require("./handler/bigEvent"));
var smallEventHandler = __importStar(require("./handler/smallEvent"));
var ticketHandler = __importStar(require("./handler/ticket"));
var organizationHandler = __importStar(require("./handler/organization"));
var userHandler = __importStar(require("./handler/user"));
var friendHandler = __importStar(require("./handler/friend"));
var router = (0, express_1.Router)();
router.get("/testjwt", function (req, res) {
    res.status(200).json(req.user);
});
//USER ROTUES
router.get("/user/addFriend/:id", friendHandler.addFriend);
router.get("/user/listFriendships/", friendHandler.getListFriendRequests);
router.get("/user/acceptFriendshipRequest/:id", friendHandler.acceptFriendshipRequest);
router.get("/user/rejectFriendshipRequest/:id", friendHandler.rejectFriendshipRequest);
router.get("/user/removeFriend/:id", userHandler);
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
// ADMIN ROTUES
router.get("/admin/verification/:id", organizationHandler.getOrgFile);
exports.default = router;
//# sourceMappingURL=router.js.map