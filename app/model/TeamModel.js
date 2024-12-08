import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    image: { 
        type: String,
        default: 'default-image.jpg' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const TeamMember = mongoose.model('teams', teamMemberSchema);

export default TeamMember;

