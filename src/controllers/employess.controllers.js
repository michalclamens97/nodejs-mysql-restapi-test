import { pool } from "../db.js";
///////////////////////////////////////////////////////////
export const getEmployees = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM employee"); //guardo en un arreglo todos los empleados de mi base de datos y los muestro en formato json
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong...",
    });
  }
};

///////////////////////////////////////////////////////////
export const getEmployee = async (req, res) => {
  try {
    //console.log(req.params); //todos los parametros que viened de la url
    const [result] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong...",
    });
  }
};

////////////////////////////////////////////////////////////
export const createEmployee = async (req, res) => {
  const { name, salary } = req.body; //Obtengo los valores del request body (estoy usando thunderclient)
  try {
    //Guardo en una constante el arreglo de objetos que me regresa la consulta cuando hago una insercion
    const [result] = await pool.query(
      "INSERT INTO employee (name,salary) VALUES(?,?)",
      [name, salary]
    );
    res.send({
      id: result.insertId, //el id nuevo que ha creado
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong...",
    });
  }
};

///////////////////////////////////////////////////////////
export const updateEmployee = async (req, res) => {
  const { id } = req.params; //tambien se puede escribir const id = req.params.id
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?,name), salary = IFNULL(?,salary) WHERE id = ?", //Al colocar IFNULL estoy diciendo que si no pase nada en la consulta que mantenga el valor que tiene
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Employee not found",
      });

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong...",
    });
  }
};

/////////////////////////////////////////////////////////
export const deleteEmployee = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Employee not found",
      });
    res.json({
      message: "Employee deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong...",
    });
  }
};

// req.params:  Obtiene los parametros de la url
// req.body: Obtiene los parametros del cuerpo del formulario
