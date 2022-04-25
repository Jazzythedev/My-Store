import express  from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

//post to create new
router.route('/').post(protect, addOrderItems)
//get to read back orders already made
router.route('/myorders').get(protect, getMyOrders)
//get to read data back
router.route('/:id').get(protect, getOrderById)
//Put is called when updating something
router.route('/:id/pay').put(protect, updateOrderToPaid)
export default router
