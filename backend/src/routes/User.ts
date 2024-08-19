import User from "../models/User";
import express, { Request, Response } from "express";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/", async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  const { username, password, email, mobileNumber } = req.body;

  try {
    const user = await User.create({
      username,
      password,
      email,
      mobileNumber,
      isActive: true,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params; // Get the user ID from the URL parameter
  const { username, password, email, mobileNumber } = req.body; // Get updated user data

  try {
    // Find the user by ID
    const user = await User.findByPk(id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data
    user.username = username;
    user.password = password; // Consider hashing password before storing
    user.email = email;
    user.mobileNumber = mobileNumber;

    // Save the updated user
    await user.save();

    // Send successful response with updated user data
    res.status(200).json(user);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.destroy({ where: { id } });

    if (deletedUser) {
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
