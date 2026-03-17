const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// TEST
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// CREATE COMPLAINT
app.post("/create", async (req, res) => {
  try {
    const {
      user_phone,
      category,
      description,
      district,
      taluka,
      village,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO complaints 
      (user_phone, category, description, district, taluka, village, status)
      VALUES ($1,$2,$3,$4,$5,$6,'Pending')
      RETURNING id`,
      [user_phone, category, description, district, taluka, village]
    );

    const ackId = "GRV" + result.rows[0].id;

    res.json({ id: ackId });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => console.log("Server started on port 5000 🚀"));