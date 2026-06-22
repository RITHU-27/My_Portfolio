import { Router } from "express";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  importFromGithub,
} from "../controllers/projectController.js";

const router = Router();

router.route("/").get(getProjects).post(createProject);
router.route("/import/github").get(importFromGithub);
router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

export default router;
