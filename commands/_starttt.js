/*CMD
  command: /starttt
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
command: /starttt
*/

let uid = user.telegramid.toString();

// basic user data
let firstName = user.first_name || "NoName";
let lastName = user.last_name ? " " + user.last_name : "";
let fullName = firstName + lastName;
let username = user.username || "NoUsername";

Bot.setProperty(uid + "_username", username, "string");
Bot.setProperty(uid + "_name", fullName, "string");

// bot id
let botId = Bot.getProperty(uid + "_botid");

if (!botId) {
  let nextBotId = Bot.getProperty("next_botid");
  if (!nextBotId) nextBotId = 0;

  nextBotId = parseInt(nextBotId) + 1;
  botId = nextBotId;

  Bot.setProperty("next_botid", nextBotId, "integer");
  Bot.setProperty(uid + "_botid", botId, "integer");
  Bot.setProperty("botid_" + botId, uid, "string");
}

// 500 users per list
let listNo = Math.floor((botId - 1) / 500) + 1;
let listKey = (listNo === 1) ? "user_list" : "user_list_" + listNo;

let users = Bot.getProperty(listKey);
if (!Array.isArray(users)) users = [];
users = users.map(String);

if (!users.includes(uid)) {
  users.push(uid);
  Bot.setProperty(listKey, users, "json");
}

// balance
let balance = Bot.getProperty(uid + "_balance");
if (!balance) balance = 0;

// reseller
let teamList = Bot.getProperty("team_list");
if (!Array.isArray(teamList)) teamList = [];

let isReseller = teamList.map(String).includes(uid);
let role = isReseller ? "Reseller" : "User";

// welcome
let msg = "";
if (isReseller) {
  msg =
       "╔══════════════════════╗\n" +
       "✨ <b>WELCOME TO RESELLER PANEL</b> ✨\n" +
       "╚══════════════════════╝\n\n" +
       "👤 Name: " + fullName +
       "\n🪪 Bot ID: #" + botId +
       "\n👑 Role: " + role +
       "\n💰 Balance: ₹" + balance +
       "\n📂 Userid: " + uid +
       "\n\nUse the menu below to manage purchases, stock and balance.";
} else {
  msg =
       "╔══════════════════════╗\n" +
       "✨ <b>WELCOME TO Techno Aabid Store </b> ✨\n" +
       "╚══════════════════════╝\n\n" +
       "👤 <b>Name:</b> " + fullName +
       "\n🆔 <b>Bot ID:</b> #" + botId +
       "\n👑 <b>Role:</b> " + role +
       "\n💰 <b>Balance:</b> ₹" + balance +
       "\n📂 <b>User ID:</b> <code>" + uid + "</code>" +
      "\n\n<i>🚀 Choose an option from the menu below to continue.</i>";
}

// menu
Api.sendMessage({
  text: msg,
  parse_mode: "HTML",
  reply_markup: {
    keyboard: [
      [{ text: "🛒 Purchase Product", style: "primary" }],
      [{ text: "💳 Check Balance", style: "danger" }, { text: "➕ Add Balance", style: "danger" }],
      [{ text: "📦 Check Stock", style: "success" }, { text: "🧾 Purchase History", style: "success" }]
    ],
    resize_keyboard: true
  }
});

// admin notify
Bot.runCommand("/userStarted");
