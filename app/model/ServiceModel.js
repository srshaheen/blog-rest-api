import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    des: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});


const Service = mongoose.model('services', serviceSchema);

export default Service;
