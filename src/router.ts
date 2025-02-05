import { Router } from "express";

const router = Router();

router.get("/testjwt", (req, res) => {
  res.status(200).json(req.user);
});

export default router;
