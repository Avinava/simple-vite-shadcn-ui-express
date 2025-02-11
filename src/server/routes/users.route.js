import express from "express";
import { body, validationResult } from "express-validator";
import userService from "../services/user.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

const router = express.Router();

// Validation middleware
const validateUser = [
  body("email").isEmail().normalizeEmail(),
  body("name").trim().optional(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(errorResponse("Validation error", errors.array()));
    }
    next();
  },
];

// Routes
router.post("/", validateUser, async (req, res) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json(successResponse(user, "User created successfully"));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await userService.findAll();
    res.json(successResponse(users));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userService.findById(req.params.id);
    if (!user) {
      return res.status(404).json(errorResponse("User not found"));
    }
    res.json(successResponse(user));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
});

router.put("/:id", validateUser, async (req, res) => {
  try {
    const user = await userService.update(req.params.id, req.body);
    res.json(successResponse(user, "User updated successfully"));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await userService.delete(req.params.id);
    res.json(successResponse(null, "User deleted successfully"));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
});

export default router;
