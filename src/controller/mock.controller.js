import { mockService } from "../service/mock.service.js"

class mockController {

    static mockingProduct = async (req, res) => {

        const result = await mockService.mockProduct()

        res.send({ status: "ok", payload: result })
    }
    static mockinNgProduct = async (req, res) => {
        const qty = req.params.qty
        console.log(qty)
        const result = await mockService.mockProduct(qty)

        res.send({ status: "ok", payload: result })
    }
}

export { mockController }