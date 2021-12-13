const { Schema, model } = require("mongoose");

const TransactionSchema = new Schema (
    {
        senderAccountId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        receiverAccountId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        transactionAmount: {
            type: Number,
        },
        transactionId: {
            type: String,
        },
        transactionType: {
            type: String,
            enum: ["credit", "debit"],
        },
        transactionNarration: {
            type: String,
        }
    },
    { timestamps: true }
)

module.exports = model("Transaction", TransactionSchema);