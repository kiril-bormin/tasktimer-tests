import Task from '../models/task.js';
export async function listTasks(){ return Task.find({}).lean(); }
export async function getTaskById(id){ return Task.findById(id).lean(); }
export async function createTask(data){ const doc = new Task(data); return doc.save(); }
export async function updateTask(id, data){ data.createdAt = new Date(); return Task.findByIdAndUpdate(id, data, { new:true }).lean(); }
export async function deleteTask(id){ return Task.findByIdAndDelete(id).lean(); }
