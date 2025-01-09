const {Schema, model,Types} = require("mongoose");
  
  const ArtistDetailSchema = new Schema({

    _id:{
        type: Types.ObjectId, // Explicitly defining _id as ObjectId type
        required: true, // Optionally specify if _id is required
        default: () => new Types.ObjectId() // Generate a default ObjectId
    },
      artistId: {
         type: Types.ObjectId, ref: 'Artists' 

    },

    name:{
        type: String
    },
    image:{
        type: String
    },
    description:{
        type: String
    }

  });
  
  const ArtistDetailModel = model('ArtistDetail', ArtistDetailSchema) //schema converted to model
  
  module.exports = ArtistDetailModel