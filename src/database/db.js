const sqlite = require("sqlite3").verbose()

const db = new sqlite.Database("./src/database/database.db")

module.exports = db
// db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       image TEXT,
//       name TEXT,
//       address TEXT,
//       address2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//     )
//   `)

//   const query = `
//     INSERT INTO places (
//       image,
//       name,
//       address,
//       address2,
//       state,
//       city,
//       items
//     ) VALUES (?,?,?,?,?,?,?);
//   `

//   const values = [
//     "https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
//     "Colectoria",
//     "Cabral, Santa luzia",
//     "Número 1237",
//     "São Paulo",
//     "Rio de norte",
//     "Lâmpadas"
//   ]

//   function afterInsertData(err) {
//     if (err) {
//       return console.log(err)
//     }

//     console.log("cadastrado")
//   }

//   db.run(query, values, afterInsertData)

//   // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
//   //   if (err) {
//   //     return console.log(err)
//   //   }

//   //   console.log("Registro deletado com sucesso")
//   // })

//   db.all(`SELECT * FROM places`, function(err, rows) {
//     if (err) {
//       return console.log(err)
//     }

//     console.log(rows)
//   })

// })