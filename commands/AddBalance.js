/*CMD
  command: AddBalance
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
  command: AddBalance
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// First send the QR image
let qr = Bot.getProperty("qr_image_url") || "https://ibb.co/wGQr0"
Api.sendPhoto({
  photo: qr,
  caption: `Scan this QR and make payment.`
});

Bot.sendMessage(`After payment is done, send a screenshot of the payment here.

The amount will be added to your balance after verification.

📌 Note: Transaction ID (UTR) and amount should be clearly visible in the screenshot..`)
Bot.runCommand("sendPhoto")
