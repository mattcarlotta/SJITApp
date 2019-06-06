import { sendError } from "shared/helpers";

const createTemplate = (req, res, done) => sendError("Route not setup.", res, done);

const deleteTemplate = (req, res, done) => sendError("Route not setup.", res, done);

const getAllTemplates = (req, res, done) => sendError("Route not setup.", res, done);

const getTemplate = (req, res, done) => sendError("Route not setup.", res, done);

const updateTemplate = (req, res, done) => sendError("Route not setup.", res, done);

export {
  createTemplate,
  deleteTemplate,
  getAllTemplates,
  getTemplate,
  updateTemplate,
};
