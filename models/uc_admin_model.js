const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ucAdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
});

const UCAdmin = mongoose.model("uc_admin_users", ucAdminSchema);

module.exports = UCAdmin;
