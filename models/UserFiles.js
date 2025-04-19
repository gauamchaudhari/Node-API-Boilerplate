const mysql = require('mysql');
const config = require('../config/config');
const connection = mysql.createConnection(config.database);     
connection.connect(err => {
    if (err) {
        console.log("Error connecting to MYSQL::", err);
    }
    console.log("Connected to MYSQL Database");
});

class UserFiles {
    static storeFiles(userFiles, callback) {
        const sqlInsertUserFiles = 'INSERT INTO user_files SET ?';
        connection.query(sqlInsertUserFiles, userFiles, (err, results) => {
            if (err) {
                console.error('Error creating user files:', err);
                callback('Internal server error', null);
                return;
            }
            callback(null, results.insertId);
        });
    }

    static getByFilesByUserId(id, callback) {
        const sql = 'SELECT * FROM user_files WHERE user_id= ? ORDER BY created_at DESC';
        connection.query(sql, [id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }
}

module.exports = UserFiles;