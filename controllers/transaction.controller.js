import successResponseHandler from "../helpers/successResponseHandler";
import errorResponseHandler from "../helpers/errorResponseHandler";
import transactionService from "../services/transactionService";

const transactionController = {
    checkUserWithEmail: async (req, res) => {
        try {
            const { email } = req.params;
            const user = await transactionService.checkUserWithEmail(email);
            if (user) {
                return successResponseHandler(
                    res,
                    200,
                    user,
                    "User found successfully",
                    true
                  );
            } else {
                return errorResponseHandler(res, 400, "User not found", false)
            }
        } catch (error) {
            return errorResponseHandler(res, error);
        }
    },

    checkUserWithUserName: async (req, res) => {
        try {
            const { userName } = req.params;
            const user = await transactionService.checkUserWithUserName(userName);
            if (user) {
                return successResponseHandler(
                    res,
                    200,
                    user,
                    "User found successfully",
                    true
                  );
            } else {
                return errorResponseHandler(res, 400, "User not found", false)
            }
        } catch (error) {
            return errorResponseHandler(res, error);
        }
    },

    checkUserWithAccountNumber: async (req, res) => {
        try {
            const { accountNumber } = req.params;
            const user = await transactionService.checkUserWithAccountNumber(accountNumber);
            if (user) {
                return successResponseHandler(
                    res,
                    200,
                    user,
                    "User found successfully",
                    true
                  );
            } else {
                return errorResponseHandler(res, 400, "User not found", false)
            }
        } catch (error) {
            return errorResponseHandler(res, error);
        }
    },

    transferWithUserName: async (req, res) => {
        try {
            const { senderUserName, receiverUserName, transferAmount, senderTransactionPin } = req.body;

            const sender = await transactionService.checkUserWithUserName(senderUserName);
            const receiver = await transactionService.checkUserWithUserName(receiverUserName);

            if (sender && receiver) {
                const transaction = await transactionService.transferWithUserName(senderUserName, receiverUserName, transferAmount, senderTransactionPin);
                if(transaction) {
                    return successResponseHandler(
                        res,
                        200,
                        transaction,
                        "Transaction successful",
                        true
                      );
                }
            } else {
                return errorResponseHandler(res, 400, "Transaction not successful", false)
            }
        } catch (error) {
            return errorResponseHandler(res, error);
        }
    },

    transferWithEmail: async (req, res) => {
        try {
            const { senderEmail, receiverEmail, transferAmount, senderTransactionPin } = req.body;
            const sender = await transactionService.checkUserWithEmail(senderEmail);
            const receiver = await transactionService.checkUserWithEmail(receiverEmail);

            if (sender && receiver) {
                const transaction = await transactionService.transferWithEmail(senderEmail, receiverEmail, transferAmount, senderTransactionPin);
                if(transaction) {
                    return successResponseHandler(
                        res,
                        200,
                        transaction,
                        "Transaction successful",
                        true
                      );
                }
            } else {
                return errorResponseHandler(res, 400, "Transaction not successful", false)
            }
        } catch (error) {
            return errorResponseHandler(res, error);
        }
    },

    transferWithAccountNumber: async (req, res) => {
        try {
            const { senderAccountNumber, receiverAccountNumber, transferAmount, senderTransactionPin } = req.body;
            const sender = await transactionService.checkUserWithAccountNumber(senderAccountNumber);
            const receiver = await transactionService.checkUserWithAccountNumber(receiverAccountNumber);

            if (sender && receiver) {
                const transaction = await transactionService.transferWithAccountNumber(senderAccountNumber, receiverAccountNumber, transferAmount, senderTransactionPin);
                if(transaction) {
                    return successResponseHandler(
                        res,
                        200,
                        transaction,
                        "Transaction successful",
                        true
                      );
                }
            } else {
                return errorResponseHandler(res, 400, "Transaction not successful", false)
            }
        } catch (error) {
            return errorResponseHandler(res, error);
        }
    },

    getUserTransactionsWithUserName: async (req, res) => {
        try {
            const { userName } = req.params;
            const transactions = await transactionService.getUserTransactionsWithUserName(userName);
            if (transactions) {
                return successResponseHandler(
                    res,
                    200,
                    transactions,
                    "Transactions fetched successfully",
                    true
                  );
            } else {
                return errorResponseHandler(res, 400, "Transactions not fetched successfully", false)
            }
        } catch (error) {
            return errorResponseHandler(res, error);
        }
    },

    getUserTransactionsWithEmail: async (req, res) => {
        try {
            const { email } = req.params;
            const transactions = await transactionService.getUserTransactionsWithEmail(email);
            if (transactions) {
                return successResponseHandler(
                    res,
                    200,
                    transactions,
                    "Transactions fetched successfully",
                    true
                  );
            } else {
                return errorResponseHandler(res, 400, "Transactions not fetched successfully", false)
            }
        } catch (error) {
            return errorResponseHandler(res, error);
        }
    },

    getUserTransactionsWithAccountNumber: async (req, res) => {
        try {
            const { accountNumber } = req.params;
            const transactions = await transactionService.getUserTransactionsWithAccountNumber(accountNumber);
            if (transactions) {
                return successResponseHandler(
                    res,
                    200,
                    transactions,
                    "Transactions fetched successfully",
                    true
                  );
            } else {
                return errorResponseHandler(res, 400, "Transactions not fetched successfully", false)
            }
        } catch (error) {
            return errorResponseHandler(res, error);
        }
    },

    getTransactionById: async (req, res) => {
        try {
            const { id } = req.params;
            const transaction = await transactionService.getTransactionById(id);
            if (transaction) {
                return successResponseHandler(
                    res,
                    200,
                    transaction,
                    "Transaction fetched successfully",
                    true
                  );
            } else {
                return errorResponseHandler(res, 400, "Transaction not found or not fetched successfully", false)
            }
        } catch (error) {
            return errorResponseHandler(res, error);
        }
    },
}

export default transactionController;
