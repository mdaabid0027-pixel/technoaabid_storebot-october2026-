import { Telegraf, Markup } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);

const db = new Map();

const ENGINES = {
  snake: {
    name: "🐍 Snake Engine",
    games: ["8 Ball Pool", "Carrom", "Soccer"],
    durations: ["3 Days", "10 Days", "30 Days", "90 Days"],
  },
  kos: {
    name: "🚀 Kos Engine",
    games: ["8 Ball Pool", "Carrom"],
    durations: ["1 Day", "7 Days", "15 Days", "30 Days"],
  },
  aimai: {
    name: "🎯 AimAI Engine",
    games: ["8 Ball Pool", "Carrom"],
    durations: ["1 Day", "3 Days", "7 Days", "15 Days", "30 Days", "90 Days"],
  },
  shinigami: {
    name: "👹 Shinigami",
    games: ["Carrom"],
    durations: ["1 Day", "3 Days", "7 Days", "15 Days", "30 Days", "90 Days"],
  },
};

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getBalance(uid) {
  return Number(db.get(`${uid}_balance`) || 0);
}

function mainMenu() {
  return Markup.keyboard([
    ["🛒 Purchase Product"],
    ["💳 Check Balance", "➕ Add Balance"],
    ["📦 Check Stock", "🧾 Purchase History"],
  ]).resize();
}

function engineMenu() {
  return Markup.inlineKeyboard([
    [{ text: "🐍 Snake Engine", callback_data: "engine_snake" }],
    [{ text: "🚀 Kos Engine", callback_data: "engine_kos" }],
    [{ text: "🎯 AimAI Engine", callback_data: "engine_aimai" }],
    [{ text: "👹 Shinigami", callback_data: "engine_shinigami" }],
  ]);
}

// START
bot.start(async (ctx) => {
  const uid = String(ctx.from.id);
  const name = [
    ctx.from.first_name || "User",
    ctx.from.last_name || "",
  ].filter(Boolean).join(" ");

  const msg =
    "✨ <b>WELCOME TO TECHNO AABID STORE</b> ✨\n\n" +
    `👤 <b>Name:</b> ${escapeHTML(name)}\n` +
    `🆔 <b>User ID:</b> <code>${uid}</code>\n` +
    `💰 <b>Balance:</b> ₹${getBalance(uid).toFixed(2)}\n\n` +
    "🚀 Select an option from the menu below.";

  await ctx.replyWithHTML(msg, mainMenu());
});

// CHECK BALANCE
bot.hears("💳 Check Balance", async (ctx) => {
  const balance = getBalance(String(ctx.from.id));
  await ctx.reply(`💰 Your current balance: ₹${balance.toFixed(2)}`);
});

// PURCHASE MENU
bot.hears("🛒 Purchase Product", async (ctx) => {
  await ctx.replyWithHTML(
    "<b>🛒 Select Your Engine</b>\n\nChoose an engine:",
    engineMenu()
  );
});

// SELECT ENGINE
bot.action(/^engine_(snake|kos|aimai|shinigami)$/, async (ctx) => {
  await ctx.answerCbQuery();

  const key = ctx.match[1];
  const engine = ENGINES[key];

  if (!engine) {
    return ctx.reply("❌ Engine not found.");
  }

  const buttons = engine.games.map((game, index) => [
    {
      text: game,
      callback_data: `game_${key}_${index}`,
    },
  ]);

  buttons.push([
    { text: "⬅️ Back to Engines", callback_data: "back_engines" },
  ]);

  await ctx.replyWithHTML(
    `<b>${engine.name}</b>\n\n🎮 Select your game:`,
    Markup.inlineKeyboard(buttons)
  );
});

// BACK TO ENGINES
bot.action("back_engines", async (ctx) => {
  await ctx.answerCbQuery();

  await ctx.replyWithHTML(
    "<b>🛒 Select Your Engine</b>",
    engineMenu()
  );
});

// SELECT GAME
bot.action(/^game_(snake|kos|aimai|shinigami)_(\d+)$/, async (ctx) => {
  await ctx.answerCbQuery();

  const key = ctx.match[1];
  const index = Number(ctx.match[2]);
  const engine = ENGINES[key];
  const game = engine?.games[index];

  if (!game) {
    return ctx.reply("❌ Invalid game selection. Please try again.");
  }

  const uid = String(ctx.from.id);

  db.set(`${uid}_engine`, key);
  db.set(`${uid}_game`, game);

  const buttons = engine.durations.map((duration, index) => [
    {
      text: duration,
      callback_data: `duration_${key}_${index}`,
    },
  ]);

  buttons.push([
    { text: "⬅️ Back to Games", callback_data: `engine_${key}` },
  ]);

  await ctx.replyWithHTML(
    `🎮 <b>Game:</b> ${escapeHTML(game)}\n\n⏳ Select a plan:`,
    Markup.inlineKeyboard(buttons)
  );
});

// SELECT DURATION
bot.action(/^duration_(snake|kos|aimai|shinigami)_(\d+)$/, async (ctx) => {
  await ctx.answerCbQuery();

  const key = ctx.match[1];
  const index = Number(ctx.match[2]);
  const engine = ENGINES[key];
  const duration = engine?.durations[index];

  if (!duration) {
    return ctx.reply("❌ Invalid plan selection.");
  }

  const uid = String(ctx.from.id);
  const game = db.get(`${uid}_game`) || "Not selected";

  db.set(`${uid}_duration`, duration);

  await ctx.replyWithHTML(
    "✅ <b>Selection Saved</b>\n\n" +
    `⚙️ <b>Engine:</b> ${engine.name}\n` +
    `🎮 <b>Game:</b> ${escapeHTML(game)}\n` +
    `⏳ <b>Plan:</b> ${escapeHTML(duration)}\n\n` +
    "ℹ️ Price, live stock and checkout are not connected yet."
  );
});

// ADD BALANCE
bot.hears("➕ Add Balance", async (ctx) => {
  await ctx.reply(
    "➕ Add Balance\n\nPayment verification is not connected yet. Please contact the store admin."
  );
});

// CHECK STOCK
bot.hears("📦 Check Stock", async (ctx) => {
  await ctx.reply(
    "📦 Stock\n\nLive stock will be shown after connecting the product database."
  );
});

// PURCHASE HISTORY
bot.hears("🧾 Purchase History", async (ctx) => {
  const uid = String(ctx.from.id);
  const history = db.get(`${uid}_history`) || [];

  if (history.length === 0) {
    return ctx.reply("🧾 No purchase history found.");
  }

  await ctx.reply(
    "🧾 Purchase History\n\n" +
    history.map((item, index) => `${index + 1}. ${item}`).join("\n")
  );
});

// VERCEL WEBHOOK HANDLER
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({
      status: "Techno Aabid Store bot endpoint is running",
    });
  }

  try {
    await bot.handleUpdate(req.body);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return res.status(500).json({ ok: false });
  }
}
