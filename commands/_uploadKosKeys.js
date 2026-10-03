/*CMD
  command: /uploadKosKeys
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: upload kos key
  keyboard: 
  aliases: 
  group: 
CMD*/

/*CMD
command: uploadKosKeys
need_reply: true
*/

let stockKey = Bot.getProperty("kos_upload_target");

if (!stockKey) {
  return Bot.sendMessage("❌ Upload target missing");
}

let stock = Bot.getProperty(stockKey);
if (!Array.isArray(stock)) stock = [];

let newKeys = message
  .split("\n")
  .map(k => k.trim())
  .filter(k => k.length > 0);

stock = stock.concat(newKeys);

Bot.setProperty(stockKey, stock, "json");

Bot.setProperty("kos_upload_target", null);

Bot.sendMessage(
  "✅ Bulk stock uploaded\n\n" +
  "➕ Added: " + newKeys.length +
  "\n📦 Total Stock: " + stock.length
);
