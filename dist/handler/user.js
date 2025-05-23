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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPP = exports.login = exports.sign = void 0;
var user_1 = require("../db/user");
var auth_1 = require("../middleware/auth");
var sign = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                body.file = req.files["profilepicture"][0]; //gather all components in body
                if (!(0, user_1.userByUsername)(body.username)) {
                    res.status(400).json({ message: "Username already exists ." });
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, user_1.createUser)(body)];
            case 2:
                user = _a.sent();
                res.status(201).json({ message: "User Created", data: user });
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.error(e_1);
                next(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.sign = sign;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, username, password, user, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                username = body.username;
                password = body.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, user_1.userByUsername)(username)];
            case 2:
                user = _a.sent();
                if (!user) {
                    res.status(401).json({ message: "wrong username" });
                    return [2 /*return*/];
                }
                if (!(0, auth_1.comparePassword)(password, user.password)) {
                    res.status(401).json({ messsage: "wrong password" });
                    return [2 /*return*/];
                }
                token = (0, auth_1.createJWT)(user);
                res.status(200).json({ token: token });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var getUserPP = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, user_1.getUserByID)(id)];
            case 2:
                user = _a.sent();
                res.status(200).json({
                    url: "http://localhost:8000/profilepicture/" + user.profilePicture,
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserPP = getUserPP;
//# sourceMappingURL=user.js.map