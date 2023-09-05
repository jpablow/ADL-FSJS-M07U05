const { obtenerJoyas, filtrarJoyas } = require('./consultas');
const express = require('express');
const app = express();

const puerto = 3000;
const urlBase = `http://localhost:${puerto}`;
app.listen(puerto, console.log(`Servidor iniciado en ${urlBase}`));

const reportarConsultas = async (req, res, next) => {
  const url = req.url;
  const ruta = req.path;
  const metodo = req.method;
  const parametros = req.query;
  console.log(
    `
🟢 ${new Date()}
📍 Nueva consulta con los siguientes datos:
🔸 URL:        ${url}
🔸 Ruta:       ${ruta}
🔸 Método:     ${metodo}
🔸 Parámetros:`,
    parametros,
    `
    `
  );
  next();
};

const prepararHATEOAS = (joyas) => {
  const results = joyas
    .map((j) => {
      return {
        name: j.nombre,
        href: `${urlBase}/joyas/joya/${j.id}`,
      };
    })
    .slice(0);
  const totalJoyas = joyas.length;
  const stockTotal = joyas.reduce((ant, act) => ant + act.stock, 0);
  const HATEOAS = {
    totalJoyas,
    stockTotal,
    results,
  };
  return HATEOAS;
};

app.get('/joyas', reportarConsultas, async (req, res) => {
  try {
    const queryString = req.query;
    const joyas = await obtenerJoyas(queryString);
    const HATEOAS = await prepararHATEOAS(joyas);
    return res.json(HATEOAS);
  } catch (err) {
    console.error(err);
    res.status(err.code || 500).send(err);
  }
});

app.get('/joyas/filtros', reportarConsultas, async (req, res) => {
  try {
    const queryString = req.query;
    const joyas = await filtrarJoyas(queryString);
    return res.json(joyas);
  } catch (err) {
    console.error(err);
    res.status(err.code || 500).send(err);
  }
});

app.get('*', (req, res) => {
  res.status(404).send('🚧 Ruta inexistente 🚧');
});
