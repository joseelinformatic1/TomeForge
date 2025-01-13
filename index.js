const express = require('express');
const { connectDB, sequelize } = require('./config/database');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const characterRoutes = require('./routes/characterRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);

sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
