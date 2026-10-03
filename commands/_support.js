/*CMD
  command: /support
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

Api.sendMessage({
  text:
"🛠 <b>SUPPORT</b>\n\n" +

"👇 <b>हिंदी (Hindi)</b> 👇\n\n" +
"अगर आपको कोई समस्या, सवाल या मदद चाहिए तो नीचे दिए गए सपोर्ट बटन पर क्लिक करें।\n" +
"हम जल्द से जल्द आपकी सहायता करेंगे।\n\n" +

"👇 <b>English</b> 👇\n\n" +
"If you have any problem, question, or need help, click the support button below.\n" +
"We will assist you as soon as possible.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📩 Contact Admin For Support",
          url: "https://t.me/technoaabid"
        }
      ]
    ]
  }
});
