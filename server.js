const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const sendToHarbour = require("./socketharbour")

module.exports = () => { 
    const app = express();
    app.use(express.json());
    //app.use(cors());


    // ---- middleware de validação JWT ----
    /*function autenticarJWT(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader)
            return res.status(401).json({ erro: "Token não enviado" });

        const token = authHeader.split(" ")[1];

        jwt.verify(token, jwtSecret, (err, usuario) => {
            if (err) return res.status(403).json({ erro: "Token inválido" });

            req.usuario = usuario;
            next();
        });
    }*/


    /*// ---- endpoint para gerar token (para testes) ----
    app.post("/login", (req, res) => {
        const { usuario } = req.body;

        if (!usuario)
            return res.status(400).json({ erro: "Informe o usuário" });

        const token = jwt.sign({ usuario }, jwtSecret, { expiresIn: "2h" });

        res.json({ token });
    });*/


    // ---- endpoint protegido que envia dados ao Harbour ----
    //app.get("/consultar", autenticarJWT, async (req, res) => {
    app.post("/apiconc", async (req, res) => {
        try {
            const dados = req.body;
            console.log('--------------------------')
            console.log(req.body)
            console.log('--------------------------')
            const resposta = await sendToHarbour(dados);

            res.json(resposta);

        } catch (erro) {
            res.status(500).json({ err: erro.message });
        }
    });

    // ---- inicia servidor HTTP ----
    app.listen(3000, () => {
        console.log("Servidor API rodando em http://localhost:3000");
    });
}


/*sendToHarbour(clientconfig.host, clientconfig.port, req )
.then((r)=>{console.log(r)})
.catch((e)=>{console.log(e)})*/

