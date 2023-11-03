import JWT from 'jsonwebtoken';
import userModal from '../Modal/employeeModal.js';


export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECTREAT)
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in requireSingin",
            error: error
        })
    }
}

export const IsSuperAdmin = async (req, res, next) => {
    try {
        const admin = await userModal.findById(req.user._id);
        if (admin.role !== 2) {
            return res.status(404).send({
                success: false,
                massage: "unauthorize Access",
            })
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in IsAdmin",
            error: error
        })
    }
}