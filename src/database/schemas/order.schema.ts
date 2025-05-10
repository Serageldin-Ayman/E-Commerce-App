import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true,
    },
    productIds: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: 'Product',
    },
  },
  {
    timestamps: true,
  },
);
