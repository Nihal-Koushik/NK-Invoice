import Clients from "../models/client";
import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";

const router = express.Router();

// Error handling middleware
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An unexpected error occurred" });
};

// Validation schema for client inputs
const clientValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    address: Joi.string().min(10).max(200).required(),
    mobileNumber: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    GSTIN: Joi.string().alphanum().length(15).required(),
});

// GET all clients
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clients = await Clients.findAll();
        res.status(200).json(clients);
    } catch (error) {
        next(error);
    }
});

// GET client by ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const client = await Clients.findByPk(id);

        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }

        res.status(200).json(client);
    } catch (error) {
        next(error);
    }
});

// POST create a new client
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, address, mobileNumber, GSTIN } = req.body;

    // Validate input
    const { error } = clientValidationSchema.validate({ name, email, address, mobileNumber, GSTIN });
    if (error) return res.status(400).json({ error: error.message });

    try {
        const client = await Clients.create({ name, email, address, mobileNumber, GSTIN });
        res.status(201).json({ message: "Client created successfully", client });
    } catch (error) {
        next(error);
    }
});

// PUT update an existing client
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // Get the client ID from the URL parameter
    const { name, email, address, mobileNumber, GSTIN } = req.body; // Get updated client data

    // Validate input
    const { error } = clientValidationSchema.validate({ name, email, address, mobileNumber, GSTIN });
    if (error) return res.status(400).json({ error: error.message });// 

    try {
        // Find the client by ID

        const client = await Clients.findByPk(id);

        // Check if client exists
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }

        // Update client data
        client.name = name;
        client.email = email;
        client.address = address;
        client.mobileNumber = mobileNumber;
        client.GSTIN = GSTIN;

        // Save the updated client
        await client.save();
        res.status(200).json({ message: "Client updated successfully", client });
    } catch (error) {
        next(error);
    }
});

// DELETE a client
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const deletedClient = await Clients.destroy({ where: { id } });

        if (deletedClient) {
            res.status(204).send(); // No content response
        } else {
            res.status(404).json({ error: "Client not found" });
        }
    } catch (error) {
        next(error);
    }
});

// Use error handling middleware
router.use(errorHandler);

export default router;


// import Clients from "../models/client";
// import express, { Request, Response } from "express";

// const router = express.Router();

// router.get('/', async (req: Request, res: Response) => {
//     try {
//         const client = await Clients.findAll();
//         res.status(200).json(client);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// router.get('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     try {
//         const client = await Clients.findByPk(id);
//         res.status(200).json(client);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// router.post("/", async (req: Request, res: Response) => {
//     console.log("req.body", req.body);
//     const { name, email, address, mobileNumber, GSTIN } = req.body;
//     try {
//         const client = await Clients.create({
//             name,
//             email,
//             address,
//             mobileNumber,
//             GSTIN,
//         });
//         res.status(201).json(client);
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.put("/:id", async (req: Request, res: Response) => {
//     const { id } = req.params; // Get the client ID from the URL parameter
//     const { name, email, address, mobileNumber, GSTIN } = req.body; // Get updated client data
//     try {
//         // Find the client by ID
//         const client = await Clients.findByPk(id);

//         // Check if client exists
//         if (!client) {
//             return res.status(404).json({ error: "Client not found" });
//         }

//         // Update client data
//         client.name = name;
//         client.email = email;
//         client.address = address;
//         client.mobileNumber = mobileNumber;
//         client.GSTIN = GSTIN;

//         // Save the updated client
//         await client.save();

//         // Send successful response with updated client data
//         res.status(200).json(client);
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.delete('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//         const deletedClient = await Clients.destroy({ where: { id } });

//         if (deletedClient) {
//             res.status(204).send(); // No content response
//         } else {
//             res.status(404).json({ error: 'Client not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// export default router;
