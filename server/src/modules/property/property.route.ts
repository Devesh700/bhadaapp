import { Router } from "express";
import { authMiddleware, optionalAuthMiddleware } from "../../middlewares/auth";
import { PropertyController } from "./property.controller";
import { createImageUploadMiddleware } from "../../middlewares/upload.middleware";

const router = Router();
const propertyImagesUpload = createImageUploadMiddleware(10);

// Property CRUD
router.post(
  "/",
  authMiddleware,
  propertyImagesUpload.array("images", 10),
  PropertyController.createProperty
);
router.get("/:id", optionalAuthMiddleware, PropertyController.getPropertyById);
router.put(
  "/:id",
  authMiddleware,
  propertyImagesUpload.array("images", 10),
  PropertyController.updateProperty
);
router.delete("/:id", authMiddleware, PropertyController.deleteProperty);

// Unlock contact
router.post("/:id/unlock", authMiddleware, PropertyController.unlockContact);

// Search + history
router.post("/search", optionalAuthMiddleware, PropertyController.searchProperties);
router.post("/me", authMiddleware, PropertyController.getMyProperties)
// Counter updates (view/contact/whatsapp)
router.post(
  "/:id/increment/:type",
  authMiddleware,
  PropertyController.incrementCounter
);

export default router;
