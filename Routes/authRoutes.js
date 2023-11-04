import express from 'express';
import { forgotpasswordController, loginController, registerController, testControllers, updateProfileController, } from '../Controlers/authControllers.js'
import { IsSuperAdmin, requireSignIn } from '../middleWare/authMiddleware.js';
// Router Object 
const router = express.Router();

// Routing

// Ragister || Method Post
router.post("/register", registerController)

// lOGIN
router.post("/login", loginController);

// Forget Password
router.post("/forgot-password", forgotpasswordController);


// Test Routes
router.get("/test", requireSignIn, IsSuperAdmin, testControllers);

// Protected Routes for user Auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
// Protected Routes for user Auth
router.get("/admin-auth", requireSignIn, IsSuperAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

// update User
router.put('/update-user', requireSignIn, updateProfileController);


export default router