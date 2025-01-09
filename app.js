const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

//INITIALIZE APP
const app = express()
const port = 3002

//MIDDLEWARE
app.use(cors());
app.use(express.json())

//connection to database
const connectDB = require('./Database/dbConnection');
connectDB();

//DatabaseSchemas 
const artistModel=require('./Model/ArtistSchema');
const ArtistDetailModel = require('./Model/ArtistDetailSchema');
const PaintingModel = require('./Model/PaintingSchema');
const PaintingBidModel = require('./Model/PaintingBidSchema');
const UserModel = require('./Model/UserSchema');

// Default Route
app.get('/', async(req, res) => {

 res.json({ message: 'Welcome to the Art Gallery API!' });
})

// Get All Artists
app.get('/Artists', async(req, res)=>{
    try {
      const artistList = await artistModel.find(); // Fetch all items
      console.log(""+artistList);
      res.json(artistList)
  } catch (error) {
      console.error("Error fetching Artist:", error);
      res.status(500).json({ error: 'Error fetching artists.' });
  }
})

// Get Artist Details by ID
app.get('/ArtistDetails/:id', async(req, res)=>{
  const artistDetailId = req.params.id
   // Validate ObjectId
  
  try {
    const artistDetail = await ArtistDetailModel.findById(artistDetailId); // Fetch all items
    console.log(""+artistDetail);
    res.json(artistDetail)
  } catch (error) {
    console.error("Error fetching Artist:", artistDetailId);
    res.status(500).json({ error: ` ${artistDetailId} Error fetching artist details: ${error}` });
  }
})

// Get All Paintings for buying
app.get('/Paintings', async(req, res)=>{
  try {
    const paintings = await PaintingModel.find(); // Fetch all items
    res.json(paintings)

  } catch (error) {
    console.error("Error fetching paintings:", error);
    res.status(500).json({ error: 'Error fetching paintings.' });
  }
})

//GET DETAILS OF PAINTINGS AND BIDS AGAINST PAINTING
app.get('/PaintingDetails/:id', async(req, res)=>{
  const paintingid = req.params.id
  try {
    const paintingDetail = await PaintingModel.findById(paintingid); // Fetch one items
    const paintingBids = await PaintingBidModel.find({paintingid: paintingid}); // Fetch all items
    const response = {
      ...paintingDetail.toObject(),
      bids: paintingBids,
    };
    res.json(response)
  } catch (error) {
    console.error("Error fetching Artist:", error);
    res.status(500).json({ error: `Error fetching painting details: ${error}` });
  }
})

//LIST OF BIDS By PAINTING ID
app.get('/bids/:paintingid', async(req, res)=>{
  const paintingid = req.params.paintingid
  try {
    const paintingBids = await PaintingBidModel.find({paintingid: paintingid}); // Fetch all items
    console.log(""+paintingBids);
    res.json(paintingBids)
  } catch (error) {
    console.error("Error fetching Artist:", error);
    res.status(500).json({ error: `Error fetching bids: ${error}` });
  }
})

// Add a New Bid
app.post('/bids', async(req, res)=>{
  try {
    const newBid = await PaintingBidModel.create( {name: req.body.name, email:req.body.email, price:req.body.price, paintingid: req.body.paintingid, id: req.body.bidid});
    console.log(""+newBid);
    res.json(newBid)
  } catch (error) {
    console.error("Error fetching bid:", error);
    res.status(500).json({ error: `Error adding bid: ${error}` });
  }  
})

// Sign Up Route
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user.' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.' });
  }
});


// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});





































