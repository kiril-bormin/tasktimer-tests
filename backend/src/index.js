import { connectMongo } from './db/mongo.js';
import app from './server.js';
const PORT = process.env.PORT || 3000;
await connectMongo();
app.listen(PORT, () => console.log(`[TaskTimer BUG] API http://localhost:${PORT}`));
