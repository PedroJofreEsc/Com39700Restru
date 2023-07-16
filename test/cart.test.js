import chai from "chai"

import supertest from "supertest"

const expect = chai.expect
const requester = supertest("http://localhost:8080")

describe("testing de usuario carrito y producto", () => {

    describe("test de designs", () => {
        it("el endpoint GET /api/designs entregue los diseños", async () => {
            const result = await requester.get("/api/designs");
            expect(result).to.be.ok;
        });
        it("logra enocontrar un diseño por el id", async () => {
            let design = "64568057a7d77c180696ec3f"
            const result = await requester.get(`/api/designs/${design}`)
            const item = result._body.payLoad
            console.log(item._id);
            expect(item._id).to.be.equal(design)
        })
    });

    describe("test de caro", () => {
        let authToken = "";
        let cart
        let userId
        it("el endpoint get de api/cart entregue todos los carritos", async () => {
            const result = await requester.get("/api/carts");
            console.log(result.body.payload)
            expect(result).to.be.ok;
        });
        before(async () => {
            const userMock = {
                email: "a@coder.cl",
                password: "aaa",
            };
            const resultLog = await requester.post("/api/sessions/login").send(userMock);
            const cookies = resultLog.headers["set-cookie"][0].split(";");
            authToken = cookies[0].split("=")[1];
            const result = await requester.get("/api/user/profile").set("Cookie", `authToken= ${authToken}`);

            cart = result.body.payLoad.cart[0]["_id"]
            userId = result.body.payLoad._id
        });
    })
})