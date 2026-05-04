const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
  {
    // 1. String & Required
    homeTeam: {
      type: String,
      required: [true, 'Echipa gazdă este obligatorie']
    },
    // 2. String & Required
    awayTeam: {
      type: String,
      required: [true, 'Echipa oaspete este obligatorie']
    },
    // 3. Number, Default & Validare Custom (min)
    homeScore: {
      type: Number,
      default: 0,
      min: [0, 'Scorul nu poate fi negativ'] // Validare custom
    },
    awayScore: {
      type: Number,
      default: 0,
      min: [0, 'Scorul nu poate fi negativ']
    },
    // 4. Boolean & Default
    isLive: {
      type: Boolean,
      default: false
    },
    // 5. Date & Required
    matchDate: {
      type: Date,
      required: [true, 'Data meciului este obligatorie']
    },
    // Extra: Validare custom cu ENUM pentru categorie
    sportCategory: {
      type: String,
      enum: ['fotbal', 'tenis', 'baschet', 'handbal'], // Doar aceste valori sunt permise
      default: 'fotbal'
    }
  },
  {
    // Câmpul timestamps activat automat (creează createdAt și updatedAt)
    timestamps: true 
  }
);

module.exports = mongoose.model('Match', matchSchema);