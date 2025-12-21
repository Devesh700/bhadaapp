import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { PropertyController } from "./property.controller";

const router = Router();

// Property CRUD
router.post("/", authMiddleware, PropertyController.createProperty);
router.get("/:id", PropertyController.getPropertyById);
router.put("/:id", authMiddleware, PropertyController.updateProperty);
router.delete("/:id", authMiddleware, PropertyController.deleteProperty);

// Search + history
router.post("/search", authMiddleware, PropertyController.searchProperties);
router.post("/me", authMiddleware, PropertyController.getMyProperties)
// Counter updates (view/contact/whatsapp)
router.post(
  "/:id/increment/:type",
  authMiddleware,
  PropertyController.incrementCounter
);

export default router;
