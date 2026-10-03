/*CMD
  command: /startbroadcast
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
command: /startbroadcast
need_reply: false
*/

let admin = Bot.getProperty("admin");

if(user.telegramid != admin){

return Bot.sendMessage(
"❌ Only admin allowed."
);

}

let msgId =
Bot.getProperty("broadcast_msg_id");

let chatId =
Bot.getProperty("broadcast_chat_id");

if(!msgId || !chatId){

return Bot.sendMessage(
"❌ Pahle /setbroadcast karo!"
);

}

// total users count

let total = 0;

for(let i = 1; i <= 100; i++){

let key =
(i === 1)
? "user_list"
: "user_list_" + i;

let list =
Bot.getProperty(key);

if(Array.isArray(list)){

total += list.length;

}

}

if(total === 0){

return Bot.sendMessage(
"❌ No users found."
);

}

// start broadcast

Bot.setProperty(
"broadcast_list_no",
1,
"integer"
);

Bot.setProperty(
"broadcast_index",
0,
"integer"
);

Bot.setProperty(
"broadcast_total",
total,
"integer"
);

Bot.sendMessage(
"📤 Broadcast Started\n\n" +
"👥 Total Users: " + total
);

Bot.run({
command: "/broadcastWorker",
run_after: 1
});
