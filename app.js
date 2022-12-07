const { text } = require('express');
const express = require('express');
const multer = require("multer");
const tesseract = require("node-tesseract-ocr");
const natural = require('natural');
// const axios = require("axios");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const parser = require("jsdom");
const app = express()
const port = 3000;

var fileName;
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
app.use('/views/js', express.static(__dirname + '/views/js'));

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
}

// tesseract
//   .recognize("public/img/3.png", config)
//   .then((text) => {
//     console.log("Result:", text)
//   })
//   .catch((error) => {
//     console.log(error.message)
//   })


// var processedText = [];

// Tokenization
const tokens = async (img) => {
  const word_array = []
  await tesseract.recognize(img, config).then((sentence)=>{
    var tokens = tokenizer.tokenize(sentence);
    const len = Object.keys(tokens).length;
    var stem_tokens = [];
    
    // for(let i = 0; i<len; i++){
    //   stem_tokens.push(natural.PorterStemmer.stem(tokens[i]));
    //   stem_tokens[i] = stem_tokens[i].toLowerCase();
    // }
    for(let i = 0; i<len; i++){
      stem_tokens[i] = tokens[i].toLowerCase();
      // console.log(stem_tokens[i])
      if(stopwords.includes(stem_tokens[i])){
        continue;
      }
      word_array.push(stem_tokens[i]);
    };
  });
  const len = word_array.length; 
  const crawled_word_meanings = await web_process(word_array);
  let final_words = ''

  // for(i=0; i<len; i++){
  //   final_words = final_words + word_array[i] + '|MEANSPLIT|'
  //   final_words = final_words + crawled_word_meanings[i] + '|WORDSPLIT|'
  // }
  console.log(final_words);
  return [word_array, crawled_word_meanings]
}

const web_process = async (wordlist) => {
  const resultArr = []
  for(const word of wordlist){
    const word_meaning = await request_crawl(word);
    resultArr.push(word_meaning);
  } 
  //  console.log(resultArr); 
  return resultArr
}
const request_crawl = async (word) => {
  const response = await fetch(`https://dic.daum.net/search.do?q=${word}`)
  const body = await response.text();
  const $ = await cheerio.load(body);
  // const title = $("#mArticle > div.search_cont > div:nth-child(3) > div:nth-child(2) > div > div.search_cleanword > strong > a > span").text();
  const word_meaning = await $("#mArticle > div.search_cont > div:nth-child(3) > div:nth-child(2) > div > ul").text() + "|SPLIT|";
  // console.log(word_meaning)

  return word_meaning
}
app.get('/', (req, res, next) => {
  res.render('index');
  // console.log(processedText);
})

app.post('/result', upload.single('image'), async (req, res, next) => {
  const img = `upload/${fileName}`;
  const final_words = await tokens(img);
  const word_titles = final_words[0]
  const meanings = final_words[1];
  const len = word_titles.length;
  console.log(final_words);
  res.render('result', {title: word_titles, words_len: len, meaning: meanings});
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})