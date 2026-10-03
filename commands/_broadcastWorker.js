/*CMD
  command: /broadcastWorker
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
command: /broadcastWorker
need_reply: false
*/

let listNo =
Bot.getProperty("broadcast_list_no") || 1;

let index =
Bot.getProperty("broadcast_index") || 0;

let msgId =
Bot.getProperty("broadcast_msg_id");

let chatId =
Bot.getProperty("broadcast_chat_id");

// current list
let key =
(listNo === 1)
? "user_list"
: "user_list_" + listNo;

let users =
Bot.getProperty(key);

if(!Array.isArray(users)){
  users = [];
}

// next list
if(index >= users.length){

  listNo++;

  let nextKey =
  (listNo === 1)
  ? "user_list"
  : "user_list_" + listNo;

  let nextUsers =
  Bot.getProperty(nextKey);

  if(!Array.isArray(nextUsers)){

    Bot.sendMessage(
      "✅ Broadcast Complete!"
    );

    return;
  }

  Bot.setProperty(
    "broadcast_list_no",
    listNo,
    "integer"
  );

  Bot.setProperty(
    "broadcast_index",
    0,
    "integer"
  );

  Bot.run({
    command: "/broadcastWorker",
    run_after: 1
  });

  return;
}

// send 10 users
let batch = 10;

for(
let i = index;
i < index + batch &&
i < users.length;
i++
){

  Api.forwardMessage({
    chat_id: users[i],
    from_chat_id: chatId,
    message_id: msgId,
    on_error: "/skipError"
  });

}

Bot.setProperty(
"broadcast_index",
index + batch,
"integer"
);

Bot.run({
command: "/broadcastWorker",
run_after: 2
});
