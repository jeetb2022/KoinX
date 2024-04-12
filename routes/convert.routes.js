import { Router } from 'express';
import checkCrypto from '../middlewares/checkCrypto.middleware.js';
import cryptoConvert from '../controllers/cryptoConversion.controller.js';

const convertRouter = Router();

convertRouter.route("/crypto").post(checkCrypto, cryptoConvert);

export default convertRouter;
