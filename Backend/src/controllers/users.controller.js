const userCtrl = {};

const User = require('../models/User');

userCtrl.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  }
  catch (err) {
    res.status(400).json({
      error: err
    });
  }
};

userCtrl.getUseByUserName = async (req, res) => {
  const user = await User.findOne(req.params);
  res.json(user);
};

userCtrl.updateUserById = async (req, res) => {
  const { username, email, gender, profession, phoneNumber, birthday } = req.body;
  await User.findOneAndUpdate(req.params.id, {
    username,
    email,
    gender,
    profession,
    phoneNumber,
    birthday
  });
  res.json({ message: 'User updated' });
};

userCtrl.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
};

userCtrl.createUser = async (req, res) => {
  try {
    const { username, password, email, gender, profession, phoneNumber, birthday } = req.body;
    const newUser = new User({
      username: username,
      password: password,
      email: email,
      gender: gender,
      profession: profession,
      phoneNumber: phoneNumber,
      birthday: birthday
    });
    await newUser.save();
    res.json({ message: 'User created' });
  } catch (e) {
    console.log(e)
    res.json({ message: e.errmsg });
  }
};

userCtrl.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: 'User deleted' });
}

module.exports = userCtrl;