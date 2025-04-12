"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = __importDefault(require("multer"));
var storageConf = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        if (file.fieldname === "profilepicture") {
            cb(null, "/home/egelen/Desktop/vizebackend/src/www/pp");
        }
        else if (file.fieldname === "verification") {
            cb(null, "/home/egelen/Desktop/vizebackend/src/www/orgfiles");
        }
        else {
            cb(null, "/home/egelen/Desktop/vizebackend/src/www/pp");
        }
    },
    filename: function (req, file, cb) {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        var _a = file.mimetype.split("/"), extension = _a[1];
        var name = Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + extension;
        cb(null, name);
    },
});
var upload = (0, multer_1.default)({
    storage: storageConf,
    dest: "/home/egelen/Desktop/vizebackend/src/www/pp",
});
exports.upload = upload;
//# sourceMappingURL=fileware.js.map