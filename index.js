const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/database');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const characterRoutes = require('./routes/characterRoutes');
const backgroundRoutes = require('./routes/backgroundRoutes');

dotenv.config();
connectDB();
const app = express();

app.use(cors());



app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/backgrounds', backgroundRoutes);

sequelize.sync()
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos:', error);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
