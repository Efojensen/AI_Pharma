import { Router } from "express";
import { loginToPharmacy, verifyPharmacy } from "./userController";

const router = Router();

router.post('/signUp', verifyPharmacy)

router.post('/signIn', loginToPharmacy)

export default router