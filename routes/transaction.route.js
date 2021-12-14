
import { Router } from 'express'
const router = Router()
import transactionController from '../controllers/transaction.controller'

router.get("/check-user/email/:email", transactionController.checkUserWithEmail)
router.get("/check-user/userName/:userName", transactionController.checkUserWithUserName)
router.get("/check-user/accountNumber/:accountNumber", transactionController.checkUserWithAccountNumber)


router.post("/transfer-email", transactionController.transferWithEmail)
router.post("/transfer-userName", transactionController.transferWithUserName)
router.post("/transfer-accountNumber", transactionController.transferWithAccountNumber)

router.get("/transactions/email/:email", transactionController.getUserTransactionsWithEmail)
router.get("/transactions/userName/:userName", transactionController.getUserTransactionsWithUserName)
router.get("/transactions/accountNumber/:accountNumber", transactionController.getUserTransactionsWithAccountNumber)


router.get("/transactions/:id", transactionController.getTransactionById)


export default router;