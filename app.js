// todo: import로 수정
const express = require('express')
const deepl = require('deepl-node');
const dotenv = require("dotenv");
const cors = require("cors");

const app = express()
const port = 8080
dotenv.config()
const authKey = process.env.DEEPL_AUTHKEY;

// todo: 나중에 cors 관련 수정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const translator = new deepl.Translator(authKey);

app.get('/', (req, res) => {
    console.log("Test get")
})

app.post("/translate", async (req, res) => {
    try {
        const result = await translator.translateText(req.body.text, null, 'ko');
        res.send({ "translatedComment": `${result["text"]}` });
    }
    catch (error) {
        console.error("번역 중 에러 발생:", error);
        res.status(500).send("번역 과정에서 에러가 발생했습니다.");
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


