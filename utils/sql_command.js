const { connection } = require('../db/sql_connection');

const query = (options, value = []) => {
    return new Promise((resolve, reject) => {
        connection.query(options, value, function(error, results, fields) {
            // console.log(results);
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(JSON.stringify(results)));
            }
        });
    });
};

module.exports = {
    query
};