
const { Router } = require('express');
const router = Router();

const { getUsers, createUser, deleteUser, getUseByUserName, getUserById, updateUserById } = require('../controllers/users.controller');

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .delete(deleteUser)
  .get(getUserById)
  .put(updateUserById)

router.route('/getByUsername/:username')
  .get(getUseByUserName);

module.exports = router;