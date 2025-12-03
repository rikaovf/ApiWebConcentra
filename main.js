const sendToHarbour = require("./socketharbour")

sendToHarbour('10.10.10.31', '62850', {funcao: "listar_produtos", produto: "parac"} )
.then((r)=>{console.log(r)})
.catch((e)=>{console.log(e)})