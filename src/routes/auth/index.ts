import { Router } from "express";
import { verifyPharmacy } from "./userController";

const router = Router();

router.post('/signUp', verifyPharmacy)

export default router