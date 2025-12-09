fetch("http://10.10.10.105:3000/apiconc", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    host: "10.10.10.31",
    port: "62850",
    message: {
      funcao: "listar_produtos",
      produto: "parac"
    }
  })
})
.then(response => response.json())
.then(data => console.log("Resposta:", data))
.catch(err => console.error("Erro:", err));