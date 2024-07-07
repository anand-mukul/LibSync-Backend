import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: "Book",
            required: true
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        required: true
    }
}, { timestamps: true });

export const Purchase = mongoose.model("Purchase", purchaseSchema);