const UserModel = require('../models/user');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username,password });

    if (user && user.password === password) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.createAccount = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username already exists in the database
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        return res.json({ success: false, message: 'Username already exists' });
      }
  
      // Create a new user instance
      const newUser = new UserModel({ username, password });
  
      // Save the user to the database
      await newUser.save();
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  };
