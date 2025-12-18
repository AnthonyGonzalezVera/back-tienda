const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

app.use(express.json());
app.use(cors());

let productos = [
    { id: 1, nombre: 'Mouse Gamer', precio: 25 },
    { id: 2, nombre: 'Teclado Mecánico', precio: 60 },
    { id: 3, nombre: 'Audífonos', precio: 40 }
];

app.get('/api/productos', (req, res) => {
    console.log(' GET /api/productos - Enviando productos');
    res.json(productos);
});

app.post('/api/carrito', (req, res) => {
    const carrito = req.body;
    console.log(' POST /api/carrito - Carrito recibido:', carrito);
    
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio;
    });

    res.json({
        total: total,
        cantidad: carrito.length
    });
});

app.get('/api/estado', (req, res) => {
    res.json({
        status: 'Backend Online',
        time: new Date()
    });
});

const server = app.listen(PORT, () => {
    
    console.log(` Backend corriendo en http://localhost:${PORT}`);
    console.log(` Productos: http://localhost:${PORT}/api/productos`);
    console.log('=================================');
    console.log(' Servidor escuchando... (Ctrl+C para detener)');
});


server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(` Error: El puerto ${PORT} ya está en uso`);
        console.log(' Solución: Cierra el otro proceso o usa otro puerto');
    } else {
        console.error(' Error del servidor:', error);
    }
});


process.on('uncaughtException', (error) => {
    console.error(' Error no capturado:', error);
});

process.on('SIGINT', () => {
    console.log('\n Cerrando servidor...');
    server.close(() => {
        console.log(' Servidor cerrado correctamente');
        process.exit(0);
    });
});