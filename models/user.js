const { Schema, model } = require("mongoose");

const UserSchema = new Schema (
    {
        firstName: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        accountNumber: {
            type: Number,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
        },
        accountBalance: {
            type: Number,
            default: 10000,
        },
        transactions: [
            {
                type: Schema.Types.ObjectId,
                ref: "Transaction",
            },
        ],
        transactionPin: {
            type: Number,
            default: 2580,
        },
        password: {
            type: String,
            required: true,
        },
        verificationCode: {
            type: Number,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        passwordResetCode: {
            type: String,
        },
    },
    { timestamps: true }
)

module.exports = model("User", UserSchema);