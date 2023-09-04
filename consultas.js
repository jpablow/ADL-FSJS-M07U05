const { Pool } = require('pg');
const format = require('pg-format');

const pool = new Pool({
  user: 'JPW',
  host: 'localhost',
  password: 'gogo2580',
  database: 'farmacia',
  port: 5432,
  allowExitOnIdle: true,
});

const obtenerJoyas = async ({ limits, page, order_by }) => {
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
};

module.exports = { obtenerJoyas };
