const imageStorage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    //
    return cb(
      null,
      `${file.filename}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const uploadImage = multer({ storage: imageStorage });
