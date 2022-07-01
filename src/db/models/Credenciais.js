const mongoose = require("mongoose");

const Credencial = new mongoose.Schema({
    marketplace: {
      type: String,
      required: true,
    },
    seller_id: {
      type: Number,
      required: false,
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

module.exports = mongoose.model("credenciais", Credencial, "credenciais");

