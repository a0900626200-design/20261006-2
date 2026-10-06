// 宣告目前所在的題目編號，從第 0 題開始計算
let currentQuestionIndex = 0;

// 宣告目前答對的題數
let score = 0;

// 宣告使用者目前選擇的選項編號
let selectedOptionIndex = -1;

// 宣告目前題目是否已經作答
let hasAnswered = false;

// 宣告測驗是否已經結束
let quizFinished = false;

// 宣告下一題按鈕
let nextButton;

// 宣告重新測驗按鈕
let restartButton;

// 建立五題 p5.js 選擇題資料
const quizQuestions = [
  {
    // 設定第一題題目
    question: "在 p5.js 中，哪一個函式會在程式開始時執行一次？",

    // 設定第一題的四個選項
    options: [
      "draw()",
      "setup()",
      "start()",
      "begin()"
    ],

    // 設定正確答案為第 2 個選項，索引值為 1
    correctIndex: 1
  },

  {
    // 設定第二題題目
    question: "在 p5.js 中，哪一個函式會持續重複執行？",

    // 設定第二題的四個選項
    options: [
      "loop()",
      "repeat()",
      "draw()",
      "run()"
    ],

    // 設定正確答案為第 3 個選項，索引值為 2
    correctIndex: 2
  },

  {
    // 設定第三題題目
    question: "哪一個指令可以在 p5.js 中建立畫布？",

    // 設定第三題的四個選項
    options: [
      "createScreen()",
      "createCanvas()",
      "makeCanvas()",
      "newCanvas()"
    ],

    // 設定正確答案為第 2 個選項，索引值為 1
    correctIndex: 1
  },

  {
    // 設定第四題題目
    question: "在 p5.js 中，哪一個指令可以設定背景顏色？",

    // 設定第四題的四個選項
    options: [
      "background()",
      "bgColor()",
      "setBackground()",
      "canvasColor()"
    ],

    // 設定正確答案為第 1 個選項，索引值為 0
    correctIndex: 0
  },

  {
    // 設定第五題題目
    question: "在 p5.js 中，哪一個指令可以畫出圓形？",

    // 設定第五題的四個選項
    options: [
      "circle()",
      "ellipse()",
      "round()",
      "drawCircle()"
    ],

    // 設定正確答案為第 2 個選項，索引值為 1
    correctIndex: 1
  }
];

// p5.js 初始化函式，只會執行一次
function setup() {
  // 建立符合瀏覽器視窗大小的畫布
  createCanvas(windowWidth, windowHeight);

  // 設定文字使用置中對齊
  textAlign(CENTER, CENTER);

  // 設定文字使用平滑效果
  textFont("Arial");

  // 建立下一題按鈕
  nextButton = createButton("下一題");

  // 設定下一題按鈕的滑鼠點擊事件
  nextButton.mousePressed(goToNextQuestion);

  // 設定下一題按鈕的基本樣式
  styleButton(nextButton);

  // 建立重新測驗按鈕
  restartButton = createButton("重新測驗");

  // 設定重新測驗按鈕的滑鼠點擊事件
  restartButton.mousePressed(resetQuiz);

  // 設定重新測驗按鈕的基本樣式
  styleButton(restartButton);

  // 初始時隱藏下一題按鈕
  nextButton.hide();

  // 初始時隱藏重新測驗按鈕
  restartButton.hide();
}

// p5.js 主要繪圖函式，會持續執行
function draw() {
  // 設定畫布背景顏色
  background("#f8f9fa");

  // 如果測驗已經結束，就繪製結果畫面
  if (quizFinished) {
    drawResultScreen();

    // 更新重新測驗按鈕的位置
    updateRestartButtonPosition();

    // 結束本次 draw() 執行
    return;
  }

  // 繪製測驗畫面
  drawQuizScreen();

  // 更新下一題按鈕的位置
  updateNextButtonPosition();
}

