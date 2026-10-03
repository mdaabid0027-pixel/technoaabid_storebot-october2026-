/*CMD
  command: /broadcastSend
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
command: /broadcastSend
*/

let users =
Bot.getProperty("broadcast_users") || [];

let index =
Bot.getProperty("broadcast_index") || 0;

let text =
Bot.getProperty("broadcast_text") || "";

if (
!Array.isArray(users) ||
users.length === 0
) {
  return Bot.sendMessage(
    "❌ No users found."
  );
}

// ================= BATCH =================

let batch = 10;

let end =
Math.min(
  index + batch,
  users.length
);

for (
let i = index;
i < end;
i++
) {

  try {

    Api.sendMessage({
      chat_id: users[i],
      text: text
    });

  } catch(e) {

  }

}

// ================= SAVE NEXT =================

Bot.setProperty(
  "broadcast_index",
  end,
  "integer"
);

// ================= CONTINUE =================

if (end < users.length) {

  Bot.run({
    command: "/broadcastSend",
    run_after: 2
  });

} else {

  Bot.sendMessage(
    "✅ Broadcast Complete!\n\n" +
    "📤 Sent to: " +
    users.length +
    " users."
  );

  // clear

  Bot.setProperty(
    "broadcast_index",
    0,
    "integer"
  );

  Bot.setProperty(
    "broadcast_users",
    [],
    "json"
  );

}
