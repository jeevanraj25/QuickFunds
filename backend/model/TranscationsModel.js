import mongoose from "mongoose";

const userTransaction = new mongoose.Schema(
    {
        recivedId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        amount: {
            type: Number, 
            required: true,
        },
    },
    { timestamps: true }
);

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", userTransaction);

export default Transaction;
