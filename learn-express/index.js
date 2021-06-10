const express = require('express');
const mysql = require('mysql2');
//postでjsonを受け取る際に必須
const bodyParser = require('body-parser');
const line = require('@line/bot-sdk');
// const linebot = require('linebot');

//.env
require('dotenv').config();


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mame',
    database: 'kakeibo'
});

connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
  });

const app = express();
//CORSの設定
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200)
  } else {
    next()
  }
}
app.use(allowCrossDomain)
//ここまで

//form受け取るための設定 extended: はfalseでjson trueでform urlencoded
app.use(express.urlencoded({extended:false}));

//allData
app.get('/api/v1/moneys',(req,res) => {
    connection.query('select* from costs',(error,results) => {
        res.json(results);
    })
});


//createData
const jsonParser = bodyParser.json();
app.post('/api/v1/moneys',jsonParser,(req,res) => {
    // console.log(req.body.total);
    const total = req.body.total
    const elect = req.body.elect
    const gass = req.body.gass
    const water = req.body.water
    connection.query(
        "INSERT INTO costs (total,elect,gass,water) VALUES(?,?,?,?)",
        [total,elect,gass,water],
        (error,results) => {
            console.log('ok');
            //line text message 
                const client = new line.Client({
                channelAccessToken: process.env.LINE_CHANNEL_TOKEN
                });
              
                const message = {
                    type: 'text',
                    text: 'こんにちわkakeibo.chです \n 今月の家計簿のお知らせです。\n' +
                          `支出総額は${total}円です。\n`+
                          '京香さんが引き落とす金額は'+`${req.body.kyoukaDrop}円です。\n`+
                          `内訳は拓哉さんへの補填が${req.body.addTakuya}円、\n`+
                          `楽天口座の生活費の振り込みが${req.body.bankRakuten}円、\n`+
                          '三井住友銀行への貯金が20000円です。'
                };
              
                client.pushMessage(process.env.LINE_TO_ME, message)
                    .then(() => {
                        console.log("line ok");
                })
                .catch((err) => {
                  // error handling
                });
        }
    )
});

//deleteDate
app.post('/api/v1/moneys/delete/:id',(req,res) => {
    // console.log(req.params.id);
    connection.query(
        "DELETE FROM costs WHERE id = ?",
        [req.params.id],
        (error,results) => {
            connection.query('select* from costs',(error,results) => {
                res.json(results);
            console.log("delete");
            })
        }
    )
})

app.listen(3001,()=> {
    console.log('Listening on port 3001');
})