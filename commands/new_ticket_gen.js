/*CMD
  command: new_ticket_gen
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

Api.deleteMessage({ message_id: request.message_id });

var characters =
  "1234567890ABCDEFGHIJKLUVWXYZ1234567890abcdefghijkluvwxyz";

function generateString(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return result;
}

// Generate new key
var rr = generateString(18);
let free = new Date().toLocaleString("en-US", {
  timeZone: "Asia/kolkata"})

var dt = Libs.DateTimeFormat.format(free, "dd/mm/yyyy");
Bot.setProperty({
    name: rr,
    value: {
      user: user.first_name,
      date: dt,
      userid: user.telegramid,
      admreply: "♈ Admin Not Replied.",
      supportmessage: message
    }
  })

var tickets = User.getProperty("tickets") || []; // Retrieve existing tickets array or create a new one
tickets.push(rr); // Add the new ticket ID to the tickets array

User.setProperty("tickets", tickets, "json"); // Store the updated tickets array in user's property


var admin_chat = Bot.getProperty("admin_chat");

if(!admin_chat){
  Bot.sendMessage("Sorry. Bot have not admin now");
  return // exit
}
 
var user_link = Libs.commonLib.getLinkFor(user)

/*msg = "Message from: " + user_link +
     "\n" +
      message +
     "\n/reply" + user.telegramid;
*/
var txt = "*📣 New Support Message Came From User* "+user_link+"\n\n"+message+""
Bot.sendInlineKeyboardToChatWithId(
  admin_chat, [{title:"↩️ Reply to "+user.first_name+"", command:"/repply "+rr+""}] , 
  txt
);

Api.forwardMessage({ 
 chat_id: admin_chat,
 from_chat_id: user.telegramid,
 message_id: request.message_id
});




var mm = User.getProperty("mm");
Api.editMessageText({
  message_id: mm,
  text: "<b>➡️ Message was sent successfully. You will receive a reply shortly.</b>\n\n<b>✴️ Ticket ID:</b> <code>"+rr+"</>",
  parse_mode: "html",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [
        { text: "◀️ Return", callback_data: "Support" }
      ]
    ]
  }
});
return;
