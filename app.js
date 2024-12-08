import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routes/api.js";
import { DATABASE, MAX_JSON_SIZE, PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE } from "./app/config/config.js";


const app = express();


// Database Connect
mongoose.connect(DATABASE, { autoIndex: true }).then(() => {
    console.log("MongoDB connected");
}).catch(() => {
    console.log("MongoDB disconnected");
})




// {
//     credentials: true,
//     origin: "http://localhost:5173/",
// }

// Cache
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }))
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet())
app.set('etag', WEB_CACHE)

const limiter = rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_NUMBER })
app.use(limiter)



app.use("/api", router)


app.listen(PORT, () => {
    console.log("Server started on port " + PORT)
})






