const express = require('express');
const app = express();

app.listen(3000, console.log('Servidor iniciado en http://localhost:3000'));

// 1. Crear una ruta GET /joyas que:
//      a. Devuelva la estructura HATEOAS de todas las joyas almacenadas en la base de datos (1.5 puntos)

//      b. Reciba en la query string los parámetros (2 puntos):

//          i. limits: Limita la cantidad de joyas a devolver por página
//          ii. page: Define la página
//          iii. order_by: Ordena las joyas según el valor de este parámetro, ejemplo: stock_ASC

app.get('/joyas', async (req, res) => {
  const queryString = req.query;
  const joyas = await obtenerJoyas(queryString);
  return res.json(joyas);
});

// 2. Crear una ruta GET /joyas/filtros que reciba los siguientes parámetros en la query string: (3.5 puntos)

// a. precio_max: Filtrar las joyas con un precio mayor al valor recibido
// b. precio_min: Filtrar las joyas con un precio menor al valor recibido.
// c. categoria: Filtrar las joyas por la categoría
// d. metal: Filtrar las joyas por la categoría

// 3. Implementar middlewares para generar informes o reportes de alguna actividad o evento específico que ocurra en cada una de las rutas. (1 puntos)

// 4. Usar try catch para capturar los posibles errores durante una consulta y la lógica de cada ruta creada. (1 puntos)

// 5. Usar las consultas parametrizadas para evitar el SQL Injection en la consulta a la base de datos relacionada con la ruta GET /joyas/filtros (1 puntos)
