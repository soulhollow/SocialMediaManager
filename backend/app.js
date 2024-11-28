const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB-Verbindung
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB verbunden'))
    .catch(err => console.error('MongoDB-Verbindung fehlgeschlagen:', err));

// Auth-Routen importieren
const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);

const linkedinRoute = require('./routes/linkedin');
app.use('/api/linkedin', linkedinRoute);


// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
