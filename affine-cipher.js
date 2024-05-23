// Isi message yang ingin di enkripsi kan disini
var message = "bintang";

// Fungsi untuk mengenkripsi pesan
function encrypt(message, a, b) {
    var encryptedMessage = "";
    for (var i = 0; i < message.length; i++) {
        var charCode = message.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            // Enkripsi huruf kapital
            encryptedMessage += String.fromCharCode(((a * (charCode - 65) + b) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            // Enkripsi huruf kecil
            encryptedMessage += String.fromCharCode(((a * (charCode - 97) + b) % 26) + 97);
        } else {
            // Tidak mengenkripsi karakter selain huruf
            encryptedMessage += message.charAt(i);
        }
    }
    return encryptedMessage;
}

// Fungsi untuk mendekripsi pesan
function decrypt(encryptedMessage, a, b) {
    var decryptedMessage = "";
    var aInverse = 0;
    for (var i = 0; i < 26; i++) {
        if ((a * i) % 26 === 1) {
            aInverse = i;
            break;
        }
    }
    for (var i = 0; i < encryptedMessage.length; i++) {
        var charCode = encryptedMessage.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            // Dekripsi huruf kapital
            decryptedMessage += String.fromCharCode(((aInverse * (charCode - 65 - b + 26)) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            // Dekripsi huruf kecil
            decryptedMessage += String.fromCharCode(((aInverse * (charCode - 97 - b + 26)) % 26) + 97);
        } else {
            // Tidak mendekripsi karakter selain huruf
            decryptedMessage += encryptedMessage.charAt(i);
        }
    }
    return decryptedMessage;
}

// Fungsi untuk melakukan kriptoanalisis
function cryptanalysis(encryptedMessage) {
    var decryptedMessages = [];
    for (var a = 1; a < 26; a++) {
        for (var b = 0; b < 26; b++) {
            var decryptedMessage = decrypt(encryptedMessage, a, b);
            decryptedMessages.push(decryptedMessage);
        }
    }
    return decryptedMessages;
}

var a = 5;
var b = 8;

var encryptedMessage = encrypt(message, a, b);
console.log("Pesan terenkripsi: " + encryptedMessage);

var decryptedMessage = decrypt(encryptedMessage, a, b);
console.log("Pesan terdekripsi: " + decryptedMessage);

var decryptedMessages = cryptanalysis(encryptedMessage);
console.log("Hasil kriptoanalisis:");
for (var i = 0; i < decryptedMessages.length; i++) {
    console.log(decryptedMessages[i]);
    if (decryptedMessages[i] === message) {
        console.log("Message telah ditemukan.");
        break;
    }
}