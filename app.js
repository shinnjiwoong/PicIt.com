const { text } = require('express');
const express = require('express');
const multer = require("multer");
const tesseract = require("node-tesseract-ocr");
const natural = require('natural');
const fs = require("fs");
const cheerio = require("cheerio");
const nodemailer = require("nodemailer");
const fetch = require("node-fetch");
const parser = require("jsdom");
const bodyParser = require('body-parser')
const app = express()
const port = 3000;

app.listen(process.env.PORT || 8080);
var fileName;

// Nodemailer 설정

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "shinnjiwoong@gmail.com",
    pass: "n---------------", //Github 업로드를 위해 지워둠.
  },
});

// 불용어 설정
const stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now', 'also'];
const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/')
  },
  filename: function (req, file, cb) {
    fileName = file.filename + '-' + Date.now() + '.png';
    cb(null, file.filename + '-' + Date.now() + '.png');
  }
});

const upload = multer({ storage: storage });

var tokenizer = new natural.WordTokenizer();

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.static('views'));
app.use('/views/js', express.static(__dirname + '/views/js'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
}

// 토큰화 프로세스
const tokens = async (img) => {
  const word_array = []
  await tesseract.recognize(img, config).then((sentence)=>{
    var tokens = tokenizer.tokenize(sentence);
    const len = Object.keys(tokens).length;
    var stem_tokens = [];
    
    for(let i = 0; i<len; i++){
      stem_tokens[i] = tokens[i].toLowerCase();
      if(stopwords.includes(stem_tokens[i])){
        continue;
      }
      word_array.push(stem_tokens[i]);
    };
  });
  const len = word_array.length; 
  const crawled_word_meanings = await web_process(word_array);
  let final_words = ''

  console.log(final_words);
  return [word_array, crawled_word_meanings]
}

// 웹 크롤링 프로세스

const web_process = async (wordlist) => {
  const resultArr = []
  for(const word of wordlist){
    const word_meaning = await request_crawl(word);
    resultArr.push(word_meaning);
  } 
  return resultArr
}
const request_crawl = async (word) => {
  const response = await fetch(`https://dic.daum.net/search.do?q=${word}`)
  const body = await response.text();
  const $ = await cheerio.load(body);
  const word_meaning = await $("#mArticle > div.search_cont > div:nth-child(3) > div:nth-child(2) > div > ul").text() + "|SPLIT|";

  return word_meaning
}

// 렌더링 

app.get('/', (req, res, next) => {
  res.render('index');
})

app.post('/result', upload.single('image'), async (req, res, next) => {
  const img = `upload/${fileName}`;
  const final_words = await tokens(img);
  const word_titles = final_words[0]
  const meanings = final_words[1];
  const len = word_titles.length;
  res.render('result', {title: word_titles, words_len: len, meaning: meanings});
});
app.post('/share', function(req, res){
  const email = req.body.email;
  const word = req.body.word;
  const emailOptions = { 
    // 옵션값 설정
    from: 'shinnjiwoong@gmail.com',
    to: email,
    subject: '당신이 pick한 오늘의 단어들, from PICIT!',
    html: 
    "<h1 >PICIT에서 선택하신 단어를 보내드립니다!</h1> <h2> 단어 : <br>" + word + "</h2>"	
    ,
  };
  transporter.sendMail(emailOptions, res);
  res.render('share')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})