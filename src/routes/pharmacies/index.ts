import { Router } from "express";
import { getAvailablePharmacies } from "./pharmacyControllers";

const router = Router();

router.post('/', getAvailablePharmacies);

export default router