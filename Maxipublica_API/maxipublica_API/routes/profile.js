const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../helpers/jwt").verifyToken;

router.put("/edit/:id", verifyToken, (req, res) => {
  let user = {};
  Object.keys(req.body).forEach(key => {
    user[key] = req.body[key];
  });
  User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true })
    .then(() => {
      res.status(201).json({ user, msg: "Usuario actualizado" });
    })
    .catch(err => {
      res.status(500).json({ err, msg: "Ocurrió un error al actualizar" });
    });
});

module.exports = router;
