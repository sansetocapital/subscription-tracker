const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");

module.exports.createAdmin = async () => {
  const username = "superadmin";
  const password = "securepassword123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({ username, password: hashedPassword });

  try {
    await admin.save();
    console.log("Admin created successfully!");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

