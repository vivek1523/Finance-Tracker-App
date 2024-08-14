import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        default: "Uncategorized" 
    },
    type:{
        type: String,
        required: true,
        enum: ["income", "expense"],
    }
},{
    timestamps: true,
});

const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;