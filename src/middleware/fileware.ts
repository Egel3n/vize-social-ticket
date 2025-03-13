import multer from "multer";

const storageConf = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    if (file.fieldname === "profilepicture") {
      cb(null, "/home/egelen/Desktop/vizebackend/src/www/pp");
    } else if (file.fieldname === "verification") {
      cb(null, "/home/egelen/Desktop/vizebackend/src/www/orgfiles");
    } else {
      cb(null, "/home/egelen/Desktop/vizebackend/src/www/pp");
    }
  },
  filename: (req, file, cb) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

    const [, extension] = file.mimetype.split("/");
    const name =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + extension;
    cb(null, name);
  },
});

const upload = multer({
  storage: storageConf,
  dest: "/home/egelen/Desktop/vizebackend/src/www/pp",
});

export { upload };
