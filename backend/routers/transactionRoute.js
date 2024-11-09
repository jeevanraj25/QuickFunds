import express from "express"
import { isAuth } from "../middleware/auth.js";
import { getBalance, getlatestTransactions, Transfer } from "../controllers/transactionController.js";


const router =express.Router();

router.get("/balance",isAuth,getBalance);
router.post("/transfer",isAuth,Transfer);
router.get("/transactions",isAuth,getlatestTransactions)


export default router;