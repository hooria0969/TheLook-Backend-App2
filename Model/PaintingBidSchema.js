const {Schema, model,Types} = require("mongoose");
  
  const PaintingBidSchema = new Schema({
     
    _id:{
        type: Types.ObjectId, // Explicitly defining _id as ObjectId type
        required: true, // Optionally specify if _id is required
        default: () => new Types.ObjectId() // Generate a default ObjectId
    
    },
    paintingid: {
      type: Types.ObjectId, ref: 'Paintings' 

    },
    name: {
        type: String,
        required: true
      },
    email: {
        type: String,
        required: true
      },
     price: {
        type: String,
        required: true
     } 
  });
  
  const PaintingBidModel = model('PaintingBid', PaintingBidSchema) //schema converted to model
  
  module.exports = PaintingBidModel