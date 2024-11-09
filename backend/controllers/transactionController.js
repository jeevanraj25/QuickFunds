import mongoose from "mongoose";
import Account from "../model/AccountModel.js";
import Transaction from "../model/TranscationsModel.js";
import User from "../model/UserModel.js";

export const getBalance = async (req, res) => {
  try {
    // const userId = req.id;
    //   console.log(req.id)
    const user = await Account.findOne({
      userId: req.id,
    });

    const bal = user.balance;
    return res.status(200).json({
      bal,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const Transfer = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { amount, id } = req.body;
  
  //user id
  const account = await Account.findOne({ userId: req.id }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  // reciver id
  const toAccount = await Account.findOne({ userId: id }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer
  await Account.updateOne(
    { userId: req.id },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: id },
    { $inc: { balance: amount } }
  ).session(session);

  const CreateTransaction = await Transaction.create({
    recivedId: id,
    senderId: req.id,
    amount: amount,
  });

  await CreateTransaction.save();
  // Commit the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
};

export const getlatestTransactions = async (req, res) => {
  try {
    const data = await User.aggregate([
      // Step 1: Match to exclude a specific user
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(req.id) } } },
      // Step 2: Look up transactions where the user is either the sender or receiver
      {
        $lookup: {
          from: "transactions", // Collection for transactions
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ["$senderId", "$$userId"] },
                    { $eq: ["$recivedId", "$$userId"] },
                  ],
                },
              },
            },
            { $sort: { createdAt: -1 } }, // Sort by createdAt in descending order
            { $limit:1},
            // Step 3: Project only amount and createdAt for transactions
            {
              $project: {
                _id: 0,
                amount: 1,
                createdAt: 1,
              },
            },
          ],
          as: "transactions",
        },
      },

      // Step 4: Project only the necessary fields in the user document
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          transactions: 1, // Keep transactions array with selected fields
        },
      },
    ]);

    const formattedData = data.map((user) => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      transactions: user.transactions.map((transaction) => ({
        amount: transaction.amount,
        date: transaction.createdAt,
      })),
    }));

    return res.status(200).json({
      message: "all the transactions",
      formattedData,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error,
    });
  }
};
