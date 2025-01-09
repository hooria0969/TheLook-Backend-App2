const {Schema, model,Types} = require("mongoose");
  
  const ArtistSchema = new Schema({
     
    _id:{
        type: Types.ObjectId, // Explicitly defining _id as ObjectId type
        required: true, // Optionally specify if _id is required
        default: () => new Types.ObjectId() // Generate a default ObjectId
    
    },
    artistDetailId: { 
      type: Types.ObjectId, 
      ref: 'ArtistDetails' 
    },

    artistName: {
        type: String
      },
    artistImage: {
        type: String
      }
  });
  
  const ArtistModel = model('Artists', ArtistSchema) //schema converted to model
  
  module.exports = ArtistModel