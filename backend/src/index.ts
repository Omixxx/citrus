import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import status from "http-status";

dotenv.config();

if (!process.env.SERVER_PORT) {
  process.exit(1);
}

const SERVER_PORT: number = parseInt(process.env.SERVER_PORT as string, 10);

const app = express();
app.use(cors());
app.use(express.json());
app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
});

app.get("/", (req, res) => {
  res.status(status.OK).send("tut-ki");
});
