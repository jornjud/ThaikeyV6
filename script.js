const ALPHABETS = {
  thai: "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืุูเแโใไๅๆ็่้๊๋์",
  english: "abcdefghijklmnopqrstuvwxyz",
};

let currentAlphabet = ALPHABETS.thai;
let history = [];

function encrypt(keyword, message) {
  if (!validateKeyword(keyword)) {
    console.error("Keyword ไม่ถูกต้อง: ห้ามมีอักษรซ้ำ");
    return;
  }

  const cipherMap = createCipherMap(keyword);
  const result = message.replace(/./g, c => cipherMap[ALPHABETS.thai.indexOf(c)] || c);
  document.getElementById("result").value = result;
  addHistory(keyword, message, result);
}

function decrypt(keyword, message) {
  if (!validateKeyword(keyword)) {
    console.error("Keyword ไม่ถูกต้อง: ห้ามมีอักษรซ้ำ");
    return;
  }

  const cipherMap = createCipherMap(keyword);
  const reverseMap = createReverseMap(cipherMap, keyword);
  const result = message.replace(/./g, c => reverseMap[cipherMap.indexOf(c)] || c);
  document.getElementById("result").value = result;
  addHistory(keyword, message, result);
}

function createCipherMap(keyword) {
  return keyword + currentAlphabet.replace(new RegExp('[' + keyword + ']', 'g'), '');
}

function createReverseMap(cipherMap, keyword) {
  return currentAlphabet + cipherMap.substring(keyword.length);
}

function copyResult() {
  navigator.clipboard.writeText(document.getElementById("result").value);
}

function checkResult() {
  let keyword = document.getElementById('keyword').value;
  let result = document.getElementById('result').value;

  // แทนที่ข้อความในกล่องข้อความ "ข้อความ"
  document.getElementById('message').value = result;

  // ถอดรหัสข้อความ
  decrypt(keyword, result);
}




function addHistory(keyword, message, result) {
  history.push({
    timestamp: new Date().toLocaleString(),
    keyword,
    message,
    result,
  });
  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  const historyElement = document.getElementById("history");
  historyElement.innerHTML = history.map(entry => `
    <p class="timestamp">${entry.timestamp}</p>
    <p class="keyword">Keyword: ${entry.keyword}</p>
    <p class="message">Message: ${entry.message}</p>
    <p class="result">Result: ${entry.result}</p>
  `).join('');
}

function clearText() {
  document.getElementById("keyword").value = "";
  document.getElementById("message").value = "";
  document.getElementById("result").value = "";
}

updateHistoryDisplay();

function validateKeyword(keyword) {
  return !/[a-z\d].*?\1/.test(keyword);
}
