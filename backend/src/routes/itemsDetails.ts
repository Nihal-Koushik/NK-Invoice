import itemsDetails from "../models/itemsDetails";
import express, { Request, Response } from "express";
import Joi from "joi";

const router = express.Router();

//Joi Validation Schema for Items Details

const itemsDetailsSchema = Joi.object({
    itemsName: Joi.string().required().label("Item Name"),
    quantity: Joi.number().integer().positive().required().label("Quantity"),
    rate: Joi.number().positive().required().label("Rate"),
    invoiceId: Joi.number().integer().required().label("Invoice ID"),
});

//Middleware to validate request data using Joi

const validateItemsDetails = (req: Request, res: Response, next: Function) => {
    const { error } = itemsDetailsSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details.map((detail) => detail.message),
        });
    }
    next();
};

//Routes for Items Details Management
// Fetch all items details
router.get("/", async (req: Request, res: Response) => {
    try {
        const allItemsDetails = await itemsDetails.findAll();
        res.status(200).json({ success: true, data: allItemsDetails });
    } catch (error) {
        console.error("Error fetching items details:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Fetch single item details by ID
router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const singleItemDetails = await itemsDetails.findByPk(id);
        if (!singleItemDetails) {
            return res.status(404).json({ success: false, error: "Items Details not found" });
        }
        res.status(200).json({ success: true, data: singleItemDetails });
    } catch (error) {
        console.error(`Error fetching items details with ID ${id}:`, error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Create new item details
router.post("/", validateItemsDetails, async (req: Request, res: Response) => {
    const { itemsName, quantity, rate, invoiceId } = req.body;
    try {
        const newItemDetails = await itemsDetails.create({
            itemsName,
            quantity,
            rate,
            invoiceId,
        });
        res.status(201).json({ success: true, data: newItemDetails });
    } catch (error) {
        console.error("Error creating items details:", error);
        res.status(500).json({ success: false, error: "Failed to create items details. Please try again later." });
    }
});

// Update existing item details
router.put("/:id", validateItemsDetails, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { itemsName, quantity, rate, invoiceId } = req.body;
    try {
        const itemDetails = await itemsDetails.findByPk(id);
        if (!itemDetails) {
            return res.status(404).json({ success: false, error: "Items Details not found" });
        }

        // Update item details
        itemDetails.itemsName = itemsName;
        itemDetails.quantity = quantity;
        itemDetails.rate = rate;
        itemDetails.invoiceId = invoiceId;

        await itemDetails.save();
        res.status(200).json({ success: true, data: itemDetails });
    } catch (error) {
        console.error(`Error updating items details with ID ${id}:`, error);
        res.status(500).json({ success: false, error: "Failed to update items details. Please try again later." });
    }
});

// Delete item details
router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedItemDetails = await itemsDetails.destroy({ where: { id } });
        if (!deletedItemDetails) {
            return res.status(404).json({ success: false, error: "Items Details not found" });
        }
        res.status(204).send(); // No content response
    } catch (error) {
        console.error(`Error deleting items details with ID ${id}:`, error);
        res.status(500).json({ success: false, error: "Failed to delete items details. Please try again later." });
    }
});

export default router;

// import itemsDetails from "../models/itemsDetails";
// import express, { Request, Response } from "express";

// const router = express.Router();

// router.get('/', async (req: Request, res: Response) => {
//     try {
//         const ItemsDetails = await itemsDetails.findAll();
//         res.status(200).json(ItemsDetails);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// router.get('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     try {
//         const ItemsDetails = await itemsDetails.findByPk(id);
//         res.status(200).json(ItemsDetails);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// router.post("/", async (req: Request, res: Response) => {
//     console.log("req.body", req.body);
//     const { itemsName, quantity, rate, invoiceId } = req.body;
//     try {
//         const ItemsDetails = await itemsDetails.create({
//             itemsName,
//             quantity,
//             rate,
//             invoiceId,
//         });
//         res.status(201).json(ItemsDetails);
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.put("/:id", async (req: Request, res: Response) => {
//     const { id } = req.params; // Get the Items Details ID from the URL parameter
//     const { itemsName, quantity, rate, invoiceId } = req.body; // Get updated Items Details data
//     try {
//         // Find the Items Details by ID
//         const ItemsDetails = await itemsDetails.findByPk(id);

//         // Check if Items Details exists
//         if (!ItemsDetails) {
//             return res.status(404).json({ error: "Items Details not found" });
//         }

//         // Update Items Details data
//         ItemsDetails.itemsName = itemsName;
//         ItemsDetails.quantity = quantity;
//         ItemsDetails.rate = rate;
//         ItemsDetails.invoiceId = invoiceId;

//         // Save the updated Items Details
//         await ItemsDetails.save();

//         // Send successful response with updated Items Details data
//         res.status(200).json(ItemsDetails);
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.delete('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//         const deletedItemsDetails = await itemsDetails.destroy({ where: { id } });

//         if (deletedItemsDetails) {
//             res.status(204).send(); // No content response
//         } else {
//             res.status(404).json({ error: 'Items Details not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// export default router;