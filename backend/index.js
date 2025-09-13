import connectToMongo from './db.js';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session'
import './config/passport.js'

const app = express();
const port = 5000;
import dotenv from 'dotenv'
dotenv.config()
// Connect to MongoDB
connectToMongo();

app.use(cors({origin:"http://localhost:3000",credentials:true}));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Available Routes
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
