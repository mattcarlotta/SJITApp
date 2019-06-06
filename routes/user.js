import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  seedDatabase,
  updateUser,
} from "controllers/user";

export default app => {
  app.post("/api/user/create", createUser);
  app.delete("/api/user/delete/:id", deleteUser);
  app.get("/api/user/all", getAllUsers);
  app.get("/api/user/:id", getUser);
  app.put("/api/user/update/:id", updateUser);
  app.post("/api/user/seed", seedDatabase);
};
