/*CMD
  command: /userStarted
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
command: /userStarted
*/

let admin =
8519564658;

if(!admin){
return;
}

let uid =
user.telegramid.toString();

let botId =
Bot.getProperty(
uid + "_botid"
);

let balance =
Bot.getProperty(
uid + "_balance"
) || 0;

let username =
user.username
? "@" + user.username
: "No Username";

let fullName =
user.first_name +
(user.last_name
? " " + user.last_name
: "");

Api.sendMessage({
chat_id: admin,
text:

"🚀 User Started Bot\n\n" +

"👤 Name: " + fullName +

"\n📛 Username: " + username +

"\n🆔 User ID:\n<code>" + uid + "</code>" +

"\n🪪 Bot ID: #" + botId +

"\n👑 Role: " +
(
(Bot.getProperty("team_list") || [])
.map(String)
.includes(uid)
? "Reseller"
: "User"
) +

"\n💰 Balance: ₹" +
balance,

parse_mode: "HTML"
});
