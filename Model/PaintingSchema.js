const {Schema, model,Types} = require("mongoose");
  
  const PaintingSchema = new Schema({
     
    _id:{
        type: Types.ObjectId, // Explicitly defining _id as ObjectId type
        required: true, // Optionally specify if _id is required
        default: () => new Types.ObjectId() // Generate a default ObjectId
    },
    paintingid:{
      type: Number,
      required: true
    },
    artistid:{
      type: Number,
      required: true
    },
      paintingName: {
        type: String,
        required: true
      },
      paintingImage: {
        type: String,
        required: true
      },
      artistName:{
        type: String,
        required: true
      },
      price:{
        type: Number,
        required: true
      }
  });
  
  const PaintingModel = model('Paintings', PaintingSchema) //schema converted to model
  
  module.exports = PaintingModel