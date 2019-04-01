const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../helpers/jwt").generateToken;
const verifyToken = require("../helpers/jwt").verifyToken;

router.post("/registro", (req, res) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.status(400).json({ msg: "El correo ya esta registrado" });
      return;
    }
    if (password !== confirmPassword) {
      return res.status(500).json({ msg: "Las cotraseñas no coinciden" });
    }
    const salt = bcrypt.genSaltSync(256);
    const hashedPassword = bcrypt.hashSync(password, salt);

    User.create({
      nombre: req.body.nombre,
      email: req.body.email,
      fecha_nacimiento: req.body.fecha,
      deportes_favoritos: req.body.deportes,
      password: hashedPassword
    })
      .then(() => {
        res.status(201).json({ msg: "Usuario registrado con éxito" });
      })
      .catch(err => {
        res.status(500).json({ err, msg: "No se pudo crear usuario" });
      });
  });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(404).json({ msg: "Correo incorrecto" });

  let validPassword = bcrypt.compareSync(req.body.password, user.password);

  if (!validPassword)
    return res.status(500).json({ msg: "Contraseña incorrecta" });

  res.status(201).json({
    user,
    token: generateToken(user),
    msg: "Iniciaste sesión ¡hurra!"
  });
});

router.get('/loggedin', verifyToken, (req, res) => {
  res.status(201).json({msg: "Estas logueado 😎"})
})


module.exports = router;
