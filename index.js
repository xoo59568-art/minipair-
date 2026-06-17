const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// HTML serve
app.use(express.static(path.join(__dirname, "public")));

// Proxy API
app.get("/api/pair", async (req, res) => {
  const number = req.query.number;

  if (!number) {
    return res.status(400).json({
      success: false,
      message: "Number is required"
    });
  }

  try {
    const response = await fetch(
      `https://rabbitapi.zone.id/api/pair?number=${encodeURIComponent(number)}`
    );

    const text = await response.text();

    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "text/plain"
    );

    res.status(response.status).send(text);

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
