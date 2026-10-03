/*CMD
  command: /QR
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let res = JSON.parse(content)

if (res.status == "success") {

  let order_id = res.data.order_id
  let qr = res.data.qr_url
  let expire = res.data.expires_at_ist

  Api.sendPhoto({
    photo: qr,
    caption:
      "💳 *Deposit Payment*\n\n" +
      "⏳ Expire at: " + expire + "\n\n" +
      "📲 Scan QR & Pay",
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "✅ Verify Payment", callback_data: "/check " + order_id }
        ]
      ]
    }
  })

} else {
  Bot.sendMessage("QR generate failed")
}
