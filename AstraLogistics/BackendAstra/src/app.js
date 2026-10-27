import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { CORS_ORIGIN } from "./config.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.use(routes);

app.use(notFound);
app.use(errorHandler); // siempre al final

export default app;
