import { Router } from "express";
import { uploadImage } from "../storage/storage-middlware";
import { server_port } from "../utils/utils";

const UploadRouter = Router();

app.post("/", uploadImage.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${server_port}/images/${req.file.filename}`,
  });
});

export default UploadRouter;
