import User from "../models/user";
import Transaction from "../models/transaction";
import jwt from "jsonwebtoken";
import env from "../config/environment/index";
import validateEmail from "../utils/validateEmail";
import validateUserName from "../utils/validateUserName";
import generateTransactionId from "../utils/generateTransactionId";

const transactionService = {
    async checkUserWithEmail(email) {
        const user = await User.findOne({ email });
        if (user) {
            return user;
        }
        return false;
    },

    async checkUserWithUserName(userName) {
        const user = await User.findOne({ userName });
        if (user) {
            return user;
        }
        return false;
    },

    async checkUserWithAccountNumber(accountNumber) {
        const user = await User.findOne({ accountNumber });
        if (user) {
            return user;
        }
        return false;
    },

    async transferWithUserName(senderUserName, receiverUserName, transferAmount, senderTransactionPin) {

        const senderUserNameAccount = await User.findOne({ userName: senderUserName });

        const receiverUserNameAccount = await User.findOne({ userName: receiverUserName });

        const senderPin = senderUserNameAccount.transactionPin === senderTransactionPin;

        if (senderUserNameAccount && receiverUserNameAccount && senderPin) {

            receiverUserNameAccount.accountBalance = parseInt(receiverUserNameAccount.accountBalance) + parseInt(transferAmount);
            senderUserNameAccount.accountBalance = parseInt(senderUserNameAccount.accountBalance) - parseInt(transferAmount);

            const transactionId = await generateTransactionId();

            const newSenderTransaction = new Transaction({
                senderAccountId: senderUserNameAccount._id,
                receiverAccountId: receiverUserNameAccount._id,
                amountTransferred: transferAmount,
                transactionId,
                transactionType: "debit",
            });

            const newReceiverTransaction = new Transaction({
                senderAccountId: senderUserNameAccount._id,
                receiverAccountId: receiverUserNameAccount._id,
                amountReceived: transferAmount,
                transactionId,
                transactionType: "credit",
            });

            senderUserNameAccount.transactions.push(newSenderTransaction);
            receiverUserNameAccount.transactions.push(newReceiverTransaction);

            await newReceiverTransaction.save();
            await newSenderTransaction.save();
            await senderUserNameAccount.save();
            await receiverUserNameAccount.save();

            return { newReceiverTransaction, newSenderTransaction };
        }
        return false;
    },

    async transferWithEmail(senderEmail, receiverEmail, transferAmount, senderTransactionPin) {

        const senderEmailAccount = await User.findOne({ email: senderEmail });

        const receiverEmailAccount = await User.findOne({ email: receiverEmail });

        const senderPin = senderEmailAccount.transactionPin === senderTransactionPin;

        if (senderEmailAccount && receiverEmailAccount && senderPin) {

            receiverEmailAccount.accountBalance = parseInt(receiverEmailAccount.accountBalance) + parseInt(transferAmount);
            senderEmailAccount.accountBalance = parseInt(senderEmailAccount.accountBalance) - parseInt(transferAmount);

            const transactionId = await generateTransactionId();

            const newSenderTransaction = new Transaction({
                senderAccountId: senderEmailAccount._id,
                receiverAccountId: receiverEmailAccount._id,
                transactionAmount: transferAmount,
                transactionId,
                transactionType: "debit",
            });

            const newReceiverTransaction = new Transaction({
                senderAccountId: senderEmailAccount._id,
                receiverAccountId: receiverEmailAccount._id,
                transactionAmount: transferAmount,
                transactionId,
                transactionType: "credit",
            });

            senderEmailAccount.transactions.push(newSenderTransaction);
            receiverEmailAccount.transactions.push(newReceiverTransaction);

            await newReceiverTransaction.save();
            await newSenderTransaction.save();
            await senderEmailAccount.save();
            await receiverEmailAccount.save();

            return { newReceiverTransaction, newSenderTransaction };
        } else {
            return false;
        }
    },

    async transferWithAccountNumber(senderAccountNumber, receiverAccountNumber, transferAmount, senderTransactionPin) {

        const senderAccountNumberAccount = await User.findOne({ accountNumber: senderAccountNumber });

        const receiverAccountNumberAccount = await User.findOne({ accountNumber: receiverAccountNumber });

        const senderPin = senderAccountNumberAccount.transactionPin === senderTransactionPin;

        if (senderAccountNumberAccount && receiverAccountNumberAccount && senderPin) {

            receiverAccountNumberAccount.accountBalance = parseInt(receiverAccountNumberAccount.accountBalance) + parseInt(transferAmount);
            senderAccountNumberAccount.accountBalance = parseInt(senderAccountNumberAccount.accountBalance) - parseInt(transferAmount);

            const transactionId = await generateTransactionId();

            const newSenderTransaction = new Transaction({
                senderAccountId: senderAccountNumberAccount._id,
                receiverAccountId: receiverAccountNumberAccount._id,
                transactionAmount: transferAmount,
                transactionId,
                transactionType: "debit",
            });

            const newReceiverTransaction = new Transaction({
                senderAccountId: senderAccountNumberAccount._id,
                receiverAccountId: receiverAccountNumberAccount._id,
                transactionAmount: transferAmount,
                transactionId,
                transactionType: "credit",
            });

            senderAccountNumberAccount.transactions.push(newSenderTransaction);
            receiverAccountNumberAccount.transactions.push(newReceiverTransaction);

            await newReceiverTransaction.save();
            await newSenderTransaction.save();
            await senderAccountNumberAccount.save();
            await receiverAccountNumberAccount.save();

            return { newReceiverTransaction, newSenderTransaction };
        } else {
            return false;
        }
    },

    async getUserTransactionsWithUserName(userName) {
        const user = await User.findOne({ userName });
        if (user) {
            let userTransactions = user.transactions
            let userTransactionsArray = [];

            for (let i = 0; i < userTransactions.length; i++) {
                const transaction = await Transaction.findById(userTransactions[i]);
                userTransactionsArray.push(transaction);
            }

            return userTransactionsArray;
        }
        return false;
    },

    async getUserTransactionsWithEmail(email) {
        const user = await User.findOne({ email });
        if (user) {
            let userTransactions = user.transactions
            let userTransactionsArray = [];

            for (let i = 0; i < userTransactions.length; i++) {
                const transaction = await Transaction.findById(userTransactions[i]);
                userTransactionsArray.push(transaction);
            }

            return userTransactionsArray;
        }
        return false;
    },

    async getUserTransactionsWithAccountNumber(accountNumber) {
        const user = await User.findOne({ accountNumber });
        if (user) {
            let userTransactions = user.transactions
            let userTransactionsArray = [];

            for (let i = 0; i < userTransactions.length; i++) {
                const transaction = await Transaction.findById(userTransactions[i]);
                userTransactionsArray.push(transaction);
            }

            return userTransactionsArray;
        }
        return false;
    },

    async getTransactionById(transactionId) {
        const transaction = await Transaction.findById(transactionId).populate('senderAccountId').populate('receiverAccountId');
        if (transaction) {
            return transaction;
        }
        return false;
    },

// set transaction pin
// change transaction pin 

}

export default transactionService;
