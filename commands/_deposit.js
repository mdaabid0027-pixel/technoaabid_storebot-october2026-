/*CMD
  command: /deposit
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let upi = "technoaabid@fam"

// API Call
HTTP.get({
  url: "https://anujbots.xyz/api/qr.php?upi=" + upi,
  success: "/QR"
})
