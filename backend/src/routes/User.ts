import User from '../models/user';
import { app } from './index'

app.get('/user', async (req: Request, res: Response) => {

    //const token = req.headers.authorization?.replace('Bearer ', '') || '';
    //const userId = getUserIdFromToken(token);

    // if (!userId) {
    //     return res.status(401).json({ error: 'Unauthorized' });
    // }
    const users = await User.findAll();
    // res.json(users);
    res.status(201).json(users);
});

app.post('/user', async (req: Request, res: Response) => {
    const { username, password, email, mobileNumber } = req.body;

    try {
        const user = await User.create({ username, password, email, mobileNumber, isActive: true });
        res.status(201).json(user);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.put('/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const token = req.headers.authorization?.replace('Bearer ', '') || '';
    const userId = getUserIdFromToken(token);

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { title, completed } = req.body;
    await Todo.update({ title, completed }, { where: { id: id, userId: userId } });
    res.json({ message: 'Todo updated successfully' });
});

app.delete('/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const token = req.headers.authorization?.replace('Bearer ', '') || '';
    const userId = getUserIdFromToken(token);

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    await Todo.destroy({ where: { id: id, userId: userId } });
    res.json({ message: 'Todo deleted successfully' });
});
