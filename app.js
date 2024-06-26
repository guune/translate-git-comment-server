import { translate } from '@vitalets/google-translate-api';
import { HttpProxyAgent } from 'http-proxy-agent';
import express, { json, urlencoded } from 'express';
import deepl from 'deepl-node';
import { config } from "dotenv";
import cors from "cors";

const app = express()
const port = 8080
config()
const authKey = process.env.DEEPL_AUTHKEY;
const agent = new HttpProxyAgent('http://51.254.78.223:80');

// todo: 나중에 cors 관련 수정
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.get('/', (req, res) => {
    console.log("Test get")
})

app.post("/translate", async (req, res) => {
    try {
        const { text } = await translate(req.body.text, { to: 'ko', fetchOptions: { agent } });
        // const result = await translate(req.body.text, null, { to: 'ko' });
        res.send({ "translatedComment": text });
    }
    catch (error) {
        console.error("번역 중 에러 발생:", error);
        res.status(500).send("번역 과정에서 에러가 발생했습니다.");
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



