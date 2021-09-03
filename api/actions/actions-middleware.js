// add middlewares here related to actions
const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

const checkId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await Actions.get(id);
    if (action) {
      req.action = action;
      next();
    } else {
      next({ status: 404, message: "ID not found" });
    }
  } catch (err) {
    next(err);
  }
};

const checkProjectId = async (req, res, next) => {
  const { project_id } = req.body;
  try {
    const project = await Projects.get(project_id);
    if (project) {
      next();
    } else {
      next({
        status: 404,
        message: `project with id of ${project_id} not found`,
      });
    }
  } catch (err) {
    next(err);
  }
};

const checkActionBodyPost = async (req, res, next) => {
  const { notes, description, project_id } = req.body;
  if (!notes || !description || !project_id) {
    next({
      status: 400,
      message: "please include notes, description, and project_id",
    });
  } else {
    next();
  }
};

const checkActionBodyPut = async (req, res, next) => {
  const { notes, description, project_id, completed } = req.body;
  if (completed === "true") req.body.completed = true;
  if (completed === "false") req.body.completed = false;
  if (
    !notes ||
    !description ||
    !project_id ||
    typeof req.body.completed !== "boolean"
  ) {
    next({
      status: 400,
      message: `please include ${notes ? "" : "notes"} ${
        description ? "" : "description"
      } ${project_id ? "" : "project_id"} ${
        typeof completed === "boolean" ? "" : "completed"
      }`,
    });
  } else {
    next();
  }
};

module.exports = {
  checkId,
  checkProjectId,
  checkActionBodyPost,
  checkActionBodyPut,
};
