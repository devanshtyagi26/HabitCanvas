import { connect } from "@/dbConnection/dbConfig";
import Habit from "@/models/habitModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

await connect();

export async function POST(request) {
  try {
    // ✅ Extract UUID from token (stored in cookies)
    const uuid = getDataFromToken(request);
    console.log(uuid);
    const body = await request.json();
    const { habits } = body;

    if (!habits) {
      return new Response(JSON.stringify({ error: "Missing habits" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // Optional: check if entry already exists (to avoid duplicates)
    const existingHabit = await Habit.findOne({ uuid, date });
    if (existingHabit) {
      existingHabit.habits = habits;
      await existingHabit.save();
    } else {
      const newHabit = new Habit({ uuid, date, habits });
      await newHabit.save();
    }
    console.log("Habits saved");
    return new Response(JSON.stringify({ message: "Habits saved" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Habit save error:", error.message);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
