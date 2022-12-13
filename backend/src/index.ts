import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import user from "./routes/User";
dotenv.config();

if (!process.env.SERVER_PORT) {
  process.exit(1);
}

const SERVER_PORT: number = parseInt(process.env.SERVER_PORT as string, 10);
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", user);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
});
