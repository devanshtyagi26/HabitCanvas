"use client";

import { useState } from "react";

export default function HabitsPage() {
  const [habits, setHabits] = useState({
    brushedTeeth: false,
    drankWater: false,
    exercised: false,
    coffeeIntake: false,
    meditation: false,
    readBook: false,
    shower: false,
    noJunkFood: false,
    dailyWalk: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, checked } = e.target;
    setHabits((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ habits }),
        credentials: "include", // send cookies automatically
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
      } else {
        setError(data.error || "Failed to save habits");
      }
    } catch {
      setError("Network error");
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>Track Your Habits</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            name="drankWater"
            checked={habits.drankWater}
            onChange={handleChange}
          />
          Drink Water
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="exercised"
            checked={habits.exercised}
            onChange={handleChange}
          />
          Exercise
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="readBook"
            checked={habits.readBook}
            onChange={handleChange}
          />
          Read Book
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="readBook"
            checked={habits.coffeeIntake}
            onChange={handleChange}
          />
          Read Book
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="readBook"
            checked={habits.meditation}
            onChange={handleChange}
          />
          Read Book
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="readBook"
            checked={habits.shower}
            onChange={handleChange}
          />
          Shower
        </label>
        <br />
        <button type="submit" style={{ marginTop: 10 }}>
          Save Habits
        </button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