// 繪製測驗題目畫面
function drawQuizScreen() {
  // 取得目前題目的資料
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // 計算主要內容區域的寬度
  const contentWidth = min(width - 40, 900);

  // 計算主要內容區域的左側位置
  const contentX = (width - contentWidth) / 2;

  // 設定標題文字大小
  textSize(min(width * 0.06, 42));

  // 設定標題文字顏色
  fill("#343a40");

  // 繪製測驗標題
  text("p5.js 程式設計小測驗", width / 2, 55);

  // 設定題數文字大小
  textSize(min(width * 0.035, 22));

  // 設定題數文字顏色
  fill("#6c757d");

  // 繪製目前題數與總題數
  text(
    `第 ${currentQuestionIndex + 1} 題，共 ${quizQuestions.length} 題`,
    width / 2,
    100
  );

  // 計算題目區域的上方位置
  const questionY = 145;

  // 設定題目文字大小
  textSize(min(width * 0.045, 30));

  // 設定題目文字顏色
  fill("#212529");

  // 繪製題目文字
  drawWrappedText(
    currentQuestion.question,
    width / 2,
    questionY,
    contentWidth - 20,
    42
  );

  // 計算選項區域的起始位置
  const optionStartY = min(height * 0.36, 300);

  // 計算每個選項的高度
  const optionHeight = min(height * 0.1, 70);

  // 計算每個選項之間的間距
  const optionGap = 18;

  // 使用迴圈繪製四個選項
  for (let i = 0; i < currentQuestion.options.length; i++) {
    // 計算目前選項的垂直位置
    const optionY = optionStartY + i * (optionHeight + optionGap);

    // 繪製單一選項
    drawOption(
      currentQuestion.options[i],
      i,
      contentX,
      optionY,
      contentWidth,
      optionHeight
    );
  }

  // 如果使用者已經作答，就顯示答題結果提示
  if (hasAnswered) {
    // 設定提示文字大小
    textSize(min(width * 0.04, 24));

    // 如果選擇的答案正確，就顯示答對訊息
    if (
      selectedOptionIndex ===
      currentQuestion.correctIndex
    ) {
      // 設定答對文字顏色
      fill("#198754");

      // 顯示答對訊息
      text("答對了！", width / 2, height - 100);
    } else {
      // 設定答錯文字顏色
      fill("#dc3545");

      // 顯示答錯訊息
      text("答錯了！粉紅色選項是正確答案。", width / 2, height - 100);
    }
  }
}

// 繪製單一選項
function drawOption(label, optionIndex, x, y, optionWidth, optionHeight) {
  // 取得目前題目的資料
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // 預設選項背景顏色
  let optionColor = "#ffffff";

  // 設定選項邊框顏色
  let borderColor = "#adb5bd";

  // 如果目前題目已作答，就根據答案狀態改變顏色
  if (hasAnswered) {
    // 如果目前選項是正確答案，就使用指定的粉紅色
    if (optionIndex === currentQuestion.correctIndex) {
      optionColor = "#ffc8dd";

      // 設定正確答案的邊框顏色
      borderColor = "#ff70a6";
    }

    // 如果目前選項是使用者選錯的答案，就使用淡紅色
    if (
      optionIndex === selectedOptionIndex &&
      selectedOptionIndex !== currentQuestion.correctIndex
    ) {
      optionColor = "#ffadad";

      // 設定錯誤答案的邊框顏色
      borderColor = "#dc3545";
    }

    // 如果使用者選擇的是正確答案，就使用淡綠色
    if (
      optionIndex === selectedOptionIndex &&
      selectedOptionIndex === currentQuestion.correctIndex
    ) {
      optionColor = "#caffbf";

      // 設定答對答案的邊框顏色
      borderColor = "#198754";
    }
  }

  // 設定選項填滿顏色
  fill(optionColor);

  // 設定選項邊框顏色
  stroke(borderColor);

  // 設定選項邊框粗細
  strokeWeight(3);

  // 繪製圓角選項背景
  rect(x, y, optionWidth, optionHeight, 16);

  // 設定選項文字顏色
  fill("#212529");

  // 移除文字描邊
  noStroke();

  // 設定選項文字大小
  textSize(min(width * 0.035, 23));

  // 在選項中繪製文字
  drawWrappedText(
    `${optionIndex + 1}. ${label}`,
    x + optionWidth / 2,
    y + optionHeight / 2,
    optionWidth - 30,
    30
  );
}

