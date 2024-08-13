import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import ViteExpress from "vite-express";
import router from "./routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);