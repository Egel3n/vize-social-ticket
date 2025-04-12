"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusFriendshipRequest = exports.getFriendshipRequests = exports.sendFriendRequest = exports.getUserByID = exports.userByUsername = exports.createUser = exports.allUsers = void 0;
var dbClient_1 = __importDefault(require("./dbClient"));
var auth_1 = require("../middleware/auth");
var allUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbClient_1.default.user.findMany()];
            case 1:
                data = _a.sent();
                console.log(data);
                return [2 /*return*/];
        }
    });
}); };
exports.allUsers = allUsers;
var createUser = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, _b, e_1;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 3, , 4]);
                _b = (_a = dbClient_1.default.user).create;
                _c = {};
                _d = {
                    name: data.name,
                    lastName: data.lastname
                };
                return [4 /*yield*/, (0, auth_1.hashPassword)(data.password)];
            case 1: return [4 /*yield*/, _b.apply(_a, [(_c.data = (_d.password = _e.sent(),
                        _d.profilePicture = data.file.filename,
                        _d.username = data.username,
                        _d),
                        _c)])];
            case 2:
                user = _e.sent();
                return [2 /*return*/, user];
            case 3:
                e_1 = _e.sent();
                console.error(e_1);
                throw new Error(e_1);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var userByUsername = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, dbClient_1.default.user.findUnique({
                        where: {
                            username: username,
                        },
                    })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                throw Error(error_1);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.userByUsername = userByUsername;
var getUserByID = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbClient_1.default.user.findUnique({
                    where: {
                        id: id,
                    },
                })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserByID = getUserByID;
var sendFriendRequest = function (senderID, receiverID) { return __awaiter(void 0, void 0, void 0, function () {
    var friendship;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbClient_1.default.friend.create({
                    data: {
                        userFirstID: senderID,
                        userSecondID: receiverID,
                    },
                })];
            case 1:
                friendship = _a.sent();
                return [2 /*return*/, friendship];
        }
    });
}); };
exports.sendFriendRequest = sendFriendRequest;
var getFriendshipRequests = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var friendshipList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbClient_1.default.friend.findMany({
                    where: {
                        userSecondID: id,
                        status: "Pending",
                    },
                })];
            case 1:
                friendshipList = _a.sent();
                return [2 /*return*/, friendshipList];
        }
    });
}); };
exports.getFriendshipRequests = getFriendshipRequests;
var updateStatusFriendshipRequest = function (id, status) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedRequest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbClient_1.default.friend.update({
                    where: {
                        id: id,
                    },
                    data: {
                        status: status,
                    },
                })];
            case 1:
                updatedRequest = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateStatusFriendshipRequest = updateStatusFriendshipRequest;
//# sourceMappingURL=user.js.map