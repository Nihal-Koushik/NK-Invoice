import Invoice from "../models/Invoice";
import express, { Request, Response } from "express";
import Joi from "joi";

const router = express.Router();

// Joi Validation Schema for Invoices
const invoiceSchema = Joi.object({
    invoiceNumber: Joi.string().required().label("Invoice Number"),
    dueDate: Joi.date().required().label("Due Date"),
    clientId: Joi.number().integer().required().label("Client ID"),
});

// Middleware to validate request data using Joi
const validateInvoice = (req: Request, res: Response, next: Function) => {
    const { error } = invoiceSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details.map((detail) => detail.message),
        });
    }
    next();
};

// Routes for Invoice Management
// Fetch all invoices
router.get("/", async (req: Request, res: Response) => {
    try {
        const invoices = await Invoice.findAll();
        res.status(200).json({ success: true, data: invoices });
    } catch (error) {
        console.error("Error fetching invoices:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Fetch a single invoice by ID
router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const invoice = await Invoice.findByPk(id);

        if (!invoice) {
            return res.status(404).json({ success: false, error: "Invoice not found" });
        }

        res.status(200).json({ success: true, data: invoice });
    } catch (error) {
        console.error(`Error fetching invoice with ID ${id}:`, error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Create a new invoice
router.post("/", validateInvoice, async (req: Request, res: Response) => {
    const { invoiceNumber, dueDate, clientId } = req.body;

    try {
        const newInvoice = await Invoice.create({ invoiceNumber, dueDate, clientId });
        res.status(201).json({ success: true, data: newInvoice });
    } catch (error) {
        console.error("Error creating invoice:", error);
        res.status(500).json({ success: false, error: "Failed to create invoice. Please try again later." });
    }
});

// Update an existing invoice
router.put("/:id", validateInvoice, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { invoiceNumber, dueDate, clientId } = req.body;

    try {
        const invoice = await Invoice.findByPk(id);

        if (!invoice) {
            return res.status(404).json({ success: false, error: "Invoice not found" });
        }

        // Update invoice details
        invoice.invoiceNumber = invoiceNumber;
        invoice.dueDate = dueDate;
        invoice.clientId = clientId;
        await invoice.save();

        res.status(200).json({ success: true, data: invoice });
    } catch (error) {
        console.error(`Error updating invoice with ID ${id}:`, error);
        res.status(500).json({ success: false, error: "Failed to update the invoice. Please try again later." });
    }
});

// Delete an invoice
router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedInvoice = await Invoice.destroy({ where: { id } });

        if (!deletedInvoice) {
            return res.status(404).json({ success: false, error: "Invoice not found" });
        }

        res.status(204).send(); // No content response
    } catch (error) {
        console.error(`Error deleting invoice with ID ${id}:`, error);
        res.status(500).json({ success: false, error: "Failed to delete the invoice. Please try again later." });
    }
});

export default router;


// import Invoice from "../models/Invoice";
// import express, { Request, Response } from "express";

// const router = express.Router();

// router.get('/', async (req: Request, res: Response) => {
//     try {
//         const invoices = await Invoice.findAll();
//         res.status(200).json(invoices);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// router.get('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     try {
//         const invoices = await Invoice.findByPk(id);
//         res.status(200).json(invoices);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// router.post("/", async (req: Request, res: Response) => {
//     console.log("req.body", req.body);
//     const { invoiceNumber, dueDate, clientId } = req.body;
//     try {
//         const invoices = await Invoice.create({
//             invoiceNumber,
//             dueDate,
//             clientId,
//         });
//         res.status(201).json(invoices);
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.put("/:id", async (req: Request, res: Response) => {
//     const { id } = req.params; // Get the invoice ID from the URL parameter
//     const { invoiceNumber, dueDate, clientId } = req.body; // Get updated invoice data
//     try {
//         // Find the invoice by ID
//         const invoices = await Invoice.findByPk(id);

//         // Check if invoice exists
//         if (!invoices) {
//             return res.status(404).json({ error: "Invoice not found" });
//         }

//         // Update invoice data
//         invoices.invoiceNumber = invoiceNumber;
//         invoices.dueDate = dueDate;
//         invoices.clientId = clientId;

//         // Save the updated invoice
//         await invoices.save();

//         // Send successful response with updated invoice data
//         res.status(200).json(invoices);
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.delete('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//         const deletedInvoices = await Invoice.destroy({ where: { id } });

//         if (deletedInvoices) {
//             res.status(204).send(); // No content response
//         } else {
//             res.status(404).json({ error: 'Invoice not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// export default router;
