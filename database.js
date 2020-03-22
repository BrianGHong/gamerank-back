// Helper function that implements promise system
exports.query = function (sql, pool) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, rows) => {
            if (err)
                return reject(err);
            resolve(rows);
        });
    });
}