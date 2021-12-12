
import { Router } from 'express'
const router = Router()
import transactionController from '../controllers/transaction.controller'

router.get("/check-user/email/:email", transactionController.checkUserWithEmail)
router.get("/check-user/userName/:userName", transactionController.checkUserWithUserName)
router.post("/transfer-email", transactionController.transferWithEmail)
router.post("/transfer-userName", transactionController.transferWithUserName)


export default router;