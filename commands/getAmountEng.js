/*CMD
  command: getAmountEng
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

let amount = parseFloat(message);

if (!amount || amount <= 0) {
  Bot.sendMessage("❌ Please enter a valid amount.");
  Bot.runCommand("getAmount");
  return;
}

// Save amount
User.setProperty("add_amount", amount, "float");

// QR image
let qr = Bot.getProperty("qr_image_url");

Api.sendPhoto({
  photo: qr,
  caption:
    "📲 Scan this QR and pay ₹" + amount +
    "\n\nAfter payment, send screenshot here."
});

Bot.runCommand("sendPhoto");
