const { text } = require('express');
const express = require('express');
const multer = require("multer");
const tesseract = require("node-tesseract-ocr");
const natural = require('natural');
const app = express()
const port = 3000;

var fileName;

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


var processedText = [];

// Tokenization
const tokens = async (img) => {
  var word_array = []
  await tesseract.recognize(img, config).then((sentence)=>{
    var tokens = tokenizer.tokenize(sentence);
    const len = Object.keys(tokens).length;
    var stem_tokens = [];
    for(let i = 0; i<len; i++){
      stem_tokens.push(natural.PorterStemmer.stem(tokens[i]));
    }
    for(let i = 0; i<len; i++){
      if(stem_tokens[i] == 'a'){
        continue;
      }else if(stem_tokens[i] == 'of'){
        continue;
      }else if(stem_tokens[i] == 'This' || stem_tokens[i] == 'this'){
        continue;
      }else if(stem_tokens[i] == 'is'){
        continue;
      }else if(stem_tokens[i] == 'and'){
        continue;
      }
      word_array.push(stem_tokens[i]);
    };
  });
  console.log('tokenization done!');
  return word_array
}


app.get('/', (req, res, next) => {
  res.render('index');
  // console.log(processedText);
})

app.post('/result', upload.single('image'), async (req, res, next) => {
  const img = `upload/${fileName}`;
  const final_words = await tokens(img);
  const len = final_words.length;
  console.log(final_words);
  res.render('result', {data: final_words, words_len: len});
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})