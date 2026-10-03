/*CMD
  command: /addkoskeys
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER
/addkoskeys 8bp 10
KEY1
KEY2
KEY3
  ANSWER
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: /addkoskeys
need_reply: true
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  return Bot.sendMessage("❌ Admin only command");
}

/*
Step 1:

/addkoskeys game duration

Example:

/addkoskeys 8bp 10
*/

let parts = message.split(" ");

if (parts.length < 3) {
  return Bot.sendMessage(
    "Usage:\n/addkoskeys game duration\n\nExample:\n/addkoskeys 8bp 10"
  );
}

let game = parts[1].toLowerCase();
let duration = parts[2];

let stockKey = "kos_" + game + "_" + duration + "_stock";

// save target
Bot.setProperty("kos_upload_target", stockKey, "string");

Bot.sendMessage(
  "📥 Send keys (one per line)\n\nExample:\nKEY1\nKEY2\nKEY3"
);

Bot.runCommand("uploadKosKeys");
