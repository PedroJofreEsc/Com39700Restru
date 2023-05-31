import { Router, json } from "express";
import { mockController } from "../controller/mock.controller.js";
const mockRouter = Router();
mockRouter.use(json());

mockRouter.get("/mockingproducts", mockController.mockingProduct)
mockRouter.get("/mockingproducts/:qty", mockController.mockinNgProduct)
export default mockRouter