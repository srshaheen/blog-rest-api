import mongoose from "mongoose";

const AdminSchema = mongoose.Schema(
    {
        email: { type: String, unique: true, required: true, lowercase: true },
        password: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const AdminModel = mongoose.model("admins", AdminSchema);


export default AdminModel