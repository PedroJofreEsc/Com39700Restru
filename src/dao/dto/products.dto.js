export class CreateProductDto {
    constructor(product) {
        this.title = product.title
        this.description = product.description
        this.code = product.code
        this.price = product.price
        this.category = product.category
    }

}
//no es necesario 
export class GetProductDto {
    constructor(productDB) {
        this.title = productDB.title
        this.description = productDB.description
        this.code = productDB.code
        this.price = productDB.price
        this.stock = productDB.stock
        this.category = productDB.category
        this.thumbnails = productDB.thumbnails
    }
}