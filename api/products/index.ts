import express from 'express'
const router = express.Router()
const allProducts = [{
    id: 1,
    name: "product 01",
    price: 3000
}, {
    id: 2,
    name: "product 02",
    price: 2000
}]
// get all products 
router.get('/', (req, res) => {
    res.send(allProducts)
})

export default router