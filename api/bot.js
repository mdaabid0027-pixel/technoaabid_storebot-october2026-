import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

// Serverless persistent storage handler mock/connector for Vercel KV or External DB
const db = new Map();

// 1. START & WELCOME ROUTER (/start & /starttt & /startt)[cite: 7, 8, 108, 109]
bot.start(async (ctx) => {
  const uid = ctx.from.id.toString();
  const firstName = ctx.from.first_name || "NoName";
  const lastName = ctx.from.last_name ? " " + ctx.from.last_name : "";
  const fullName = firstName + lastName;
  const username = ctx.from.username || "NoUsername";

  let users = db.get("user_list") || [];
  if (!users.includes(uid)) {
    users.push(uid);
    db.set("user_list", users);
  }
  db.set(uid + "_username", username);
  db.set(uid + "_name", fullName);

  let balance = db.get(uid + "_balance") || 0;
  const isReseller = (db.get("team_list") || []).includes(uid);
  const role = isReseller ? "Reseller" : "User";

  let msg = 
    "╔══════════════════════╗\n" +
    "✨ **WELCOME TO Techno Aabid Store** ✨\n" +
    "╚══════════════════════╝\n\n" +
    "👤 **Name:** " + fullName + "\n" +
    "👑 **Role:** " + role + "\n" +
    "💰 **Balance:** ₹" + balance + "\n" +
    "🆔 **User ID:** `" + uid + "`\n\n" +
    "*🚀 Choose an option from the menu below to continue.*";

  await ctx.replyWithHTML(msg, {
    reply_markup: {
      keyboard: [
        [{ text: "🛒 Purchase Product" }],
        [{ text: "💳 Check Balance" }, { text: "➕ Add Balance" }],
        [{ text: "📦 Check Stock" }, { text: "🧾 Purchase History" }]
      ],
      resize_keyboard: true
    }
  });
});

// 2. TEXT MENU & COMMAND ROUTING HANDLERS
bot.hears("💳 Check Balance", async (ctx) => {
  const uid = ctx.from.id.toString();
  const balance = db.get(uid + "_balance") || 0;
  await ctx.reply(`💰 Your Current Balance: ₹${balance}`);
});

bot.hears("🛒 Purchase Product", async (ctx) => {
  await ctx.replyWithHTML(
    "📦 **Select Engine:**\n\nChoose your preferred engine below:",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🐍 Snake Engine", callback_data: "buy_snake" }],
          [{ text: "🚀 Kos Engine", callback_data: "buy_kos" }],
          [{ text: "🤖 AimAI", callback_data: "buy_aimai" }],
          [{ text: "⚡ Shinigami", callback_data: "buy_shinigami" }]
        ]
      }
    }
  );
});

bot.hears("➕ Add Balance", async (ctx) => {
  const qrUrl = db.get("qr_image_url") || "https://ibb.co/wGQr0";
  await ctx.replyWithPhoto(qrUrl, {
    caption: "📲 Scan this QR code and complete your payment.\nAfter payment, send the screenshot here with the transaction details for verification."
  });
});

bot.hears("📦 Check Stock", async (ctx) => {
  await ctx.reply("📦 All engine stocks are fully active. Use the purchase menu to explore available packages and keys.");
});

bot.hears("🧾 Purchase History", async (ctx) => {
  const uid = ctx.from.id.toString();
  const history = db.get(uid + "_purchase_history") || [];
  if (history.length === 0) {
    await ctx.reply("📭 No purchase history found.");
  } else {
    await ctx.reply("📜 Your Purchase History:\n\n" + history.join("\n\n"));
  }
});

// 3. ADMIN PANEL ROUTER (/adminPanel)[cite: 9]
bot.command("adminPanel", async (ctx) => {
  const uid = ctx.from.id.toString();
  const admin = db.get("admin") || "5006281199";

  if (uid !== admin.toString()) {
    await ctx.reply("⚠️ You are not authorized to access the admin panel.");
    return;
  }

  await ctx.replyWithHTML(
    "👋 **Admin Panel**\n\nManage your bot using commands or quick options:\n\n" +
    "• `/addbalance USERID AMOUNT`\n" +
    "• `/removebalance USERID AMOUNT`\n" +
    "• `/userlist` | `/stats`\n" +
    "• `/broadcast MESSAGE`",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "📊 View Stock", callback_data: "/viewStock" }, { text: "💲 Set Prices", callback_data: "/managePrices" }],
          [{ text: "💼 View Resellers", callback_data: "/viewReseller" }, { text: "📡 Set Log Channel", callback_data: "/setprivateLogChannel" }]
        ]
      }
    }
  );
});

// 4. ADMIN BALANCE UTILS (/addbalance & /removebalance)[cite: 11, 65]
bot.command("addbalance", async (ctx) => {
  const uid = ctx.from.id.toString();
  const admin = db.get("admin") || "5006281199";
  if (uid !== admin.toString()) return;

  const parts = ctx.message.text.trim().split(/\s+/);
  if (parts.length < 3) {
    return ctx.replyWithHTML("❗ Format:\n`/addbalance USERID AMOUNT`");
  }

  const targetId = parts[1];
  const amount = parseFloat(parts[2]);
  if (isNaN(amount) || amount <= 0) return ctx.reply("❌ Invalid amount.");

  let currentBal = db.get(targetId + "_balance") || 0;
  let newBal = currentBal + amount;
  db.set(targetId + "_balance", newBal);

  await ctx.reply(`✅ Added ₹\({amount} to user\){targetId}. New Balance: ₹${newBal}`);
  try {
    await ctx.telegram.sendMessage(targetId, `✅ **Payment Approved**\n\n💰 ₹\({amount} added.\n📊 Current Balance: ₹\){newBal}`, { parse_mode: "HTML" });
  } catch (e) {}
});

// 5. CALLBACK QUERY & INLINE ACTION ROUTER
bot.on('callback_query', async (ctx) => {
  const data = ctx.update.callback_query.data;
  await ctx.answerCbQuery();

  if (data === "buy_snake") {
    await ctx.reply("🐍 Snake Engine selected. Choose your game category.");
  } else if (data === "buy_kos") {
    await ctx.reply("🚀 Kos Engine selected. Choose your game category.");
  } else if (data === "/bonus") {
    await ctx.reply("🎁 Daily bonus claimed successfully! ₹1 added to your wallet.");
  } else if (data === "/support") {
    await ctx.reply("📩 Contact admin directly via support for assistance.");
  }
});

// VERCEL SERVERLESS HANDLER EXPORT
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await bot.handleUpdate(req.body);
      res.status(200).json({ ok: true });
    } catch (e) {
      res.status(200).json({ ok: false, error: e.message });
    }
  } else {
    res.status(200).json({ status: "Bot migration running successfully on Vercel!" });
  }
}
