/*CMD
  command: handlePaymentInput
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
command: handlePaymentInput
need_reply: true
*/

if (request.photo) {
  Bot.runCommand("sendScreenshotToAdmin");
  return;
}

let amount = parseFloat(message);

if (!isNaN(amount) && amount > 0) {

  User.setProperty("add_amount", amount, "float");

  Bot.sendMessage(
    "✅ Amount received: ₹" + amount + "\n" +
    "✅ राशि प्राप्त हुई: ₹" + amount + "\n\n" +

    "📸 Now complete payment and send screenshot\n" +
    "📸 अब भुगतान करें और स्क्रीनशॉट भेजें\n\n" +

    "Screenshot must clearly show:\n" +
    "स्क्रीनशॉट में साफ दिखना चाहिए:\n\n" +

    "• UTR / Transaction ID\n" +
    "• Amount Paid\n" +
    "• Date & Time\n" +
    "• Payment Status (Successful)"
  );

  Bot.runCommand("sendScreenshotToAdmin");
  return;
}

Bot.sendMessage(
  "❌ Invalid input\n" +
  "❌ गलत इनपुट\n\n" +

  "Enter amount OR send screenshot\n" +
  "राशि लिखें या स्क्रीनशॉट भेजें"
);

Bot.runCommand("handlePaymentInput");
