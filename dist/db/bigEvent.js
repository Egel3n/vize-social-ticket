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
exports.listComments = exports.createComment = exports.eventByID = exports.getAllEvents = exports.listEventsByCity = exports.createBigEvent = void 0;
var dbClient_1 = __importDefault(require("./dbClient"));
var createBigEvent = function (event, OrganizationID) { return __awaiter(void 0, void 0, void 0, function () {
    var name, price, picture, country, city, district, place, quota, eventDate, type, text, event_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = event.name, price = event.price, picture = event.picture, country = event.country, city = event.city, district = event.district, place = event.place, quota = event.quota, eventDate = event.eventDate, type = event.type, text = event.text;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, dbClient_1.default.bigEvent.create({
                        data: {
                            name: name,
                            price: price,
                            country: country,
                            city: city,
                            district: district,
                            place: place,
                            quota: quota,
                            eventDate: new Date(eventDate),
                            picture: picture,
                            type: type,
                            OrganizationID: OrganizationID,
                            text: text,
                        },
                    })];
            case 2:
                event_1 = _a.sent();
                return [2 /*return*/, event_1];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                throw new Error(error_1);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createBigEvent = createBigEvent;
var listEventsByCity = function (country, city, type) { return __awaiter(void 0, void 0, void 0, function () {
    var queryObject, events;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (type === "all") {
                    queryObject = {
                        where: {
                            city: city,
                            country: country,
                            type: type,
                        },
                        orderBy: {
                            eventDate: "desc",
                        },
                    };
                }
                else {
                    queryObject = {
                        where: {
                            city: city,
                            country: country,
                        },
                        orderBy: {
                            eventDate: "desc",
                        },
                    };
                }
                return [4 /*yield*/, dbClient_1.default.bigEvent.findMany(queryObject)];
            case 1:
                events = _a.sent();
                return [2 /*return*/, events];
        }
    });
}); };
exports.listEventsByCity = listEventsByCity;
var getAllEvents = function () { return __awaiter(void 0, void 0, void 0, function () {
    var events;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbClient_1.default.bigEvent.findMany()];
            case 1:
                events = _a.sent();
                return [2 /*return*/, events];
        }
    });
}); };
exports.getAllEvents = getAllEvents;
var eventByID = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var event;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbClient_1.default.bigEvent.findUnique({
                    where: {
                        id: id,
                    },
                })];
            case 1:
                event = _a.sent();
                return [2 /*return*/, event];
        }
    });
}); };
exports.eventByID = eventByID;
var createComment = function (bigEventID, userID, text) {
    var comment = dbClient_1.default.bigEventComments.create({
        data: {
            commentBody: text,
            userID: userID,
            bigEventID: bigEventID,
        },
    });
    return comment;
};
exports.createComment = createComment;
var listComments = function (bigEventID) {
    var comments = dbClient_1.default.bigEventComments.findMany({
        where: {
            bigEventID: bigEventID,
        },
        orderBy: {
            creationDate: "desc",
        },
        include: {
            user: {
                select: {
                    username: true,
                    profilePicture: true,
                },
            },
        },
    });
    return comments;
};
exports.listComments = listComments;
//# sourceMappingURL=bigEvent.js.map