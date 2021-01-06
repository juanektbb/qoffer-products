import { Router } from 'express'
const router = Router()

import * as ProductController from '../controllers/ProductController.js'

router.post("/product", ProductController.submitCSV)

export default router