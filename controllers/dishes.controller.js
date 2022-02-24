const mysql = require("mysql");

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  socketPath: "/var/run/mysqld/mysqld.sock",
};

const connection = mysql.createConnection(options);

connection.connect((err) => {
  if (err) {
    console.log(`Database error connection: ${err}`);
  } else {
    console.log("Connection established");
  }
});

exports.findAllDishes = (req, res) => {
  if (!req.query.category) {
    const sql = "SELECT dish.*, category.name AS category FROM dish, category;";

    connection.query(sql, (error, dishes, fields) => {
      if (error) {
        console.log(`Error while retrieving the dishes: ${error}`);
      }

      return res.json({ status: "success", response: dishes });
    });
  } else {
    const category = req.query.category;
    const sql =
      "SELECT dish.* FROM dish INNER JOIN category ON dish.id_category = category.id_category AND category.name = ?;";

    connection.query(sql, [category], (error, dishes, fields) => {
      if (error) {
        console.log(`Error while retrieving the dishes: ${error}`);
      }

      return res.json({ status: "success", response: dishes });
    });
  }
};

exports.findADish = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT dish.name, dish.photo, dish.price, category.name AS category FROM dish INNER JOIN category ON dish.id_dish = ? AND dish.id_category = category.id_category;",
    [id],
    (error, dish, fields) => {
      if (error) {
        console.log(`Error while retrieving dish with id: ${id}`);
      }

      return res.json({ status: "success", response: dish });
    }
  );
};
