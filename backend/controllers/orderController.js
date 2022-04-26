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

// @desc Get order by ID
// @route GET/api/orders/:id 
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Orders.findById(req.params.id).populate(
        'user',
        'name email'
    )

    if (order) {
        return res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc updated order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Orders.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
            }

            const updatedOrder = await order.save()

            return res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error ('Order not found')
    }
})

// @desc Get logged in user Orders
// @route GET /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req,res) => {
    const orders = await Orders.find({ user: req.user._id})
    return res.json(orders)
})


export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders }