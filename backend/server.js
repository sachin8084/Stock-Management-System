const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","PUT","DELETE"],

    credentials: true
}));

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'sachin12345',
    database: 'stock' // Specify the database name
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the database');
});

app.post('/login', (req, res) => {
    const sqlQuery = 'SELECT password FROM Users WHERE username = ?';
    const username = req.body.username;
  
    connection.query(sqlQuery, [username], (error, results, fields) => {
      if (error) {
        console.error('Error executing query:', error);
        return res.status(500).send('An error occurred');
      }
  
      if (results.length === 0) {
        console.log('User not found');
        return res.status(404).send('User not found');
      }
  
      const password = results[0].password;
      if (password === req.body.password) {
        console.log('success');
        return res.send('Login successful');
      } else {
        console.log('Incorrect password');
        return res.status(401).send('Incorrect password');
      }
      
    });
  });


  app.get('/products-and-suppliers', (req, res) => {
    const sqlQuery = `
      SELECT Product.Name, Supplier.Name AS SupplierName
      FROM Product
      LEFT JOIN Prod_supp ON Product.Product_id = Prod_supp.Product_id
      LEFT JOIN Supplier ON Prod_supp.Supplier_id = Supplier.Supplier_id;
    `;
  
    connection.query(sqlQuery, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
  
      res.json(results);
    });
  });

  app.get('/customer-orders', (req, res) => {
    const sql = `
      SELECT Customer.Name, orders.Order_id, orders.Order_date
      FROM Customer
      LEFT JOIN orders ON Customer.Customer_id = orders.Customer_id
    `;
  
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error executing query: ' + error);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
      res.json(results);
    });
  });

  const port = 8000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


  app.post('/signup', (req, res) => {
    const sqlQuery = 'INSERT INTO Users (username, password) VALUES (?, ?)';
    const username = req.body.username;
    const password = req.body.password;

    connection.query(sqlQuery, [username, password], (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).send('An error occurred');
        }

        console.log('User registered successfully');
        return res.send('Signup Successful');
    });
});

app.get('/staff', (req, res) => {
  const sqlQuery = 'SELECT * FROM staff'; // Replace with your actual table name
  connection.query(sqlQuery, (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).send('An error occurred');
    }
    res.json(results);
  });
});


app.get('/staff/:id', (req, res) => {
  const { id } = req.params;
  const sqlQuery = 'SELECT * FROM staff WHERE Staff_id = ?'; // Replace with your actual table name
  connection.query(sqlQuery, [id], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).send('An error occurred');
    }

    if (results.length === 0) {
      console.log('Staff member not found');
      return res.status(404).send('Staff member not found');
    }

    res.json(results[0]);
  });
});

app.delete('/staff/:id', (req, res) => {
  const staffId = req.params.id;

  // Implement the logic to delete the employee from your database
  const sql = 'DELETE FROM staff WHERE Staff_id = ?';

  connection.query(sql, [staffId], (err, results) => {
    if (err) {
      console.error('Error deleting staff:', err);
      res.status(500).json({ message: 'Error deleting staff' });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'staff not found' });
      } else {
        console.log('staff deleted successfully');
        res.status(200).json({ message: 'staff deleted successfully' });
      }
    }
  });
});


app.post('/staff', (req, res) => {
  const { Name, Staff_id, Date_of_joining, Salary, Address, Phone_no } = req.body;
  console.log('values:', [Name, Staff_id, Date_of_joining, Salary, Address, Phone_no]);
   const sql = `
   INSERT INTO staff (Name, Staff_id, Date_of_joining, Salary, Address, Phone_no)
   VALUES (?, ?, ?, ?, ?, ?)
   `;

     connection.query(sql, [Name, Staff_id, Date_of_joining, Salary, Address, Phone_no], (err,result)  => {
     if(err) {
      console.error('Error adding employee:', err);
      res.status(500).json({message: 'Eror adding employee'});
     }
      else {
         console.log('Staff details added Successfully');
         res.status(200).json({message: 'Staff details added Successfully'});
      }
      });
    });


    app.put('/staff/update/:id', (req, res) => {
      const {id} =req.params;
      const { Name, Date_of_joining, Salary, Address, Phone_no } = req.body;
      
      const sql = `
      UPDATE staff
      SET Name = ?, Date_of_joining = ?, Salary = ?, Address= ?, Phone_no = ? 
      WHERE Staff_id = ?
    `;
    
         connection.query(sql, [Name, Date_of_joining, Salary, Address, Phone_no, id], (err,result)  => {
         if(err) {
          console.error('Error adding employee:', err);
          res.status(500).json({message: 'Eror adding employee'});
         }
          else {
             console.log('Staff details update Successfully');
             res.status(200).json({message: 'Staff details update Successfully'});
          }
          });
        });



     app.listen(5000, () => {
      console.log(`Server is running on port 5000`);
  });
     
