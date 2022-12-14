import express from "express";
import router from "./routes/routes";

async function bootstrap() {
  const cors = require("cors");
  const app = express();

  await app.use(cors());
  await app.use(express.json());
  await app.use(router);

  await app.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();
