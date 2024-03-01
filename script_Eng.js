const thaiAlphabet = "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืุูเแโใไๅๆ็่้๊๋์"; 
const englishAlphabet = "abcdefghijklmnopqrstuvwxyz";
let currentAlphabet = englishAlphabet; // Default to English

function encrypt() {
    let keyword = document.getElementById("keyword").value.replace(/重复字符/g, "");
    let message = document.getElementById("message").value;
    let result = "";

    let cipherMap = createCipherMap(keyword);

    for (let i = 0; i < message.length; i++) {
        let index = currentAlphabet.indexOf(message[i].toLowerCase()); // Convert to lowercase
        if (index !== -1) { // Check if character exists in the alphabet
            result += cipherMap[index];   
        } else {
            result += message[i]; // Keep non-alphabet characters as is
        }
    }

    document.getElementById("result").value = result;
}

function decrypt() {
    let keyword = document.getElementById("keyword").value.replace(/重复字符/g, "");
    let message = document.getElementById("message").value;
    let result = "";

    let cipherMap = createCipherMap(keyword);
    let reverseMap = createReverseMap(cipherMap); 

    for (let i = 0; i < message.length; i++) {
        let index = cipherMap.indexOf(message[i]);
        if (index !== -1) { // Check if character exists in the cipher map
            result += reverseMap[index];  
        } else {
            result += message[i]; // Keep non-alphabet characters as is
        }
    }

    document.getElementById("result").value = result;
}

function createCipherMap(keyword) {
    let map = keyword + currentAlphabet.replace(new RegExp('[' + keyword + ']', 'g'), ''); 
    return map; 
} 

function createReverseMap(cipherMap) {
    let map = currentAlphabet + cipherMap.substring(keyword.length); 
    return map; 
} 

function copyResult() {
    const resultText = document.getElementById("result").value;
    let tempTextArea = document.createElement("textarea");
    tempTextArea.value = resultText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
}

function updateLanguage() {
    let selectedLanguage = document.getElementById("languageSelect").value;
    currentAlphabet = selectedL
anguage === 'en' ? englishAlphabet : thaiAlphabet;
}
