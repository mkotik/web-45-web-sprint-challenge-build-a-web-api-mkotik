// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const {
  checkId,
  checkProjectId,
  checkActionBodyPost,
  checkActionBodyPut,
} = require("./actions-middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const response = await Actions.get();
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkId, (req, res) => {
  res.status(200).json(req.action);
});

router.post(
  "/",
  checkActionBodyPost,
  checkProjectId,
  async (req, res, next) => {
    try {
      const newAction = await Actions.insert(req.body);
      res.status(201).json(newAction);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  checkId,
  checkProjectId,
  checkActionBodyPut,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const newAction = await Actions.update(id, req.body);
      res.status(201).json(newAction);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedId = await Actions.remove(id);
    res.status(200).json(deletedId);
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
