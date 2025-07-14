import express from "express"
import {Products }from "../controllers/productsController.js"

const router=express.Router()
router.get("/products",Products)


export default router