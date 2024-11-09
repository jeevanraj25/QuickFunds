import express from "express"
import { checkPassword, getdata, getUsers, logout, signin, Signup} from "../controllers/userController.js";
import { isAuth } from "../middleware/auth.js";


const router =express.Router();

router.post("/signup",Signup);
router.post("/signin",signin)
router.get("/logout",isAuth,logout);
router.get("/getusers",isAuth,getUsers)
router.get("/getdata",isAuth,getdata);
router.post("/checkpassword",isAuth,checkPassword);


export default router;