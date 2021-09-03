// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const {
  checkId,
  checkProjectBodyPost,
  checkProjectBodyPut,
} = require("./projects-middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", checkProjectBodyPost, async (req, res, next) => {
  try {
    const newProject = await Projects.insert(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", checkProjectBodyPut, checkId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await Projects.update(id, req.body);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", checkId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const idDeleted = await Projects.remove(id);
    res.status(200).json(idDeleted);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", checkId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const actions = await Projects.getProjectActions(id);
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
