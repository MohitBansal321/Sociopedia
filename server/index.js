import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import multer from 'multer';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import {register} from './controllers/auth.js';
import {createPost} from "./controllers/posts.js";
import { verifyToken } from './middleware/auth.js';
import User from './models/User.js';
import Post from './models/Post.js';
import {users,posts} from './data/index.js';
/* CONFIGURATIONS */
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));


/* FILE STORAGE */
const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,"public/assets");
    },
    filename:function (req,file,cb){
        cb(null,file.originalname);
    }
});

const upload=multer({storage})

// ROUTES WITH FILES beacuse we need upload here
app.post("/auth/register",upload.single("picture"),register);
app.post("/posts",verifyToken,upload.single("picture"),createPost);
// ROUTES
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes);

/* MONGOOSE SETUP */
const PORT=process.env.PORT || 6001;

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  application.use(express.static(path.join(__dirname1, "../client/build")));

  application.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "../client", "build", "index.html"))
  );
} else {
  application.get("/", (req, res) => {
    res.send("API is running..");
  });
}
mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGO_URL,{
    useNewURLParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    app.listen(PORT,()=>console.log(`Server Running at ${PORT}`))
})
.catch((error)=>console.log(`${error} did not connect`))