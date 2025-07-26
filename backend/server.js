import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/food")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


const db = mongoose.connection;

app.get('/', (req, res) => {
  res.send('🍽️ Food API running!');
});

// Add a recipe to favorites
app.post('/recipes', async (req, res) => {
  const { userId, recipeId, title, image } = req.body;
  console.log(userId, recipeId, title);

  try {
    const collection = db.collection('fav-part');
    
    // Check if the recipe is already in favorites for this user
    const existingFavorite = await collection.findOne({ 
      userId: userId, 
      recipeId: recipeId 
    });

    if (existingFavorite) {
      return res.status(409).send("Recipe already in favorites");
    }

    // Add timestamp
    const favoriteData = {
      userId,
      recipeId,
      title,
      image,
      createdAt: new Date()
    };

    await collection.insertOne(favoriteData);
    res.status(201).send("✅ Favorite saved to fav-part");
  } catch (err) {
    console.error("❌ Insertion Error:", err.message);
    res.status(500).send("Server error");
  }
});

// Get all favorites for a user
app.get('/favorites/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const collection = db.collection('fav-part');
    const data = await collection.find({ userId }).sort({ createdAt: -1 }).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Fetch Error:", err.message);
    res.status(500).send("Server error");
  }
});

// Delete a specific favorite
app.delete('/favorites/:favoriteId', async (req, res) => {
  const favoriteId = req.params.favoriteId;

  try {
    const collection = db.collection('fav-part');
    
    // Convert string ID to ObjectId
    const objectId = new mongoose.Types.ObjectId(favoriteId);
    
    const result = await collection.deleteOne({ _id: objectId });
    
    if (result.deletedCount === 0) {
      return res.status(404).send("Favorite not found");
    }
    
    res.status(200).send("✅ Favorite removed successfully");
  } catch (err) {
    console.error("❌ Delete Error:", err.message);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});