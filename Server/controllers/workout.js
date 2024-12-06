import * as model from "../model/workout";
import express from "express";
const app = express.Router();

app
  .get("/", (_req, res, next) => {
    model
      .getAll()
      .then((x) => res.send(x))
      .catch(next);
  })
  .get("/:id", (req, res, next) => {
    const id = req.params.id;
    model
      .get(+id)
      .then((x: any) => res.send(x))
      .catch(next);
  })
  .post("/", (_req, res, next) => {
    model
      .add(req.body)
      .then((x: any) => res.send(x))
      .catch(next);
  })
  .patch("/:id", (req, res, next) => {
    const id = req.params.id;
    model
      .update(+id, req.body)
      .then((x: any) => res.send(x))
      .catch(next);
  })
  .delete("/:id", (req, res, next) => {
    const id = req.params.id;
    model
      .remove(+id)
      .then((x: any) => res.send(x))
      .catch(next);
  });

module.exports = app;