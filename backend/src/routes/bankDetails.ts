import bankDetails from "../models/bankDetails";
import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";

const router = express.Router();

// Middleware for centralized error handling
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", error.message);
  res.status(500).json({ error: "Internal Server Error" });
};

// Input validation schema using Joi
const bankDetailsSchema = Joi.object({
  accountNumber: Joi.string().min(10).max(20).required(),
  ifsc: Joi.string().pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/).required(),
  bankName: Joi.string().min(3).max(50).required(),
  userId: Joi.number().integer().positive().required(),
});

// GET all bank details
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allBankDetails = await bankDetails.findAll();
    res.status(200).json(allBankDetails);
  } catch (error) {
    next(error);
  }
});

// GET bank details by ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const bankDetail = await bankDetails.findByPk(id);

    if (!bankDetail) {
      return res.status(404).json({ error: "Bank details not found" });
    }

    res.status(200).json(bankDetail);
  } catch (error) {
    next(error);
  }
});

// POST create new bank details
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { accountNumber, ifsc, bankName, userId } = req.body;

  // Validate the input
  const { error } = bankDetailsSchema.validate({ accountNumber, ifsc, bankName, userId });
  if (error) return res.status(400).json({ error: error.message });

  try {
    const newBankDetail = await bankDetails.create({ accountNumber, ifsc, bankName, userId });
    res.status(201).json({ message: "Bank details created successfully", newBankDetail });
  } catch (error) {
    next(error);
  }
});

// PUT update bank details
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { accountNumber, ifsc, bankName, userId } = req.body;

  // Validate the input
  const { error } = bankDetailsSchema.validate({ accountNumber, ifsc, bankName, userId });
  if (error) return res.status(400).json({ error: error.message });

  try {
    const bankDetail = await bankDetails.findByPk(id);

    if (!bankDetail) {
      return res.status(404).json({ error: "Bank details not found" });
    }

    // Update fields
    bankDetail.accountNumber = accountNumber;
    bankDetail.ifsc = ifsc;
    bankDetail.bankName = bankName;
    bankDetail.userId = userId;

    await bankDetail.save();
    res.status(200).json({ message: "Bank details updated successfully", bankDetail });
  } catch (error) {
    next(error);
  }
});

// DELETE bank details
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const deletedCount = await bankDetails.destroy({ where: { id } });

    if (!deletedCount) {
      return res.status(404).json({ error: "Bank details not found" });
    }

    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
});

// Apply the error-handling middleware
router.use(errorHandler);

export default router;

// import bankDetails from "../models/bankDetails";
// import express, { Request, Response } from "express";

// const router = express.Router();

// router.get('/', async (req: Request, res: Response) => {
//     try {
//         const BankDetails = await bankDetails.findAll();
//         res.status(200).json(BankDetails);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// router.get('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     try {
//         const BankDetails = await bankDetails.findByPk(id);
//         res.status(200).json(BankDetails);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// router.post("/", async (req: Request, res: Response) => {
//     console.log("req.body", req.body);
//     const { accountNumber, ifsc, bankName, userId } = req.body;
//     try {
//         const BankDetails = await bankDetails.create({
//             accountNumber,
//             ifsc,
//             bankName,
//             userId,
//         });
//         res.status(201).json(BankDetails);
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.put("/:id", async (req: Request, res: Response) => {
//     const { id } = req.params; // Get the Bank Details ID from the URL parameter
//     const { accountNumber, ifsc, bankName, userId } = req.body; // Get updated user data
//     try {
//         // Find the Bank Deatails by ID
//         const BankDetails = await bankDetails.findByPk(id);

//         // Check if Bank Details exists
//         if (!BankDetails) {
//             return res.status(404).json({ error: "Bank Details not found" });
//         }

//         // Update Bank Details data
//         BankDetails.accountNumber = accountNumber;
//         BankDetails.ifsc = ifsc;
//         BankDetails.bankName = bankName;
//         BankDetails.userId = userId;

//         // Save the updated Bank Details
//         await BankDetails.save();

//         // Send successful response with updated Bank Details data
//         res.status(200).json(BankDetails);
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.delete('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//         const deletedBankDetails = await bankDetails.destroy({ where: { id } });

//         if (deletedBankDetails) {
//             res.status(204).send(); // No content response
//         } else {
//             res.status(404).json({ error: 'Bank Details not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// export default router;
