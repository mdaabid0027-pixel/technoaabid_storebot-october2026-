/*CMD
  command: Add Funds h
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: Add Funds
*/

let qr = Bot.getProperty("qr_image_url");

Api.sendPhoto({
  photo: qr,
  caption:
    "📲 Scan this QR and complete your payment.\n" +
    "📲 इस QR को स्कैन करके भुगतान करें।\n\n" +

    "📸 After payment, upload screenshot here.\n" +
    "📸 भुगतान के बाद स्क्रीनशॉट यहीं भेज दें।\n\n" +

    "⚡ If you want to use AutoPay, first enter the amount you want to add.\n" +
    "⚡ यदि आप AutoPay उपयोग करना चाहते हैं, तो पहले राशि लिखें जितना बैलेंस जोड़ना चाहते हैं।"
});

Bot.runCommand("handlePaymentInput");
