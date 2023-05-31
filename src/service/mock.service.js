import { generateProduct, generateUser } from "../utils.js"


class mockService {

    static mockProduct = (mockProductQty = 100) => {
        let product = []
        for (let i = 0; i < mockProductQty; i++) {
            const newProduct = generateProduct()
            product.push(newProduct)
        }
        return product
    }
}

export { mockService }