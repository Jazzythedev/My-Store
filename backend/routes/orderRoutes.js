import express  from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

//post to create new
router.route('/').post(protect, addOrderItems)
//get to read data back
router.route('/:id').get(protect, getOrderById)
//Put is called when updating something
router.route('/:id/pay').put(protect, updateOrderToPaid)
export default router
