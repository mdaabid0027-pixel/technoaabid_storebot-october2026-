/*CMD
  command: /broadcastt
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
command: /broadcast
need_reply: false
*/

let OWNER_ID = Bot.getProperty("admin");

if (user.telegramid != OWNER_ID) {
  return Bot.sendMessage("Only admin allowed.");
}

let parts = message.split(" ");
parts.shift();

let text = parts.join(" ").trim();

if (!text) {
  return Bot.sendMessage(
    "❌ Usage:\n/broadcast Hello"
  );
}

// ================= LOAD ALL USERS =================

let allUsers = [];

for (let i = 1; i <= 100; i++) {

  let key =
  (i === 1)
  ? "user_list"
  : "user_list_" + i;

  let list =
  Bot.getProperty(key);

  if (
    Array.isArray(list) &&
    list.length > 0
  ) {

    allUsers =
    allUsers.concat(
      list.map(String)
    );

  }

}

// remove duplicates
allUsers = [...new Set(allUsers)];

if (allUsers.length === 0) {
  return Bot.sendMessage(
    "❌ No users found."
  );
}

// ================= SAVE DATA =================

Bot.setProperty(
  "broadcast_text",
  text,
  "string"
);

Bot.setProperty(
  "broadcast_index",
  0,
  "integer"
);

Bot.setProperty(
  "broadcast_users",
  allUsers,
  "json"
);

// ================= START =================

Bot.sendMessage(
  "📤 Broadcast Started\n\n" +
  "👥 Total Users: " +
  allUsers.length
);

Bot.runCommand("/broadcastSend");
