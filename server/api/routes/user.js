const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


const userController = require('../controllers/user');

//router.get('/', checkAuth, userController.user_getAll);

router.post('/signup', userController.user_signup);

router.post('/login', userController.user_login);

router.get('/id/:userId', checkAuth.logged, userController.user_getUserById);

router.get('/name/:userName', checkAuth.logged, userController.user_getUserByName);

router.get('/policies/', checkAuth.adminUser, userController.user_getPolicies);

router.get('/', checkAuth.logged, userController.user_getUsers);




// router.delete("/:userId", (req, res, next) => {
//   User.remove({ _id: req.params.userId })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "User deleted"
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

module.exports = router;