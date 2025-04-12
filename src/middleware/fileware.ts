import multer from "multer";

const storageConf = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profilepicture") {
      cb(null, "/home/egelen/Desktop/vizebackend/src/www/pp");
    } else if (file.fieldname === "verification") {
      cb(null, "/home/egelen/Desktop/vizebackend/src/www/orgfiles");
    } else if (file.fieldname === "eventphotos") {
      cb(null, "/home/egelen/Desktop/vizebackend/src/www/eventphotos");
    }
  },
  filename: (req, file, cb) => {
    const [, extension] = file.mimetype.split("/");
    const name =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + extension;
    cb(null, name);
  },
});

const upload = multer({
  storage: storageConf,
});

export { upload };
