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

---

 ### 👀 Overview / 개요
 #### 1. WHAT / 목적
 PICIT의 목적은 꽤나 단순합니다. **'사용자가 가지고 있는 영문이 포함된 이미지 파일로부터 단어를 뽑아내서 더욱 간편하게 공부할 수 있게 하자'** 입니다. 
 다양한 정보가 인터넷을 통해 자유롭게 공개된 지금, 우리는 웹 상에서 다양한 문서들을 보면서 학습을 할 수 있습니다. 원서로 된 자료들을 볼 때, 우리는 종종 모르는 단어가 있으면 하나하나 단어를 찾아가면서 해석하는 과정을 거치는데, 이때 그저 자료 이미지를 PICIT 웹사이트에 업로드함으로써 간편하게 이미지 안의 단어들과 그 의미를 찾아내고, 모르는 단어들만 선택하여 자신의 이메일로 공유할 수 있습니다. 
 
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

![프로젝트 구조 001](https://user-images.githubusercontent.com/109443641/217244201-d08cba2d-71a4-4eb3-a9e6-665ab48d05b8.png)
---

 ### 👀 Detail / 구현화면
 **<메인화면>**
 <img width="1000" alt="PICIT-메인화면" src="https://user-images.githubusercontent.com/109443641/217186185-841a3ec8-9277-4a4c-baec-1839e6d1c626.png">
 
 **<업로드>**
 <img width="1440" alt="PICIT-업로드화면" src="https://user-images.githubusercontent.com/109443641/217186577-0c44b353-2712-48fb-bfc4-62a27dc90eb4.png">
 
 **<결과화면>**
 <img width="1000" alt="PICIT-결과-1" src="https://user-images.githubusercontent.com/109443641/217186678-c5f1bbec-0116-471a-99fb-134874e8414e.png">
 <img width="1000" alt="PICIT-결과-2" src="https://user-images.githubusercontent.com/109443641/217186686-cd1b3a26-95f7-4b9e-82c8-8fa8790f0086.png">
 <img width="1000" alt="PICIT-결과-3" src="https://user-images.githubusercontent.com/109443641/217186689-1aef711d-e5f1-48f5-a909-18059b0143b0.png">
 <img width="1000" alt="PICIT-결과-4" src="https://user-images.githubusercontent.com/109443641/217186694-2f93aba8-6964-4c21-a30d-dde7bc6e4c87.png">

**<이메일 전송>**
<img width="1000" alt="PICIT-마지막화면" src="https://user-images.githubusercontent.com/109443641/217187132-6655f44c-6817-4393-af09-454d5c3f1716.png">
<img width="1000" alt="PICIT-메일전송화면" src="https://user-images.githubusercontent.com/109443641/217187144-f43a1921-a602-459d-a73f-92b0915b67c9.png">

--- 
 ### 👀 Improvements / 개선사항
 1. 이메일 전송시에 사용자가 받는 메일의 가독성을 높일 필요가 있습니다. 
 2. 자연어처리 필터링을 좀 더 세밀하게 다듬어서 사용성을 높일 필요가 있습니다. 
 3. 전체적인 디자인 개선이 필요하다고 생각합니다. 
---
### 👀 Thoughts / 고찰
- PICIT프로젝트는 **웹 개발자로써 처음으로 완성된 웹 프로젝트를 만들었다**는 데에 큰 의미가 있다. 대학에서 컴퓨터공학을 배우면서 과연 이걸 업으로 삼고 나아가는게 맞는가에 대한 고민의 시간을 보내느라 하라는 것만 어찌어찌 하면서 보내다가 인터렉티브 웹 / 프론트엔드 개발이라는 어떤 막연한 분야에 대한 엄청난 흥미를 느끼고 짧은시간동안 굉장히 열심히 파고들어보았고, **PICIT은 거의 제로의 상태에서 시작하여 대략 1년이 안되는 시간동안 프로젝트를 리드하면서 아이디어 도출에서부터 기능 구현과 디자인까지 겁없이 뛰어들어본 프로젝트였다.** 어느순간부터 결과는 중요하지 않았고, 그저 이걸 하나하나 만들어가는 과정 안에서 꽤나 뿌듯함을 느끼면서 개발을 밤낮없이 했던 것 같다. (사실 졸업 프로젝트라는 것이 겁없이 해보는 그런 매력이 있는것 아니겠나?하는 위로를 해본다.) 여튼 이 프로젝트는 첫 완성 프로젝트라는 것에서 큰 감사함과 의미를 가진다.
- 위에서 분명 결과는 상관없는 상태였다고 했지만서도, 이번 프로젝트를 통해서 예상했던 대로 많은 부족함을 느꼈다. 일단 얼추 눈에 이뻐보이는 것이 뭔지 추상적인 감은 오지만, 이걸 실제로 만들어내기 위해서 필요한 역량과 지식이 딸린다는 생각이 많이 들었다. 웹에서의 요소 하나하나가 수치 하나만 바뀌어도 눈에 보이는 지점에서의 차이는 꽤 컸다. 그러므로, 앞으로 목표는 **추상적이고 대략적인 감이 아니라 점점 더 정교한 시각적 테이스트와 역량을 개발해야할 필요**가 있다.
- 시간을 아낀다는 이유로 Pre-Production 단계를 굉장히 간소하게 진행하고 넘어갔는데, 이게 오히려 시간을 후반부에 많이 갉아먹는 원인이 되었다. 오히려 초반 기획단계에서 디자인에 대한 명확한 컨셉을 잡아뒀다면 (하다못해 컬러 팔레트라도 정해뒀다면..) 마지막 단계에서 이것저것을 고치느라 시간을 덜 썼을 것이라고 생각한다. 다음에는 피그마를 비롯한 기획에 필요한 툴들을 더 익혀보고, **프리 단계에 좀 더 시간과 에너지를 써볼것.**
- **코드를 말끔하게 정리하는것은 굉장히 중요하다.** 코드가 산발적으로 위치해있으면 뭔가를 수정하는데에 굉장한 품이 들고, 그러므로 결국 귀찮아서 타협하게 된다. 그러므로, 코드의 깔끔한 정리를 얕게 봐서는 안된다. 그리고 코드를 나중에 한꺼번에 정리하려는 생각은 접자. 그러다가 무지막지하게 많은 양의 코드에 압도되기 쉽상이다. **코드 정리는 습관화하는것이 좋겠다.**

## 읽어주셔서 감사합니다!
