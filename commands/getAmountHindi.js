/*CMD
  command: getAmountHindi
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: getAmount
need_reply: true
*/

let qr = Bot.getProperty("qr_image_url");
let upi = Bot.getProperty("upi_id");

let amount = parseFloat(message);

// अगर amount valid है
if (!isNaN(amount) && amount > 0) {

  User.setProperty("add_amount", amount, "float");

  Api.sendPhoto({
    photo: qr,
    caption:
      "Pay ₹" + amount + " using this QR.\n\n" +
      "UPI ID: " + (upi || "Not set") +
      "\n\nभुगतान करने के बाद स्क्रीनशॉट यहीं भेजें।\n\n" +
      "स्क्रीनशॉट में साफ दिखाई देना चाहिए:\n" +
      "• UTR / Transaction ID\n" +
      "• भुगतान की गई राशि\n" +
      "• दिनांक और समय\n" +
      "• पेमेंट स्टेटस (Successful)"
  });

  // 👇 amount buttons हटाकर Cancel button दिखाओ
  Bot.sendKeyboard(
    "Nahi ❌",
    "Please upload payment screenshot."
  );

  Bot.runCommand("sendScreenshotToAdminHindi");

  return;
}


// invalid input
Bot.sendMessage("Please enter a valid amount.");

Bot.runCommand("Paise Jodein");
