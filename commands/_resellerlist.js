/*CMD
  command: /resellerlist
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
command: /resellerlist
folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){

Bot.sendMessage("❌ Only admin allowed.");
return;

}

// load reseller ids
let ids =
Bot.getProperty("reseller_add_targets") || [];

// no reseller
if(ids.length == 0){

Bot.sendMessage(
"⚠️ No reseller found."
);

return;

}

// format ids
ids = ids.map(String);

// build text
let text =
"👥 <b>Reseller List</b>\n\n";

for(let i = 0; i < ids.length; i++){

text +=
(i + 1) +
". <code>" +
ids[i] +
"</code>\n";

}

// add reusable addreseller command
text +=
"\n\n━━━━━━━━━━━━━━\n\n" +

"<b>📋 Reuse Command</b>\n\n" +

"<code>/addreseller " +
ids.join(" ") +
"</code>";

// send
Api.sendMessage({
parse_mode:"HTML",
text:text
});
