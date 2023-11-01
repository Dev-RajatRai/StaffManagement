import express from 'express';
import { forgotpasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, registerController, testControllers, updateProfileController, } from '../Controlers/authControllers.js'
import { IsAdmin, requireSignIn } from '../middleWare/authMiddleware.js';
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
router.get("/test", requireSignIn, IsAdmin, testControllers);

// Protected Routes for user Auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
// Protected Routes for user Auth
router.get("/admin-auth", requireSignIn, IsAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

// update User
router.put('/update-user', requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, IsAdmin, getAllOrdersController);

// order status update
router.put("/order-status/:orderId", requireSignIn, IsAdmin, orderStatusController
);
export default router