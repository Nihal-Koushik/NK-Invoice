import User from "../models/User";
import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import Joi from "joi";

const router = express.Router();

// Middleware for error handling
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", error.message);
  res.status(500).json({ error: "An unexpected error occurred" });
};

// Input validation schemas
const userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().min(10).max(15).required(),
});

// GET all users
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Exclude sensitive information
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// GET user by ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }, // Exclude sensitive information
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// POST create a new user
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, email, mobileNumber } = req.body;

  // Validate input
  const { error } = userValidationSchema.validate({ username, password, email, mobileNumber });
  if (error) return res.status(400).json({ error: error.message });

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      mobileNumber,
      isActive: true,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    next(error);
  }
});

// PUT update an existing user
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; // Get the user ID from he URL parameter 
  const { username, password, email, mobileNumber } = req.body; // Get updated user data

  // Validate input
  const { error } = userValidationSchema.validate({ username, password, email, mobileNumber });
  if (error) return res.status(400).json({ error: error.message });

  try {
    // Find the user by ID
    const user = await User.findByPk(id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data
    // Update fields, hash password if provided
    user.username = username;
    user.password = password; // Consider hashing password before storing
    user.email = email;
    user.mobileNumber = mobileNumber;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    await user.save();

    // Send successful response with updated user data
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    next(error);
  }
});

// DELETE a user
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.destroy({ where: { id } });

    if (deletedUser) {
      res.status(204).send(); // No content response
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Use error handling middleware
router.use(errorHandler);

export default router;


// import User from "../models/User";
// import express, { Request, Response } from "express";
// import bcrypt from 'bcrypt';

// const router = express.Router();

// router.get('/', async (req: Request, res: Response) => {
//   try {
//     const users = await User.findAll();
//     res.status(200).json(users);
//     if (!users) {
//       return res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.get('/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByPk(id);
//     res.status(200).json(user);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post("/", async (req: Request, res: Response) => {
//   console.log("req.body", req.body);
//   const { username, password, email, mobileNumber } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   user.password = hashedPassword;
//   try {
//     const user = await User.create({
//       username,
//       password,
//       email,
//       mobileNumber,
//       isActive: true,
//     });
//     res.status(201).json(user);
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.put("/:id", async (req: Request, res: Response) => {
//   const { id } = req.params; // Get the user ID from the URL parameter
//   const { username, password, email, mobileNumber } = req.body; // Get updated user data

//   try {
//     // Find the user by ID
//     const user = await User.findByPk(id);

//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Update user data
//     user.username = username;
//     user.password = password; // Consider hashing password before storing
//     user.email = email;
//     user.mobileNumber = mobileNumber;

//     // Save the updated user
//     await user.save();

//     // Send successful response with updated user data
//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.delete('/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const deletedUser = await User.destroy({ where: { id } });

//     if (deletedUser) {
//       res.status(204).send(); // No content response
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// export default router;
