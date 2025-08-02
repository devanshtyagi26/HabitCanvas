import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  habits: {
    brushedTeeth: { type: Boolean, default: false },
    drankWater: { type: Boolean, default: false },
    exercised: { type: Boolean, default: false },
    coffeeIntake: { type: Boolean, default: false },
    meditation: { type: Boolean, default: false },
    readBook: { type: Boolean, default: false },
    shower: { type: Boolean, default: false },
    noJunkFood: { type: Boolean, default: false },
    dailyWalk: { type: Boolean, default: false },
    code: { type: Boolean, default: false },
    laundry: { type: Boolean, default: false },
    cleanRoom: { type: Boolean, default: false },
  },
});

const Habit = mongoose.models.habits || mongoose.model("habits", habitSchema);

export default Habit;
