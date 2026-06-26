const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

// ===============================
// Pair 1 (rabbitapi.zone.id)
// ===============================
app.get("/api/pair", async (req, res) => {
  const number = req.query.number;

  if (!number) {
    return res.status(400).json({
      success: false,
      message: "Number is required",
    });
  }

  try {
    const r = await fetch(
      `https://rabbitapi.zone.id/api/pair?number=${encodeURIComponent(number)}`
    );

    const text = await r.text();

    res.setHeader(
      "Content-Type",
      r.headers.get("content-type") || "application/json"
    );

    res.status(r.status).send(text);
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

// ===============================
// Pair 2 (66.78.59.15)
// ===============================
app.get("/api/pair2", async (req, res) => {
  const number = req.query.number;

  if (!number) {
    return res.status(400).json({
      success: false,
      message: "Number is required",
    });
  }

  try {
    const r = await fetch(
      `http://66.78.59.15/api/pair?number=${encodeURIComponent(number)}`
    );

    const text = await r.text();

    res.setHeader(
      "Content-Type",
      r.headers.get("content-type") || "application/json"
    );

    res.status(r.status).send(text);
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
