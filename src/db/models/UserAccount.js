const mongoose = require("mongoose");
const UserAccount = require("../domain/UserAccount");

const UserAccountSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    }
  });

  
  module.exports = mongoose.model("UserAccount", UserAccountSchema,"contasdeusuario");
