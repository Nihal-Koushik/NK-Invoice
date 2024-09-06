import Clients from "../models/client";
import express, { Request, Response } from "express";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const client = await Clients.findAll();
        res.status(200).json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const client = await Clients.findByPk(id);
        res.status(200).json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/", async (req: Request, res: Response) => {
    console.log("req.body", req.body);
    const { name, email, address, mobileNumber, GSTIN } = req.body;
    try {
        const client = await Clients.create({
            name,
            email,
            address,
            mobileNumber,
            GSTIN
        });
        res.status(201).json(client);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params; // Get the user ID from the URL parameter
    const { name, email, address, mobileNumber, GSTIN } = req.body; // Get updated user data
    try {
        // Find the user by ID
        const client = await Clients.findByPk(id);

        // Check if user exists
        if (!client) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user data
        client.name = name;
        client.email = email;
        client.address = address;
        client.mobileNumber = mobileNumber;
        client.GSTIN = GSTIN;

        // Save the updated user
        await client.save();

        // Send successful response with updated user data
        res.status(200).json(client);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedClient = await Clients.destroy({ where: { id } });

        if (deletedClient) {
            res.status(204).send(); // No content response
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
