const mongoose = require("mongoose");
const Credencial = require("../domain/Credencial");

const CredencialSchema = new mongoose.Schema({
    marketplace: {
      type: String,
      required: true,
    },
    seller_id: {
      type: Number,
      required: true,
    },
    access_token: {
      type: String,
      required: true,
    },
    refresh_token: {
      type: String,
      required: true,
    },
    expire_in: {
      type: Number,
      default: 0,
    },
    user_id: {
      type: Number,
      default: 0,
      required: false,
    },
    shop_id: {
      type: Number,
      default: 0,
      required: false,
    },
    expire_time: {
      type: Number,
      default: 0,
    },
    app_id: {
      type: Number,
      default: 0,
      required: true,
    },
    app_key: {
      type: String,
      required: true,
    },
    redirect_url: {
      type: String,
      required: false,
    },
  });
  
//Objeto que contem os dados
CredencialSchema.loadClass(Credencial);

const Model = mongoose.model("Credenciais", CredencialSchema);

module.exports = {
    Model: Model
}