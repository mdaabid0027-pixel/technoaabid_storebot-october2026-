/*CMD
  command: /viewStock
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
  command: /viewStock
  folder: Admin Panel
*/

let admin = Bot.getProperty("admin");

if (user.telegramid != admin) {
  return Api.sendMessage({
    text: "⚠️ Only admin can view full stock with codes.",
    parse_mode: "HTML"
  });
}


// ================= HELPER =================

function getStock(key) {
  let arr = Bot.getProperty(key);

  if (!arr || !Array.isArray(arr) || arr.length === 0) {
    return {
      count: 0,
      list: "— No stock —"
    };
  }

  let formatted = arr
    .map((c, i) => (i + 1) + ". " + c)
    .join("\n");

  return {
    count: arr.length,
    list: formatted
  };
}


// ================= SNAKE ENGINE =================

// 8BP
let s8_3  = getStock("snake_8bp_3_stock");
let s8_10 = getStock("snake_8bp_10_stock");
let s8_30 = getStock("snake_8bp_30_stock");
let s8_90 = getStock("snake_8bp_90_stock");

// Carrom
let sc_3  = getStock("snake_carrom_3_stock");
let sc_10 = getStock("snake_carrom_10_stock");
let sc_30 = getStock("snake_carrom_30_stock");
let sc_90 = getStock("snake_carrom_90_stock");

// Soccer
let ss_3  = getStock("snake_soccer_3_stock");
let ss_10 = getStock("snake_soccer_10_stock");
let ss_30 = getStock("snake_soccer_30_stock");
let ss_90 = getStock("snake_soccer_90_stock");


// ================= KOS ENGINE =================

// 8BP
let k8_1  = getStock("kos_8bp_1_stock");
let k8_7  = getStock("kos_8bp_7_stock");
let k8_15 = getStock("kos_8bp_15_stock");
let k8_30 = getStock("kos_8bp_30_stock");

// Carrom
let kc_1  = getStock("kos_carrom_1_stock");
let kc_7  = getStock("kos_carrom_7_stock");
let kc_15 = getStock("kos_carrom_15_stock");
let kc_30 = getStock("kos_carrom_30_stock");


// ================= AIMAI =================

// 8BP
let aimai_8_1  = getStock("aimai_8bp_1_stock");
let aimai_8_3  = getStock("aimai_8bp_3_stock");
let aimai_8_7  = getStock("aimai_8bp_7_stock");
let aimai_8_15 = getStock("aimai_8bp_15_stock");
let aimai_8_30 = getStock("aimai_8bp_30_stock");
let aimai_8_90 = getStock("aimai_8bp_90_stock");

// Carrom
let a_1  = getStock("aimai_carrom_1_stock");
let a_3  = getStock("aimai_carrom_3_stock");
let a_7  = getStock("aimai_carrom_7_stock");
let a_15 = getStock("aimai_carrom_15_stock");
let a_30 = getStock("aimai_carrom_30_stock");
let a_90 = getStock("aimai_carrom_90_stock");


// ================= SHINIGAMI ENGINE =================

// 8BP
let shin_8_1  = getStock("shinigami_8bp_1_stock");
let shin_8_7  = getStock("shinigami_8bp_7_stock");
let shin_8_15 = getStock("shinigami_8bp_15_stock");
let shin_8_30 = getStock("shinigami_8bp_30_stock");

// Carrom
let shin_c_1  = getStock("shinigami_carrom_1_stock");
let shin_c_7  = getStock("shinigami_carrom_7_stock");
let shin_c_15 = getStock("shinigami_carrom_15_stock");
let shin_c_30 = getStock("shinigami_carrom_30_stock");


// ================= FINAL MESSAGE =================

let msg =
"**📦 FULL STOCK LIST**\n\n" +


// ================= SNAKE =================

"**🐍 Snake Engine**\n\n" +

"**🎮 8BP**\n" +
"3D (" + s8_3.count + ")\n" + s8_3.list + "\n\n" +
"10D (" + s8_10.count + ")\n" + s8_10.list + "\n\n" +
"30D (" + s8_30.count + ")\n" + s8_30.list + "\n\n" +
"90D (" + s8_90.count + ")\n" + s8_90.list + "\n\n" +

"**🎮 Carrom**\n" +
"3D (" + sc_3.count + ")\n" + sc_3.list + "\n\n" +
"10D (" + sc_10.count + ")\n" + sc_10.list + "\n\n" +
"30D (" + sc_30.count + ")\n" + sc_30.list + "\n\n" +
"90D (" + sc_90.count + ")\n" + sc_90.list + "\n\n" +

"**🎮 Soccer**\n" +
"3D (" + ss_3.count + ")\n" + ss_3.list + "\n\n" +
"10D (" + ss_10.count + ")\n" + ss_10.list + "\n\n" +
"30D (" + ss_30.count + ")\n" + ss_30.list + "\n\n" +
"90D (" + ss_90.count + ")\n" + ss_90.list + "\n\n" +


// ================= KOS =================

"**🚀 Kos Engine**\n\n" +

"**🎮 8BP**\n" +
"1D (" + k8_1.count + ")\n" + k8_1.list + "\n\n" +
"7D (" + k8_7.count + ")\n" + k8_7.list + "\n\n" +
"15D (" + k8_15.count + ")\n" + k8_15.list + "\n\n" +
"30D (" + k8_30.count + ")\n" + k8_30.list + "\n\n" +

"**🎮 Carrom**\n" +
"1D (" + kc_1.count + ")\n" + kc_1.list + "\n\n" +
"7D (" + kc_7.count + ")\n" + kc_7.list + "\n\n" +
"15D (" + kc_15.count + ")\n" + kc_15.list + "\n\n" +
"30D (" + kc_30.count + ")\n" + kc_30.list + "\n\n" +


// ================= AIMAI =================

"**🤖 AimAI**\n\n" +

"**🎮 8BP**\n" +
"1D (" + aimai_8_1.count + ")\n" + aimai_8_1.list + "\n\n" +
"3D (" + aimai_8_3.count + ")\n" + aimai_8_3.list + "\n\n" +
"7D (" + aimai_8_7.count + ")\n" + aimai_8_7.list + "\n\n" +
"15D (" + aimai_8_15.count + ")\n" + aimai_8_15.list + "\n\n" +
"30D (" + aimai_8_30.count + ")\n" + aimai_8_30.list + "\n\n" +
"90D (" + aimai_8_90.count + ")\n" + aimai_8_90.list + "\n\n" +

"**🎮 Carrom**\n" +
"1D (" + a_1.count + ")\n" + a_1.list + "\n\n" +
"3D (" + a_3.count + ")\n" + a_3.list + "\n\n" +
"7D (" + a_7.count + ")\n" + a_7.list + "\n\n" +
"15D (" + a_15.count + ")\n" + a_15.list + "\n\n" +
"30D (" + a_30.count + ")\n" + a_30.list + "\n\n" +
"90D (" + a_90.count + ")\n" + a_90.list + "\n\n" +


// ================= SHINIGAMI =================

"**🥷 Shinigami Engine**\n\n" +

"**🎮 Carrom**\n" +
"1D (" + shin_c_1.count + ")\n" + shin_c_1.list + "\n\n" +
"7D (" + shin_c_7.count + ")\n" + shin_c_7.list + "\n\n" +
"15D (" + shin_c_15.count + ")\n" + shin_c_15.list + "\n\n" +
"30D (" + shin_c_30.count + ")\n" + shin_c_30.list;


Api.sendMessage({
  text: msg,
  parse_mode: "HTML"
});
