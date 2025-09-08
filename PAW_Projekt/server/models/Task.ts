import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
{
    name: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ['niski', 'średni', 'wysoki'], default: 'średni' },
    story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
    estimatedTime: { type: Number },
    state: { type: String, enum: ['todo', 'doing', 'done'], default: 'todo' },
    createdAt: { type: Date, default: Date.now },
    startDate: { type: Date },
    endDate: { type: Date },
    assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Task', TaskSchema);
