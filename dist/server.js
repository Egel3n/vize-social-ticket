"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var auth_1 = require("./middleware/auth");
var user_1 = require("./handler/user");
var organization_1 = require("./handler/organization");
var fileware_1 = require("./middleware/fileware");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/profilepicture", express_1.default.static(path_1.default.join(__dirname, "www/pp")));
app.use("/verification", express_1.default.static(path_1.default.join(__dirname, "www/orgfiles")));
// USER ENDPOINTS
//app.post("/user/sign", upload.single("ege"), signUser);
app.post("/user/login", user_1.login);
app.get("/user/profile/:id", user_1.getUserPP);
app.post("/user/sign", fileware_1.upload.fields([{ name: "profilepicture", maxCount: 1 }]), user_1.sign);
// ORG ENDPOINTS
app.post("/org/sign", fileware_1.upload.fields([
    { name: "profilepicture", maxCount: 1 },
    { name: "verification", maxCount: 1 },
]), organization_1.sign);
app.post("/org/login", organization_1.login);
app.get("/org/profile/:id", organization_1.getOrgPP);
app.use("/api", auth_1.protectRoute, router_1.default); // protect this route
app.use("/*", function (req, res) {
    res.status(404).json({ message: "unvalid url" });
});
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).json({ message: "There was an error" });
});
exports.default = app;
//# sourceMappingURL=server.js.map