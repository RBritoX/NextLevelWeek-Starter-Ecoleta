const express = require("express")
const server = express()

const db = require('./database/db')

server.use(express.static("public"))

server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

server.get('/', (request, response) => {
  return response.render("index.html", { title: "OI" })
})

server.get('/create-point', (request, response) => {
  return response.render("create-point.html")
})

server.post("/save-point", (request, response) => {
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `

  const values = [
    request.body.image,
    request.body.name,
    request.body.address,
    request.body.address2,
    request.body.state,
    request.body.city,
    request.body.items,
  ]

  function afterInsertData(err) {
    if (err) {
      return response.send("Erro no cadastro")
    }

    return response.render("create-point.html", { saved: true })
  }

  db.run(query, values, afterInsertData)

})

server.get('/search-results', (request, response) => {
  const search = request.query.search

  if (search == "") {
    return response.render("search-results.html", { total: 0 })
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if (err) {
      return console.log(err)
    }

    const total = rows.length;

    return response.render("search-results.html", { places: rows, total })
  })
  
})

server.listen(3000, () => {
  console.log("🚀 server startered on port 3000")
})