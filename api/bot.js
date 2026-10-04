import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

// Simple memory store for Vercel serverless environment
const db = new Map();

bot.start(async (ctx) => {
  try {
    const uid = ctx.from.id.toString();
    const firstName = ctx.from.first_name || "NoName";
    const lastName = ctx.from.last_name ? " " + ctx.from.last_name : "";
    const fullName = firstName + lastName;

    let balance = db.get(uid + "_balance") || 0;

    let msg = 
      "╔══════════════════════╗\n" +
      "✨ **WELCOME TO Techno Aabid Store** ✨\n" +
      "╚══════════════════════╝\n\n" +
      "👤 **Name:** " + fullName + "\n" +
      "🆔 **User ID:** `" + uid + "`\n" +
      "💰 **Balance:** ₹" + balance + "\n\n" +
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
  } catch (err) {
    console.error("Error in /start handler:", err);
  }
});

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
          [{ text: "🚀 Kos Engine", callback_data: "buy_kos" }]
        ]
      }
    }
  );
});

// Vercel Serverless Function Handler
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await bot.handleUpdate(req.body);
      return res.status(200).json({ ok: true });
    } catch (e) {
      console.error("Webhook processing error:", e);
      return res.status(200).json({ ok: false, error: e.message });
    }
  } else {
    return res.status(200).json({ status: "Bot is running on Vercel!" });
  }
}
