require('dotenv').config();
const { Wallet, Transaction, Users } = require('../models');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const currentDate = require("../utils/currentDate");
const { or } = require('sequelize');

const topUpWallet = async (req, res) => {
    try {
        const { amount } = req.body;
        if (amount == undefined || amount <= 15) {
            return res.status(400).json({
                status: "Fail",
                message: "Amount is required and amount must be greater than 15"
            })
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 1000,
            currency: 'vnd',
            description: 'Top up wallet',
            payment_method_types: ['card'],
            receipt_email: req.email,
        })
        console.log('User login id: ', req.user_id);
        if (paymentIntent) {
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

const getTransaction = async (req, res) => {
    try {
        const limit =
            !isNaN(Math.abs(parseInt(req.query.limit))) &&
                Math.abs(parseInt(req.query.limit)) > 0
                ? Math.abs(parseInt(req.query.limit))
                : 10;
        const page =
            !isNaN(Math.abs(parseInt(req.query.page))) &&
                Math.abs(parseInt(req.query.limit)) > 0
                ? Math.abs(parseInt(req.query.page))
                : 1;
        const offset = (page - 1) * limit;
        const numPage = Math.ceil((await Transaction.count()) / limit);
        const wallet = await Wallet.findOne({
            where: {
                user_id: req.user_id
            },
            include: [
                {
                    model: Users,
                    attributes: ["fullname"]
                }
            ]
        })
        const { count, rows } = await Transaction.findAndCountAll({
            where: {
                wallet_id: wallet.id
            },
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']]
        })
        res.status(200).json({
            status: "Success",
            message: `Get all transactions ${wallet.dataValues.User.fullname}'s wallet`,
            pagination: {
                total: count,
                per_page: limit,
                current_page: page,
                total_page: numPage
            },
            data: rows
        })
    } catch (err) {
        res.status(500).json({
            status: "Fail",
            message: err.message
        })
    }
}
module.exports = {
    topUpWallet,
    getTransaction
}