/*CMD
  command: /reject
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// The user ID is passed in the params
if (!params) { return; }

let userId = params;

// 1. Alert the user
Bot.sendMessageToChatWithId(userId, "❌ *Payment Rejected*\nYour recent payment proof was declined by the administrator. Please contact support if you think this is a mistake.");

// 2. Notify the admin
Bot.sendMessage("Payment for User " + userId + " has been rejected.");
