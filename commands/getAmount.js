/*CMD
  command: getAmount
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
      "\n\nAfter payment, upload screenshot here.\n\n" +
      "Screenshot must clearly show:\n" +
      "• UTR / Transaction ID\n" +
      "• Amount Paid\n" +
      "• Date & Time\n" +
      "• Payment Status (Successful)"
  });

  // 👇 amount buttons हटाकर Cancel button दिखाओ
  Bot.sendKeyboard(
    "Cancel ❌",
    "Please upload payment screenshot."
  );

  Bot.runCommand("sendScreenshotToAdmin");

  return;
}


// invalid input
Bot.sendMessage("Please enter a valid amount.");

Bot.runCommand("Add Fund");
