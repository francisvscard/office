var express = require('express');
const xss = require('xss')
var router = express.Router();

const { generateToken } = require('../middleware/authorization')
const User = require("../db/model/User")
const { genPassword } = require('../utils/cryp')

const { Error, Success } = require('../utils/resModel')

/* GET users listing. */
router.post('/login', async function (req, res, next) {

  const { username, password } = req.body
  const pwd = genPassword(password)

  const users = await User.findOne({
    username
  })

  if (!users) {
    return res.status(400).json(new Error("用户名错误"))
  }
  if (users.password !== pwd) {
    return res.status(400).json(new Error("密码错误"));
  }
  const token = generateToken({ username: username, role: users.role });
  res.json(new Success({ token: token }, '登陆成功'));

});


router.post('/register', async function (req, res, next) {
 
  let erroropt = false;
  if (!req.user.role) erroropt = true;
  if (req.user.role != 'superadmin') erroropt = true;
  if (erroropt) return res.status(400).json(new Error("无权操作！！！"));

  const { username, password, role } = req.body
  const userList = await User.findOne({
    username
  })
  if (userList) {
    return res.status(400).json(new Error("用户名已存在"));
  }
  const pwd = genPassword(password)

  await User.create({
    username: xss(username),
    password: pwd,
    role: xss(role)
  })
  res.json(new Success('创建成功'))
});


module.exports = router;
