const { Pool } = require('pg');
const format = require('pg-format');

const pool = new Pool({
  user: 'JPW',
  host: 'localhost',
  password: 'gogo2580',
  database: 'joyas',
  port: 5432,
  allowExitOnIdle: true,
});

const obtenerJoyas = async ({
  limits = 100,
  page = 1,
  order_by = 'id_ASC',
}) => {
  try {
    const [campo, direccion] = order_by.split('_');
    const offset = (page - 1) * limits;
    let consulta = format(
      'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
      campo,
      direccion,
      limits,
      offset
    );
    const { rows } = await pool.query(consulta);
    return rows;
  } catch (err) {
    console.error(err);
    res.status(err.code || 500).send(err);
  }
};

const filtrarJoyas = async ({ precio_min, precio_max, categoria, metal }) => {
  try {
    let filtros = [];
    if (precio_min) filtros.push(`precio >= '${precio_min}'`);
    if (precio_max) filtros.push(`precio <= '${precio_max}'`);
    if (categoria) filtros.push(`categoria = '${categoria}'`);
    if (metal) filtros.push(`metal = '${metal}'`);
    let consulta = 'SELECT * FROM inventario';
    if (filtros.length > 0) {
      filtros = filtros.join(' AND ');
      consulta += ` WHERE ${filtros}`;
    }
    const { rows: joyas } = await pool.query(consulta);
    return joyas;
  } catch (err) {
    console.error(err);
    res.status(err.code || 500).send(err);
  }
};

module.exports = { obtenerJoyas, filtrarJoyas };
