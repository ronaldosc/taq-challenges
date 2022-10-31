import express from "express";

const app = express();

const PORT = 4000;

app.listen(PORT, () => {
  console.log("listen at http://localhost:%d", PORT);
});
