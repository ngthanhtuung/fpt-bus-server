require('dotenv').config();
const { Wallet, Transaction } = require('../models');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const currentDate = require("../utils/currentDate");

const topUpWallet = async (req, res) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 1000,
            currency: 'vnd',
            description: 'Top up wallet',
            payment_method_types: ['pm_card_visa', 'pm_card_mastercard'],
            receipt_email: req.email,
        })
        console.log('User login id: ', req.user_id);
        if (paymentIntent) {
            console.log('Payment intent: ', paymentIntent)
            const wallet = await Wallet.findOne({
                where: {
                    user_id: req.user_id
                }
            })
            wallet.balance = wallet.balance + amount;
            await wallet.save();
            const transaction = await Transaction.create({
                id: uuidv4(),
                wallet_id: wallet.id,
                amount: amount,
                type: 'TOPUP',
                status: 'SUCCESS',
                description: `Top up to wallet ${wallet.id} with amount ${amount}`,
                createdAt: currentDate(),
                updatedAt: currentDate()
            })
            res.status(200).json({
                status: "Success",
                message: `Top up to wallet ${wallet.id} with amount ${amount}`,
                data: transaction
            })

        }
    } catch (err) {
        res.status(500).json({
            status: "Fail",
            message: err.message
        })
    }
}

module.exports = {
    topUpWallet
}