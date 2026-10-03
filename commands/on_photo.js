/*CMD
  command: on_photo
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (User.getProperty("wait_payment") != "yes") {
  return;
}

User.setProperty("wait_payment", "no", "string");

let admin = 5006281199; // your admin id

let name = user.first_name || "NoName";
let username = user.username ? "@" + user.username : "NoUsername";
let caption = request.caption || "No caption";

let amountMatch = caption.match(/\d+/);
let amount = amountMatch ? amountMatch[0] : "0";

let fileId = request.photo[request.photo.length - 1].file_id;

Api.sendPhoto({
  chat_id: admin,
  photo: fileId,
  caption:
    "💰 NEW PAYMENT RECEIVED\n\n" +
    "Name: " + name + "\n" +
    "Username: " + username + "\n" +
    "User ID: " + user.telegramid + "\n\n" +
    "Quick Approve:\n" +
    "/addbalance " + user.telegramid + " " + amount
});

Bot.sendMessage("✅ Screenshot received. Admin will verify.");
