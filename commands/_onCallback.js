/*CMD
  command: /onCallback
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
command: /onCallback
*/

if (!request.data) return;

let data = request.data;

// =========================
// APPROVE CLICK → ASK AMOUNT
// =========================
if (data.startsWith("askamount_")) {

  let targetId = data.replace("askamount_", "");

  // Store target user
  Bot.setProperty("pending_add_user", targetId, "string");

  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "Enter amount"
  });

  Api.sendMessage({
    chat_id: request.message.chat.id,
    text:
      "💰 Enter Amount to Add\n\n" +
      "कितना बैलेंस जोड़ना है?\n\n" +
      "Type amount now:",
  });

  Bot.runCommand("/waitAmount");

  return;
}
