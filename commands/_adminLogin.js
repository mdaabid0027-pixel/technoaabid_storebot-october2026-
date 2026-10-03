/*CMD
  command: /adminLogin
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
  command: /adminLogin
  aliases: /login, /setting
  folder: Admin Panel
CMD*/

var adminList = [5006281199];   // REAL ADMIN IDs
var userID = user.telegramid;
var adminID = 5006281199;       // Notification receiver
var botLink = "@" + bot.name;

// ✅ If user is admin
if (adminList.includes(userID)) {

  Bot.setProperty("admin", userID, "integer");

  Api.sendMessage({
    text:
      "<b>✅ Admin Login Successful</b>\n\n" +
      "👤 <b>Admin ID:</b> <code>" + userID + "</code>\n" +
      "👉 Access admin panel using /adminPanel",
    parse_mode: "HTML"
  });

} else {

  // ❌ Not admin → notify real admin
  var username = user.username ? "@" + user.username : "No username";

  Api.sendMessage({
    chat_id: adminID,
    text:
      "🚨 <b>Unauthorized Admin Login Attempt</b>\n\n" +
      "👤 <b>Username:</b> " + username + "\n" +
      "🆔 <b>User ID:</b> <code>" + userID + "</code>",
    parse_mode: "HTML"
  });

  // Message to user
  Api.sendMessage({
    text:
      "⚠️ <i>You are not authorized to access the admin panel.</i>",
    parse_mode: "HTML"
  });
}

