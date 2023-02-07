# PICIT!
 ## PICIT은 광학식 문자인식 기술 (OCR)과 자연어처리 기술(NLP)을 융합한 영단어 학습 웹사이트입니다.
 **서울과학기술대학교 캡스톤 디자인 및 졸업작품으로 출품하였습니다.*
 
 ### 👀 Language Spec / 사용된 언어
 #### ✔️ Front-end
 <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"><img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"><img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">

 #### ✔️ Back-end
 <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
 
 ### 👀 Used Libraries / 사용된 라이브러리
 1. Tesseract.js : OCR 처리
 2. Natural.js : NLP 처리
 3. Cheerio : 웹 크롤링
 4. Nodemailer : 사용자 이메일 전송 처리

 ### 👀 Overview / 개요
 #### 1. WHAT / 목적
 PICIT의 목적은 꽤나 단순합니다. **'사용자가 가지고 있는 영문이 포함된 이미지 파일로부터 단어를 뽑아내서 더욱 간편하게 공부할 수 있게 하자'** 입니다. 
 다양한 정보가 인터넷을 통해 자유롭게 공개된 지금, 우리는 웹 상에서 다양한 문서들을 보면서 학습을 할 수 있습니다. 원서로 된 자료들을 볼 때, 우리는 종종 모르는 단어가 있으면 하나하나 단어를 찾아가면서 해석하는 과정을 거치는데, 이때 그저 자료 이미지를 PICIT 웹사이트에 업로드함으로써 간편하게 이미지 안의 단어들과 그 의미를 찾아낼 수 있습니다. 
 
 #### 2. HOW / 구현 방식 
 저희는 광학식 문자인식 기술 (Optical Character Recornition, OCR)과 자연어 처리 기술 (Natural Language Processing, NLP)을 융합하여 목적을 달성했습니다. 
 - **광학식 문자인식 기술?**
  광학식 문자인식 기술이란, 텍스트 이미지를 기계가 읽을 수 있는 텍스트 포맷으로 변환하는 과정을 말합니다. 대표적인 실용예시로, 은행 애플리케이션에서 사용자의 신분 정보를 받아올 때, 텍스트로 받는것이 아니라 신분증 이미지를 받아서 그 안의 텍스트들을 인식하여 추출하는 것이 있습니다. 
 
- **자연어처리?**
  자연어처리 기술이란, 머신러닝 기술을 이용하여 텍스트와 데이터를 처리하고 해석하는 과정입니다. 자연어처리 기술은 현재 굉장히 다양한 분야에서 사용되며, 대표적으로 챗봇과 같은 사용자와의 자연스러운 인터랙션 기능을 제공하는 서비스가 있습니다. 
  
- **단어인식 및 처리 과정**
  1) 사용자가 이미지를 업로드하면 서버로 넘어간 이미지의 OCR 처리과정을 거쳐서 내부의 단어들을 모두 추출합니다. 
  2) 추출된 단어들을 1차적인 필터링 과정으로 넘겨 단어의 사전적 의미가 유효하지 않을 단어들을 제거합니다. (what, when, he, she, it, is, are 등등)
  3) 남은 단어들의 사전적 의미들을 웹크롤링하여 사전적 의미를 가지고 옵니다. *(단어의 의미에 대한 크롤링은 다음 영어사전을 사용하였습니다.)*
  4) 3번 과정까지 지난 단어들은 클라이언트 사이드로 넘어가게 되며, 이때 사용자에게 단어를 보여주기 전 *에러로 인해 의미가 잘 담겨있지 않거나*, *숫자가 포함된 단어이거나*, *사람의 이름* 등 유의미한 결과를 포함하지 않는 단어들을 2차적 필터링합니다. 
  5) 마지막으로 사용자의 화면에 최종 단어들을 띄웁니다. 
