import { Router } from 'express';
import fetchCompanies from '../controllers/fetchCompanies.controller.js';
import chechCurrencies from '../middlewares/chechCurrencies.middleware.js';

const companiesRouter = Router();

/**
 * @swagger
 * /api/companies/currency:
 *   post:
 *     summary: Get list of companies holding the currency
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currency:
 *                 type: string
 *                 description: The currency you want to fetch company for.
 *             example:
 *               currency: bitcoin
 *     responses:
 *       '200':
 *         description: Successfully retrieved list of companies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: Company name.
 *                 example: ["Company A", "Company B", "Company C"]
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


companiesRouter.route("/currency").post(chechCurrencies,fetchCompanies);

export default companiesRouter;
