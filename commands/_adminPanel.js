/*CMD
  command: /adminPanel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER
/userhistory USERID
/userdeposit Userid "👉 check deposit Recieved of user"
/paymentstats "👉 check Bot All Recieved Payment ✅
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*CMD
command: /adminPanel
folder: Admin Panel
*/

let admin = Bot.getProperty("admin");
let userId = user.telegramid;
let realAdmin = 5006281199;
let botLink = "@" + bot.name;

if (userId == admin) {

let adminName = user.first_name;

let text =
"👋 **Hello " + adminName + "**\n\n" +
"Welcome to **Admin Panel** of " + botLink + "\n\n" +
"Manage your bot from options below:";

let buttons = [

[
{ text: "📦 Upload Snake Stock", callback_data: "/stockSnakeEngine" },
{ text: "📦 Upload Kos Stock", callback_data: "/stockKosEngine" }
],

[
{ text: "📦 Upload AimAi Stock", callback_data: "/stockAimAI" },
{ text: "📦 Upload Shinigami Stock", callback_data: "/stockShinigami" }
],

[
{ text: "📊 View Stock", callback_data: "/viewStock" },
{ text: "💲 Set User Price", callback_data: "/managePrices" }
],

[
{ text: "💼 View Resellers", callback_data: "/viewReseller" },
{ text: "🔐 Add Reseller", callback_data: "/addreseller" }
],

[
{ text: "🚫 Remove Reseller", callback_data: "/removereseller" },
{ text: "➕ Add Balance", callback_data: "/addbalance" }
],

[
{ text: "➖ Remove Balance", callback_data: "/removebalance" },
{ text: "📄 Change QR", callback_data: "/changeQR" }
],

[
{ text: "📡 Set Log Channel", callback_data: "/setlogchannel" },
{ text: "🚨 Set Alert Channel", callback_data: "/setalertchannel" }
],

[
{ text: "📢 Set User Log Chan", callback_data: "/setUserLogChannel" },
{ text: "🔒 Set Private Log Chan", callback_data: "/setprivateLogChannel" }
]

];

Api.sendMessage({
text: text,
reply_markup: { inline_keyboard: buttons },
parse_mode: "HTML"
});

} else {

let username = user.username ? "@" + user.username : "NoUsername";

Api.sendMessage({
chat_id: realAdmin,
text:
"🚨 **Unauthorized Admin Panel Access Attempt**\n\n" +
"👤 Username: " + username +
"\n🆔 ID: `" + userId + "`",
parse_mode: "HTML"
});

Api.sendMessage({
text: "⚠️ You are not authorized to access admin panel.",
parse_mode: "HTML"
});

}
