import { sendError } from "shared/helpers";

const createTemplate = (req, res) => sendError("Route not setup.", res);

const deleteTemplate = (req, res) => sendError("Route not setup.", res);

const getAllTemplates = (req, res) => sendError("Route not setup.", res);

const getTemplate = (req, res) => sendError("Route not setup.", res);

const updateTemplate = (req, res) => sendError("Route not setup.", res);

export {
  createTemplate,
  deleteTemplate,
  getAllTemplates,
  getTemplate,
  updateTemplate,
};
