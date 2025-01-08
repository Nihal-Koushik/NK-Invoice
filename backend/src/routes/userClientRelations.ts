import userClientRelations from "../models/userClientRelations";
import express, { Request, Response } from "express";
import Joi from "joi";

const router = express.Router();

// Joi Validation Schema for User-Client Relations

const userClientRelationsSchema = Joi.object({
    userId: Joi.number().integer().required().label("User ID"),
    clientId: Joi.number().integer().required().label("Client ID"),
});

// Middleware to validate request data using Joi
const validateUserClientRelations = (req: Request, res: Response, next: Function) => {
    const { error } = userClientRelationsSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details.map((detail) => detail.message),
        });
    }
    next();
};

// Routes for User-Client Relations
// Fetch all user-client relations
router.get("/", async (req: Request, res: Response) => {
    try {
        const relations = await userClientRelations.findAll();
        res.status(200).json({ success: true, data: relations });
    } catch (error) {
        console.error("Error fetching user-client relations:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Fetch a single user-client relation by ID
router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const relation = await userClientRelations.findByPk(id);
        if (!relation) {
            return res.status(404).json({ success: false, error: "Relation not found" });
        }
        res.status(200).json({ success: true, data: relation });
    } catch (error) {
        console.error(`Error fetching relation with ID ${id}:`, error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Create a new user-client relation
router.post("/", validateUserClientRelations, async (req: Request, res: Response) => {
    const { userId, clientId } = req.body;
    try {
        const newRelation = await userClientRelations.create({ userId, clientId });
        res.status(201).json({ success: true, data: newRelation });
    } catch (error) {
        console.error("Error creating user-client relation:", error);
        res.status(500).json({ success: false, error: "Failed to create relation. Please try again later." });
    }
});

// Update an existing user-client relation
router.put("/:id", validateUserClientRelations, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, clientId } = req.body;
    try {
        const relation = await userClientRelations.findByPk(id);
        if (!relation) {
            return res.status(404).json({ success: false, error: "Relation not found" });
        }

        // Update relation data
        relation.userId = userId;
        relation.clientId = clientId;
        await relation.save();
        res.status(200).json({ success: true, data: relation });
    } catch (error) {
        console.error(`Error updating relation with ID ${id}:`, error);
        res.status(500).json({ success: false, error: "Failed to update relation. Please try again later." });
    }
});

// Delete a user-client relation
router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedRelation = await userClientRelations.destroy({ where: { id } });
        if (!deletedRelation) {
            return res.status(404).json({ success: false, error: "Relation not found" });
        }
        res.status(204).send(); // No content response
    } catch (error) {
        console.error(`Error deleting relation with ID ${id}:`, error);
        res.status(500).json({ success: false, error: "Failed to delete relation. Please try again later." });
    }
});

export default router;


// import userClientRelations from "../models/userClientRelations";
// import express, { Request, Response } from "express";

// const router = express.Router();

// router.get('/', async (req: Request, res: Response) => {
//     try {
//         const UserClientRelations = await userClientRelations.findAll();
//         res.status(200).json(UserClientRelations);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// router.get('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     try {
//         const UserClientRelations = await userClientRelations.findByPk(id);
//         res.status(200).json(UserClientRelations);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// router.post("/", async (req: Request, res: Response) => {
//     console.log("req.body", req.body);
//     const { userId, clientId } = req.body;
//     try {
//         const UserClientRelations = await userClientRelations.create({
//             userId,
//             clientId
//         });
//         res.status(201).json(UserClientRelations);
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.put("/:id", async (req: Request, res: Response) => {
//     const { id } = req.params; // Get the userClientRelations ID from the URL parameter
//     const { userId, clientId } = req.body; // Get updated userClientRelations data

//     try {
//         // Find the userClientRelations by ID
//         const UserClientRelations = await userClientRelations.findByPk(id);

//         // Check if userClientRelations exists
//         if (!UserClientRelations) {
//             return res.status(404).json({ error: "User Client Relations not found" });
//         }

//         // Update userClientRelations data
//         UserClientRelations.userId = userId;
//         UserClientRelations.clientId = clientId;

//         // Save the updated userClientRelations
//         await UserClientRelations.save();

//         // Send successful response with updated userClientRelations data
//         res.status(200).json(UserClientRelations);
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.delete('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//         const deletedUserClientRelations = await userClientRelations.destroy({ where: { id } });

//         if (deletedUserClientRelations) {
//             res.status(204).send(); // No content response
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// export default router;