// 使用滑鼠點擊時執行
function mousePressed() {
  // 處理使用者點擊事件
  handlePointerInput(mouseX, mouseY);
}

// 使用觸控操作時執行
function touchStarted() {
  // 處理使用者觸控事件
  handlePointerInput(touchX, touchY);

  // 防止觸控事件造成頁面捲動
  return false;
}

// 處理滑鼠或觸控輸入
function handlePointerInput(pointerX, pointerY) {
  // 如果測驗已結束，就不處理選項點擊
  if (quizFinished) {
    return;
  }

  // 如果目前題目已經作答，就不允許再次選擇
  if (hasAnswered) {
    return;
  }

  // 計算選項區域寬度
  const contentWidth = min(width - 40, 900);

  // 計算選項區域的左側位置
  const contentX = (width - contentWidth) / 2;

  // 計算選項的起始垂直位置
  const optionStartY = min(height * 0.36, 300);

  // 計算選項高度
  const optionHeight = min(height * 0.1, 70);

  // 計算選項間距
  const optionGap = 18;

  // 逐一檢查四個選項是否被點擊
  for (let i = 0; i < 4; i++) {
    // 計算目前選項的垂直位置
    const optionY = optionStartY + i * (optionHeight + optionGap);

    // 判斷點擊位置是否在選項範圍內
    const isInsideOption =
      pointerX >= contentX &&
      pointerX <= contentX + contentWidth &&
      pointerY >= optionY &&
      pointerY <= optionY + optionHeight;

    // 如果點擊到目前選項，就進行答題
    if (isInsideOption) {
      // 儲存使用者選擇的選項
      answerQuestion(i);

      // 結束迴圈
      break;
    }
  }
}

// 處理使用者選擇答案
function answerQuestion(optionIndex) {
  // 如果題目已經作答，就不重複處理
  if (hasAnswered) {
    return;
  }

  // 儲存使用者選擇的選項
  selectedOptionIndex = optionIndex;

  // 將題目設定為已作答
  hasAnswered = true;

  // 取得目前題目的資料
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // 如果使用者答對，就增加答對題數
  if (selectedOptionIndex === currentQuestion.correctIndex) {
    // 將分數加一
    score++;
  }

  // 顯示下一題按鈕
  nextButton.show();
}

// 前往下一題
function goToNextQuestion() {
  // 如果目前題目尚未作答，就不進入下一題
  if (!hasAnswered) {
    return;
  }

  // 如果目前已經是最後一題，就顯示結果畫面
  if (currentQuestionIndex === quizQuestions.length - 1) {
    // 設定測驗完成
    quizFinished = true;

    // 隱藏下一題按鈕
    nextButton.hide();

    // 顯示重新測驗按鈕
    restartButton.show();

    // 結束函式
    return;
  }

  // 題目編號加一
  currentQuestionIndex++;

  // 重設選擇的選項
  selectedOptionIndex = -1;

  // 重設作答狀態
  hasAnswered = false;

  // 隱藏下一題按鈕
  nextButton.hide();
}

// 繪製測驗結果畫面
function drawResultScreen() {
  // 設定結果標題文字大小
  textSize(min(width * 0.08, 60));

  // 設定結果標題文字顏色
  fill("#343a40");

  // 顯示測驗完成文字
  text("測驗完成！", width / 2, height * 0.28);

  // 設定分數文字大小
  textSize(min(width * 0.1, 72));

  // 設定分數文字顏色
  fill("#ff70a6");

  // 顯示答對題數
  text(
    `${score} / ${quizQuestions.length}`,
    width / 2,
    height * 0.48
  );

  // 設定說明文字大小
  textSize(min(width * 0.045, 30));

  // 設定說明文字顏色
  fill("#6c757d");

  // 根據分數顯示不同鼓勵文字
  if (score === quizQuestions.length) {
    text("太棒了！全部答對！", width / 2, height * 0.64);
  } else if (score >= 3) {
    text("表現很好，再接再厲！", width / 2, height * 0.64);
  } else {
    text("繼續練習，你會越來越進步！", width / 2, height * 0.64);
  }
}

