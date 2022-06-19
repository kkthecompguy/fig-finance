import mongoose from "mongoose";

enum Category {
  "AI" = "AI",
  "mobile developments" = "mobile developments",
  'robotics' = "robotics"
}

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required']
  },
  description: {
    type: String,
    required: [true, "description is required"]
  },
  category: {
    type: String,
    required: true,
    enum: Category
  },
  date: {
    type: Date
  },
  isVirtual: {
    type: Boolean
  },
  address: {
    type: String
  }
}, {
  timestamps: true
});

const eventsModel = mongoose.model("events", EventSchema);
export default eventsModel;