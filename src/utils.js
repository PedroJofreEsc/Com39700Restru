import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { option } from "./config/option.js";
import { faker, Faker, es, en } from "@faker-js/faker";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


///////////pasword
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
};

export const isValidPassword = (user, loginPassword) => {
    return bcrypt.compareSync(loginPassword, user.password);
}

export const generateEmailToken = (email, time) => {
    const token = jwt.sign({ email }, option.email.emailToken, { expiresIn: time })
    return token

}

export const validateEmailToken = (token) => {
    try {
        const info = jwt.verify(token, option.email.emailToken)
        return info.email
    }
    catch (error) {
        console.log(error.message)
        return null
    }
}

////////////mock


// const { commerce, image, database, string } = faker;

export const customFaker = new Faker({
    // Now multiple fallbacks are supported
    locale: [en],
});

const { commerce, image, database, string, internet, person, phone, datatype, lorem } = customFaker;

export const generateProduct = () => {
    return {
        id: database.mongodbObjectId(),
        title: commerce.productName(),
        price: parseFloat(commerce.price()),
        departament: commerce.department(),
        stock: parseInt(string.numeric(2)),
        image: image.url(),
        code: string.alphanumeric(10),
        description: commerce.productDescription()
    }
}
export const generateUser = () => {
    //generamos un numero aleatorio de productos, que se van agregar al carrito
    const productsNumber = Math.ceil(Math.random() * 10);// 1 y 10
    let products = [];
    for (let i = 0; i < productsNumber; i++) {
        const product = generateProduct();
        products.push(product)
    };
    return {
        id: database.mongodbObjectId(),
        first_name: person.firstName(),
        last_name: person.lastName(),
        phone: phone.number(),
        email: internet.email(),
        avatar: image.avatar(),
        role: datatype.boolean() ? 'premium' : 'user',
        jobTitle: person.jobTitle(),
        cart: products
    }
};