import asyncHandler from 'express-async-handler'
import Orders from '../models/orderModel.js'

// @desc Create new Order
//@route POST/api/order
// @access Privaet
const addOrderItems = asyncHandler(async (req,res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    if (!orderItems || orderItems.length === 0) {
        res.status(404) 
        throw new Error( 'Empty order items' )
    } else {
        const order = new Orders ({
            user: req.user._id,
            orderItems, 
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder =  await order.save()
        return res.status(201).json(createdOrder) 
    }
})

export { addOrderItems }