import mongoose from 'mongoose';
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: false, trim: true },
  description: { type: String, default: '' },
  priority: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now, immutable: false },
  updatedAt: { type: Date, default: Date.now },
  dueDate: { type: Date }
}, { collection: 'tasks' });
// Pas de hooks pour updatedAt / immutabilité -> BUG
export default mongoose.model('Task', TaskSchema);