// 重新開始測驗
function resetQuiz() {
  // 將題目編號重設為第一題
  currentQuestionIndex = 0;

  // 將分數重設為零
  score = 0;

  // 清除選項選擇狀態
  selectedOptionIndex = -1;

  // 將作答狀態重設為尚未作答
  hasAnswered = false;

  // 將測驗完成狀態重設為未完成
  quizFinished = false;

  // 隱藏重新測驗按鈕
  restartButton.hide();

  // 隱藏下一題按鈕
  nextButton.hide();
}

// 設定按鈕的共同樣式
function styleButton(button) {
  // 設定按鈕文字大小
  button.style("font-size", "20px");

  // 設定按鈕文字顏色
  button.style("color", "#ffffff");

  // 設定按鈕背景顏色
  button.style("background-color", "#ff70a6");

  // 移除按鈕邊框
  button.style("border", "none");

  // 設定按鈕圓角
  button.style("border-radius", "12px");

  // 設定按鈕內距
  button.style("padding", "12px 28px");

  // 設定滑鼠游標樣式
  button.style("cursor", "pointer");

  // 設定按鈕陰影
  button.style("box-shadow", "0 4px 10px rgba(0, 0, 0, 0.15)");
}

// 更新下一題按鈕的位置
function updateNextButtonPosition() {
  // 如果目前題目尚未作答，就不顯示按鈕
  if (!hasAnswered) {
    nextButton.hide();

    // 結束函式
    return;
  }

  // 顯示下一題按鈕
  nextButton.show();

  // 設定按鈕水平位置
  const buttonX = width / 2 - 70;

  // 設定按鈕垂直位置
  const buttonY = height - 65;

  // 設定下一題按鈕位置
  nextButton.position(buttonX, buttonY);
}

// 更新重新測驗按鈕的位置
function updateRestartButtonPosition() {
  // 設定重新測驗按鈕水平位置
  const buttonX = width / 2 - 75;

  // 設定重新測驗按鈕垂直位置
  const buttonY = height * 0.75;

  // 設定重新測驗按鈕位置
  restartButton.position(buttonX, buttonY);
}

// 讓文字按照指定寬度自動換行
function drawWrappedText(message, centerX, centerY, maxWidth, lineHeight) {
  // 將文字依照空白切割成單字
  const words = message.split(" ");

  // 建立儲存每一行文字的陣列
  const lines = [];

  // 建立目前正在組合的文字行
  let currentLine = "";

  // 逐一處理每個文字片段
  for (let i = 0; i < words.length; i++) {
    // 建立加入下一個文字片段後的測試文字
    const testLine =
      currentLine.length === 0
        ? words[i]
        : currentLine + " " + words[i];

    // 判斷測試文字是否超過指定寬度
    if (textWidth(testLine) > maxWidth && currentLine.length > 0) {
      // 將目前文字行加入文字陣列
      lines.push(currentLine);

      // 將下一個文字片段設定為新的一行
      currentLine = words[i];
    } else {
      // 將測試文字設定為目前文字行
      currentLine = testLine;
    }
  }

  // 將最後一行文字加入文字陣列
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  // 計算全部文字的總高度
  const totalHeight = lines.length * lineHeight;

  // 計算第一行文字的垂直位置
  let startY = centerY - totalHeight / 2 + lineHeight / 2;

  // 逐行繪製文字
  for (let i = 0; i < lines.length; i++) {
    // 繪製目前文字行
    text(lines[i], centerX, startY + i * lineHeight);
  }
}

// 瀏覽器視窗尺寸改變時執行
function windowResized() {
  // 重新設定畫布大小
  resizeCanvas(windowWidth, windowHeight);
}