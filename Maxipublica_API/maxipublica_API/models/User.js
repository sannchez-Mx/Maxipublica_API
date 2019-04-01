const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    nombre: {
      type: String,
      required: "Un nombre debe ser proporcionado"
    },
    email: {
      type: String,
      unique: "El email debe de unico",
      required: true
    },
    fecha_nacimiento: {
      type: Date,
      required: "Ingresa tu fecha de nacimiento"
    },
    status: {
      type: String, 
      enum: ["Confirmación pendiente", "Activo"],
      default: "Confirmación pendiente"
    },
    deportes_favoritos: {
      type: String,
      enum: ["Fútbol", "Basquetbol", "Natación"]
    },
    password: {
      type: String,
      required: "La contraseña debe ser definida"
    },
    imagenPerfil: {
      type: String,
      default: 'http://www.socialbiblio.com/sites/default/files/expertos/persona2.png'
    }

  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("User", UserSchema);