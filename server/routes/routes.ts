import { Router } from "express";

import domains from "./domains";
import health from "./health";
import links from "./links";
import user from "./users";

const router = Router();

router.use("/domains", domains);
router.use("/health", health);
router.use("/links", links);
router.use("/users", user);

export default router;
