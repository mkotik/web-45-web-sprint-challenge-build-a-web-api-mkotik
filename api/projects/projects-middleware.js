// add middlewares here related to projects
const Projects = require("./projects-model");

const checkId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Projects.get(id);
    if (project) {
      req.project = project;
      next();
    } else {
      next({ status: 404, message: "ID not found" });
    }
  } catch (err) {
    next(err);
  }
};

const checkProjectBodyPost = async (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    next({
      status: 400,
      message: "Please include name, description",
    });
  } else {
    next();
  }
};

const checkProjectBodyPut = async (req, res, next) => {
  const { name, description, completed } = req.body;
  if (!name || !description || typeof completed !== "boolean") {
    next({
      status: 400,
      message: "Please include name, description",
    });
  } else {
    next();
  }
};

module.exports = { checkId, checkProjectBodyPost, checkProjectBodyPut };
