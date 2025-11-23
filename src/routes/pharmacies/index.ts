import { Router } from "express";
import { getAvailablePharmacies } from "./pharmacyControllers";

const router = Router();

router.get('/', getAvailablePharmacies);

export default router