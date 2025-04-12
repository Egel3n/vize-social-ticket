"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passiveEvent = exports.getEventByID = exports.listEventByDistance = exports.createEvent = void 0;
var dbClient_1 = __importDefault(require("./dbClient"));
var createEvent = function (comingEvent, userID) { return __awaiter(void 0, void 0, void 0, function () {
    var eventDate, location, rest, event;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                eventDate = comingEvent.eventDate, location = comingEvent.location, rest = __rest(comingEvent, ["eventDate", "location"]);
                return [4 /*yield*/, dbClient_1.default.smallEvent.create({
                        data: __assign(__assign({}, rest), { ownerID: userID, eventDate: new Date(eventDate), location: {
                                type: "Point",
                                coordinates: location,
                            } }),
                    })];
            case 1:
                event = _a.sent();
                return [2 /*return*/, event];
        }
    });
}); };
exports.createEvent = createEvent;
var listEventByDistance = function (lat, lng, distance) { return __awaiter(void 0, void 0, void 0, function () {
    var locations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbClient_1.default.smallEvent.findRaw({
                    filter: {
                        location: {
                            $near: {
                                $geometry: {
                                    type: "Point",
                                    coordinates: [parseFloat(lng), parseFloat(lat)],
                                },
                                $maxDistance: parseFloat(distance) * 1000, // Metre cinsinden
                            },
                        },
                    },
                })];
            case 1:
                locations = _a.sent();
                return [2 /*return*/, locations];
        }
    });
}); };
exports.listEventByDistance = listEventByDistance;
var getEventByID = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var event;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbClient_1.default.smallEvent.findUnique({
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
exports.getEventByID = getEventByID;
var passiveEvent = function (userID, eventID) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedEvent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbClient_1.default.smallEvent.update({
                    where: {
                        ownerID: userID,
                        id: eventID,
                    },
                    data: {
                        isActive: false,
                    },
                })];
            case 1:
                deletedEvent = _a.sent();
                return [2 /*return*/, deletedEvent];
        }
    });
}); };
exports.passiveEvent = passiveEvent;
//# sourceMappingURL=smallEvent.js.map