const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const { User, Social_Media } =  require("./db");

const app = express();
mongoose.connect("mongodb+srv://smrutiranjan:smrutiranjan@cluster0.hxqhswm.mongodb.net/businees_card");

app.use(cors());
app.use(express.json());

app.get("/profiles", async (req, res) => {
    try {
        const users = await User.find();
        const social_media = await Social_Media.find();
        res.json({
            users : users,
            social_media : social_media
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.post("/addProfile", async (req, res) => {
    const {name, about, interests, linkedIn} = req.body;
    const newProfile = await User.create({
        name : name,
        about : about,
        interests : interests
    })
    const social_media = await Social_Media.create({
        name : "LinkedIn",
        link : linkedIn,
        owner : newProfile._id
    })

    newProfile.social_media.push(social_media._id);
    await newProfile.save();

    res.json({msg : "Profile created successfully"})
})

const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})