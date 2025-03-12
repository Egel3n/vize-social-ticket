import multer from "multer";

const ppStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/home/egelen/Desktop/vizebackend/src/www/pp");
  },
  filename: (req, file, cb) => {
    const [, extension] = file.mimetype.split("/");
    const name =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + extension;
    cb(null, name);
  },
});

const ppUpload = multer({
  storage: ppStorage,
  dest: "/home/egelen/Desktop/vizebackend/src/www/pp",
});

export { ppUpload };
