
import { Router } from 'express';
import checkCrypto from '../middlewares/checkCrypto.middleware.js';
import cryptoConvert from '../controllers/cryptoConversion.controller.js';

const convertRouter = Router();

/**
 * @swagger
 * /api/convert/crypto:
 *   post:
 *     summary: Convert the price of one cryptocurrency to another on a specific date.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromCurrency:
 *                 type: string
 *                 description: The currency to convert from.
 *               toCurrency:
 *                 type: string
 *                 description: The currency to convert to.
 *               date:
 *                 type: string
 *                 description: The date of conversion.
 *             example:
 *               fromCurrency: bitcoin
 *               toCurrency: ethereum
 *               date: "12-08-2023"
 *     responses:
 *       '200':
 *         description: Successfully retrieved exchange rate.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exchangeRate:
 *                   type: number
 *                   description: The calculated exchange rate.
 *                   example: 4.5678
 *       '403':
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
convertRouter.route("/crypto").post(checkCrypto, cryptoConvert);

export default convertRouter;
