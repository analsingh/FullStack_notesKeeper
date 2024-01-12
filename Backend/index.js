import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // Configure as needed

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const KeeperSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Keeper = new mongoose.model("Keeper", KeeperSchema);

app.get("/api/getAll", async function(req, res) {
    try {
        const notes = await Keeper.find({});
        res.status(200).send(notes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


app.post("/api/addNew", function(req, res) {
    const { title, content } = req.body;
    const keeperObj = new Keeper({
        title,
        content
    });

    keeperObj.save()
        .then(savedKeeper => {
            console.log(savedKeeper);
            res.status(200).send(savedKeeper);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error saving data");
        });
});


app.post("/api/delete", async(req, res) => {
    try {
        const { id } = req.body;
        await Keeper.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        const keeperList = await Keeper.find({});
        res.status(200).send(keeperList);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting note");
    }
});



app.listen(3001, () => {
    console.log("server is running at port 3001");
});