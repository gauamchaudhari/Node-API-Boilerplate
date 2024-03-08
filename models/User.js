const mysql = require('mysql');
const config = require('../config/config');

const connection = mysql.createConnection(config.database);


connection.connect(err => {
    if (err) {
        console.log("Error connecting to MYSQL::", err);
    }
    console.log("Connected to MYSQL Database");
});

class User {
  
    static create(user, callback) {
        const sqlCheckEmail = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
        connection.query(sqlCheckEmail, user.email, (err, results) => {
            if (err) {
                console.error('Error checking email:', err);
                callback('Internal server error', null);
                return;
            }
    
            if (results[0].count > 0) {
                const errorMessage = 'Email is already registered';
                callback(errorMessage, null);
                return;
            }
    
            const sqlInsertUser = 'INSERT INTO users SET ?';
            connection.query(sqlInsertUser, user, (err, results) => {
               
                if (err) {
                    console.error('Error creating user:', err);
                    callback('Internal server error', null);
                    return;
                }
                
                callback(null, results.insertId);
            });
        });
    }
    

    static getAll(callback) {
        const sql = 'SELECT id,first_name,last_name,email,phone,address,gender FROM users';
        connection.query(sql, null, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }

    static findByEmail(email, callback) {
        const sql = 'SELECT * FROM users WHERE email= ?';
        connection.query(sql, [email], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            console.log(results);
            callback(null, results[0]);
        });
    }
    static fetchAllUsers() {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM users';
          connection.query(sql,[], (err, results) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(results);
          });
        });
      }
    static update(id, newData, callback) {
        const sql = 'UPDATE users SET ? WHERE id = ?';
        connection.query(sql, [newData, id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results.affectedRows > 0);
        });
    }

    static delete(id, callback) {
        const sql = 'DELETE FROM users WHERE id = ?';
        connection.query(sql, id, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results.affectedRows > 0);
        });
    }
}

module.exports = User;