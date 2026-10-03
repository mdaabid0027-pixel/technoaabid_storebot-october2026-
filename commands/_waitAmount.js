/*CMD
  command: /waitAmount
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
command: /waitAmount
need_reply: true
*/

let amount = parseFloat(message);
if (isNaN(amount) || amount <= 0) {
  return Bot.sendMessage("❌ Invalid amount. Please enter valid number.");
}

let targetId = Bot.getProperty("pending_add_user");
if (!targetId) return Bot.sendMessage("User not found.");

let balKey = targetId + "_balance";
let oldBalance = Number(Bot.getProperty(balKey)) || 0;
let newBalance = oldBalance + amount;

Bot.setProperty(balKey, newBalance, "float");

// Clear temp
Bot.setProperty("pending_add_user", null, "string");

// Notify User
Api.sendMessage({
  chat_id: targetId,
  text:
    "✅ Balance Added Successfully!\n\n" +
    "₹" + amount.toFixed(2) + " has been added.\n" +
    "New Balance: ₹" + newBalance.toFixed(2)
});

// Notify Admin
Bot.sendMessage(
  "✅ Done!\n\nAdded ₹" + amount.toFixed(2) +
  "\nNew Balance: ₹" + newBalance.toFixed(2)
);
