import { Telegraf, Markup } from "telegraf";
import { createClient } from "@supabase/supabase-js";

const bot = new Telegraf(process.env.BOT_TOKEN);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ADMIN_ID = "5006281199";
const NOTIFY_ID = "8519564658";

const ENGINES = {
  snake: {
    name: "🐍 Snake Engine",
    games: ["8 Ball Pool", "Carrom", "Soccer"],
    days: [3, 10, 30, 90],
  },
  kos: {
    name: "🚀 Kos Engine",
    games: ["8 Ball Pool", "Carrom"],
    days: [1, 7, 15, 30],
  },
  aimai: {
    name: "🎯 AimAI Engine",
    games: ["8 Ball Pool", "Carrom"],
    days: [1, 3, 7, 15, 30, 90],
  },
  shinigami: {
    name: "👹 Shinigami",
    games: ["Carrom"],
    days: [1, 3, 7, 15, 30, 90],
  },
};

const sessions = new Map();

function isAdmin(ctx) {
  return String(ctx.from?.id) === ADMIN_ID;
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(rows) {
  return Markup.inlineKeyboard(rows);
}

function engineButtons(prefix) {
  return Object.entries(ENGINES).map(([key, engine]) => [
    {
      text: engine.name,
      callback_data: `${prefix}_${key}`,
    },
  ]);
}

function homeButtons() {
  return inline([
    [{ text: "🛒 Purchase Product", callback_data: "buy" }],
    [
      { text: "💰 Balance", callback_data: "balance" },
      { text: "➕ Add Balance", callback_data: "topup" },
    ],
    [
      { text: "📦 Check Stock", callback_data: "stock" },
      { text: "🧾 Purchase History", callback_data: "history" },
    ],
    [{ text: "🏆 Top Key Buyers", callback_data: "leaderboard" }],
    [{ text: "ℹ️ Help", callback_data: "help" }],
  ]);
}

function adminButtons() {
  return inline([
    [
      { text: "➕ Add Stock", callback_data: "admin_stock" },
      { text: "💵 Set User Price", callback_data: "admin_price" },
    ],
    [
      { text: "👥 Add Reseller", callback_data: "admin_reseller" },
      { text: "💳 Add Balance", callback_data: "admin_balance" },
    ],
    [
      { text: "🧾 Set QR", callback_data: "admin_qr" },
      { text: "📊 Sales / Stock", callback_data: "admin_stats" },
    ],
    [
      { text: "🔔 Start Notifications", callback_data: "admin_notify" },
      { text: "📣 Broadcast", callback_data: "admin_broadcast" },
    ],
    [{ text: "🏠 Home", callback_data: "home" }],
  ]);
}

async function getUser(ctx) {
  const uid = String(ctx.from.id);
  const { data, error } = await supabase
    .from("store_users")
    .select("*")
    .eq("telegram_id", uid)
    .maybeSingle();

  if (error) throw error;

  if (data) {
    await supabase.from("store_users").update({
      full_name: [
        ctx.from.first_name || "",
        ctx.from.last_name || "",
      ].join(" ").trim(),
      username: ctx.from.username || null,
    }).eq("telegram_id", uid);

    return data;
  }

  const { data: created, error: insertError } = await supabase
    .from("store_users")
    .insert({
      telegram_id: uid,
      full_name: [
        ctx.from.first_name || "",
        ctx.from.last_name || "",
      ].join(" ").trim(),
      username: ctx.from.username || null,
      role: uid === ADMIN_ID ? "admin" : "user",
    })
    .select()
    .single();

  if (insertError) throw insertError;
  return created;
}

async function setting(key, value) {
  if (value === undefined) {
    const { data, error } = await supabase
      .from("store_settings")
      .select("value")
      .eq("key", key)
      .maybeSingle();

    if (error) throw error;
    return data?.value ?? null;
  }

  const { error } = await supabase
    .from("store_settings")
    .upsert({ key, value }, { onConflict: "key" });

  if (error) throw error;
}

async function getProduct(engine, game, days) {
  const { data, error } = await supabase
    .from("store_products")
    .select("*")
    .eq("engine", engine)
    .eq("game", game)
    .eq("duration_days", days)
    .eq("active", true)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function startFlow(ctx, flow, extra = {}) {
  sessions.set(String(ctx.from.id), { flow, ...extra });
}

async function askEngine(ctx, prefix) {
  await ctx.reply(
    "⚙️ Select Engine",
    engineButtons(prefix)
  );
}

async function sendHome(ctx) {
  const user = await getUser(ctx);

  await ctx.replyWithHTML(
    "✨ <b>WELCOME TO TECHNO AABID STORE</b>\n\n" +
    `👤 ${esc(user.full_name || ctx.from.first_name)}\n` +
    `🆔 <code>${ctx.from.id}</code>\n\n` +
    "Choose an option:",
    homeButtons()
  );
}

bot.start(async (ctx) => {
  try {
    await getUser(ctx);
    await sendHome(ctx);

    const notify = await setting("start_notifications");
    if (notify !== false && String(ctx.from.id) !== NOTIFY_ID) {
      await bot.telegram.sendMessage(
        NOTIFY_ID,
        `🔔 New bot start\nName: ${esc(ctx.from.first_name)}\nID: ${ctx.from.id}`
      ).catch(() => {});
    }
  } catch (error) {
    console.error(error);
    await ctx.reply("❌ Temporary error. Please try again.");
  }
});

bot.command("admin", async (ctx) => {
  if (!isAdmin(ctx)) return ctx.reply("⛔ Admin only.");
  await ctx.reply("🛠 Admin Panel", adminButtons());
});

bot.command("cancel", async (ctx) => {
  sessions.delete(String(ctx.from.id));
  await ctx.reply("❌ Current operation cancelled.", homeButtons());
});

bot.command("setqr", async (ctx) => {
  if (!isAdmin(ctx)) return ctx.reply("⛔ Admin only.");
  await startFlow(ctx, "qr");
  await ctx.reply("🧾 Ab QR image bhejo. /cancel se cancel kar sakte ho.");
});

bot.command("addbalance", async (ctx) => {
  if (!isAdmin(ctx)) return ctx.reply("⛔ Admin only.");

  const [, uid, amountText, ...txnParts] = ctx.message.text.split(/\s+/);
  const amount = Number(amountText);
  const txn = txnParts.join(" ").trim();

  if (!uid || !Number.isFinite(amount) || amount <= 0) {
    return ctx.reply(
      "Format:\n/addbalance USER_ID AMOUNT [TXN]\n\nExample:\n/addbalance 123456789 500 TXN123"
    );
  }

  const { data: user, error } = await supabase
    .from("store_users")
    .select("balance")
    .eq("telegram_id", uid)
    .maybeSingle();

  if (error) return ctx.reply("❌ Database error.");
  if (!user) return ctx.reply("❌ User not found. User ko pehle /start karna hoga.");

  const { error: updateError } = await supabase
    .from("store_users")
    .update({ balance: Number(user.balance) + amount })
    .eq("telegram_id", uid);

  if (updateError) return ctx.reply("❌ Balance update failed.");

  await ctx.reply(
    `✅ ₹${amount.toFixed(2)} balance added.\nUser ID: ${uid}` +
    (txn ? `\nTransaction: ${esc(txn)}` : "")
  );

  await bot.telegram.sendMessage(
    uid,
    `💰 Your balance has been credited by ₹${amount.toFixed(2)}.`
  ).catch(() => {});
});

bot.command("addreseller", async (ctx) => {
  if (!isAdmin(ctx)) return ctx.reply("⛔ Admin only.");

  const uid = ctx.message.text.trim().split(/\s+/)[1];

  if (!uid || !/^\d+$/.test(uid)) {
    return ctx.reply("Use: /addreseller USER_ID");
  }

  const { data: user, error } = await supabase
    .from("store_users")
    .select("telegram_id")
    .eq("telegram_id", uid)
    .maybeSingle();

  if (error) return ctx.reply("❌ Database error.");
  if (!user) return ctx.reply("❌ User not found. Ask them to start the bot first.");

  const { error: roleError } = await supabase
    .from("store_users")
    .update({ role: "reseller" })
    .eq("telegram_id", uid);

  if (roleError) return ctx.reply("❌ Could not set reseller role.");

  await startFlow(ctx, "reseller", {
    target: uid,
    engine: null,
    game: null,
    days: null,
  });

  await ctx.reply(
    `👥 Reseller ${uid} added.\nSelect engine for price grid:`,
    engineButtons("rgrid")
  );
});

bot.command("setprice", async (ctx) => {
  if (!isAdmin(ctx)) return ctx.reply("⛔ Admin only.");
  await startFlow(ctx, "price");
  await askEngine(ctx, "pengine");
});

bot.command("addstock", async (ctx) => {
  if (!isAdmin(ctx)) return ctx.reply("⛔ Admin only.");
  await startFlow(ctx, "stock");
  await askEngine(ctx, "sengine");
});

// Main inline callback router
bot.action(
  /^(home|buy|balance|topup|stock|history|leaderboard|help|admin_stock|admin_price|admin_reseller|admin_balance|admin_qr|admin_stats|admin_notify|admin_broadcast)$/,
  async (ctx) => {
    await ctx.answerCbQuery();

    try {
      const action = ctx.match[1];

      if (action === "home") return sendHome(ctx);
      if (action === "buy") return askEngine(ctx, "buyengine");
      if (action === "admin_stock") {
        if (!isAdmin(ctx)) return ctx.reply("⛔ Admin only.");
        sessions.set(String(ctx.from.id), { flow: "stock" });
        return askEngine(ctx, "sengine");
      }
      if (action === "admin_price") {
        if (!isAdmin(ctx)) return ctx.reply("⛔ Admin only.");
        sessions.set(String(ctx.from.id), { flow: "price" });
        return askEngine(ctx, "pengine");
      }
      if (action === "admin_reseller") {
        if (!isAdmin(ctx)) return ctx.reply("Use /addreseller USER_ID");
        return ctx.reply("Use /addreseller USER_ID to open a reseller grid.");
      }
      if (action === "admin_balance") {
        if (!isAdmin(ctx)) return ctx.reply("⛔ Admin only.");
        return ctx.reply("Use /addbalance USER_ID AMOUNT [TXN]");
      }
      if (action === "admin_qr") {
        if (!isAdmin(ctx)) return ctx.reply("⛔ Admin only.");
        sessions.set(String(ctx.from.id), { flow: "qr" });
        return ctx.reply("Send QR image now, or /cancel.");
      }
      if (action === "admin_notify") {
        if (!isAdmin(ctx)) return ctx.reply("⛔ Admin only.");
        const current = await setting("start_notifications");
        await setting("start_notifications", current === false);
        return ctx.reply(
          `🔔 Start notifications: ${current === false ? "ON" : "OFF"}`,
          adminButtons()
        );
      }
      if (action === "admin_broadcast") {
        if (!isAdmin(ctx)) return ctx.reply("⛔ Admin only.");
        sessions.set(String(ctx.from.id), { flow: "broadcast" });
        return ctx.reply("📣 Broadcast message bhejo. /cancel to cancel.");
      }
      if (action === "admin_stats") {
        if (!isAdmin(ctx)) return ctx.reply("⛔ Admin only.");

        const { count: users } = await supabase
          .from("store_users")
          .select("*", { count: "exact", head: true });

        const { count: stock } = await supabase
          .from("store_stock")
          .select("*", { count: "exact", head: true })
          .is("sold_to", null);

        return ctx.reply(
          `📊 Store Stats\nUsers: ${users ?? 0}\nAvailable keys: ${stock ?? 0}`,
          adminButtons()
        );
      }
      if (action === "balance") {
        const user = await getUser(ctx);
        return ctx.reply(`💰 Balance: ₹${Number(user.balance).toFixed(2)}`, homeButtons());
      }
      if (action === "topup") {
        const qr = await setting("payment_qr_file_id");
        if (!qr) return ctx.reply("QR abhi admin ne set nahi kiya.", homeButtons());
        await ctx.replyWithPhoto(qr, {
          caption: "➕ Balance add karne ke liye payment karke admin se contact karein.",
          ...homeButtons(),
        });
        return;
      }
      if (action === "stock") {
        const { data, error } = await supabase
          .from("store_stock")
          .select("product_id")
          .is("sold_to", null);

        if (error) throw error;
        return ctx.reply(`📦 Available keys: ${data.length}`, homeButtons());
      }
      if (action === "history") {
        const { data, error } = await supabase
          .from("store_purchases")
          .select("quantity,total_price,status,created_at,product_id")
          .eq("telegram_id", String(ctx.from.id))
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) throw error;
        if (!data.length) return ctx.reply("🧾 No purchases yet.", homeButtons());

        return ctx.reply(
          "🧾 Recent purchases\n\n" +
          data.map((p, i) =>
            `${i + 1}. ${p.quantity} key(s) — ₹${p.total_price} — ${p.status}`
          ).join("\n"),
          homeButtons()
        );
      }
      if (action === "leaderboard") {
        const { data, error } = await supabase
          .from("store_purchases")
          .select("telegram_id,quantity,status")
          .eq("status", "completed");

        if (error) throw error;

        const totals = {};
        for (const row of data) {
          totals[row.telegram_id] =
            (totals[row.telegram_id] || 0) + Number(row.quantity || 0);
        }

        const ranked = Object.entries(totals)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10);

        if (!ranked.length) {
          return ctx.reply("🏆 Leaderboard abhi empty hai.", homeButtons());
        }

        const ids = ranked.map(([id]) => id);
        const { data: users, error: userError } = await supabase
          .from("store_users")
          .select("telegram_id,full_name,username")
          .in("telegram_id", ids);

        if (userError) throw userError;

        const names = Object.fromEntries(
          users.map(u => [
            u.telegram_id,
            u.full_name || (u.username ? `@${u.username}` : "Buyer"),
          ])
        );

        const medals = ["🥇", "🥈", "🥉"];
        const lines = ranked.map(([id, quantity], i) =>
          `${medals[i] || `${i + 1}.`} ${esc(names[id] || "Buyer")} — <b>${quantity} keys</b>`
        );

        return ctx.replyWithHTML(
          "<b>🏆 TOP KEY BUYERS</b>\n\n" + lines.join("\n"),
          homeButtons()
        );
      }
      if (action === "help") {
        return ctx.reply(
          "Use Purchase Product to choose an available plan. For balance top-ups, follow the QR instructions.",
          homeButtons()
        );
      }
    } catch (error) {
      console.error(error);
      await ctx.reply("❌ Something went wrong. Please try again.");
    }
  }
);

// Engine selection for buying/admin workflows
bot.action(/^(buyengine|sengine|pengine|rgrid)_(snake|kos|aimai|shinigami)$/, async (ctx) => {
  await ctx.answerCbQuery();

  const [, prefix, key] = ctx.match;
  const engine = ENGINES[key];
  const uid = String(ctx.from.id);
  const session = sessions.get(uid) || {};

  if (prefix !== "buyengine" && !isAdmin(ctx)) {
    return ctx.reply("⛔ Admin only.");
  }

  if (prefix === "rgrid" && session.flow !== "reseller") {
    return ctx.reply("❌ Start with /addreseller USER_ID");
  }

  sessions.set(uid, {
    ...session,
    engine: key,
    game: null,
    days: null,
  });

  const buttons = engine.games.map((game, i) => [{
    text: game,
    callback_data: `${prefix === "buyengine" ? "buygame" : prefix === "sengine" ? "sgame" : prefix === "pengine" ? "pgame" : "rgame"}_${key}_${i}`,
  }]);

  buttons.push([{ text: "⬅️ Home", callback_data: "home" }]);

  await ctx.reply(
    `${engine.name}\nSelect game:`,
    Markup.inlineKeyboard(buttons)
  );
});

// Game selection
bot.action(/^(buygame|sgame|pgame|rgame)_(snake|kos|aimai|shinigami)_(\d+)$/, async (ctx) => {
  await ctx.answerCbQuery();

  const [, prefix, key, indexText] = ctx.match;
  const engine = ENGINES[key];
  const game = engine?.games[Number(indexText)];

  if (!game) return ctx.reply("❌ Invalid game.");

  if (prefix !== "buygame" && !isAdmin(ctx)) {
    return ctx.reply("⛔ Admin only.");
  }

  const uid = String(ctx.from.id);
  const session = sessions.get(uid) || {};

  sessions.set(uid, { ...session, engine: key, game });

  const buttons = engine.days.map(days => [{
    text: `${days} Days`,
    callback_data: `${prefix === "buygame" ? "buyday" : prefix === "sgame" ? "sday" : prefix === "pgame" ? "pday" : "rday"}_${key}_${days}`,
  }]);

  buttons.push([{ text: "⬅️ Back", callback_data: `${prefix === "buygame" ? "buyengine" : prefix === "sgame" ? "sengine" : prefix === "pgame" ? "pengine" : "rgrid"}_${key}` }]);

  await ctx.reply(
    `🎮 ${game}\nSelect duration:`,
    Markup.inlineKeyboard(buttons)
  );
});

// Duration selection
bot.action(/^(sday|pday|rday|buyday)_(snake|kos|aimai|shinigami)_(\d+)$/, async (ctx) => {
  await ctx.answerCbQuery();

  const [, prefix, key, daysText] = ctx.match;
  const days = Number(daysText);
  const engine = ENGINES[key];
  const uid = String(ctx.from.id);
  const session = sessions.get(uid) || {};

  if (prefix !== "buyday" && !isAdmin(ctx)) {
    return ctx.reply("⛔ Admin only.");
  }

  if (!engine.days.includes(days) || !session.game) {
    return ctx.reply("❌ Invalid selection. Start again.");
  }

  session.engine = key;
  session.days = days;

  if (prefix === "sday") {
    sessions.set(uid, { ...session, flow: "stock_codes" });
    return ctx.reply(
      `📦 Send license key(s) for ${engine.name} / ${session.game} / ${days} Days.\nSend one key per line.`
    );
  }

  if (prefix === "pday") {
    sessions.set(uid, { ...session, flow: "price_value" });
    return ctx.reply("💵 Ab normal user price INR mein bhejo. Example: 199");
  }

  if (prefix === "rday") {
    sessions.set(uid, { ...session, flow: "reseller_value" });
    return ctx.reply(
      `💵 ${session.target} ke liye reseller price bhejo (INR).\n${engine.name} / ${session.game} / ${days} Days`
    );
  }

  const product = await getProduct(key, session.game, days);
  if (!product) return ctx.reply("❌ Ye plan abhi configured nahi hai.");

  const { count, error } = await supabase
    .from("store_stock")
    .select("id", { count: "exact", head: true })
    .eq("product_id", product.id)
    .is("sold_to", null);

  if (error) return ctx.reply("❌ Stock lookup failed.");

  await ctx.reply(
    `📦 ${engine.name}\n🎮 ${session.game}\n⏳ ${days} Days\n💵 Price: ₹${product.price}\n📦 Available keys: ${count ?? 0}\n\nCheckout abhi connect nahi hai.`,
    homeButtons()
  );
});

// QR photo handling
bot.on("photo", async (ctx) => {
  if (!isAdmin(ctx)) return;

  const session = sessions.get(String(ctx.from.id));
  if (session?.flow !== "qr") return;

  const photo = ctx.message.photo.at(-1).file_id;
  await setting("payment_qr_file_id", photo);
  sessions.delete(String(ctx.from.id));

  await ctx.reply("✅ QR saved successfully.", adminButtons());
});

// Text input workflows
bot.on("text", async (ctx, next) => {
  const uid = String(ctx.from.id);
  const session = sessions.get(uid);

  if (!session) return next();

  if (ctx.message.text.startsWith("/cancel")) {
    sessions.delete(uid);
    return ctx.reply("❌ Cancelled.", homeButtons());
  }

  if (!isAdmin(ctx)) return next();

  try {
    if (session.flow === "stock_codes") {
      const codes = ctx.message.text
        .split(/\r?\n/)
        .map(v => v.trim())
        .filter(Boolean);

      if (!codes.length) return ctx.reply("❌ At least one key is required.");

      const { data: product, error: productError } = await supabase
        .from("store_products")
        .select("id")
        .eq("engine", session.engine)
        .eq("game", session.game)
        .eq("duration_days", session.days)
        .maybeSingle();

      if (productError) throw productError;
      if (!product) {
        return ctx.reply("❌ Set the user price for this plan first with /setprice.");
      }

      const rows = codes.map(license_key => ({
        product_id: product.id,
        license_key,
      }));

      const { error } = await supabase.from("store_stock").insert(rows);
      if (error) throw error;

      sessions.delete(uid);
      return ctx.reply(`✅ ${codes.length} key(s) saved to stock.`, adminButtons());
    }

    if (session.flow === "price_value") {
      const price = Number(ctx.message.text.trim());
      if (!Number.isFinite(price) || price <= 0) {
        return ctx.reply("❌ Valid INR price bhejo, jaise 199.");
      }

      const { error } = await supabase.from("store_products").upsert({
        engine: session.engine,
        game: session.game,
        duration_days: session.days,
        price,
        active: true,
      }, { onConflict: "engine,game,duration_days" });

      if (error) throw error;

      sessions.delete(uid);
      return ctx.reply(`✅ User price saved: ₹${price}`, adminButtons());
    }

    if (session.flow === "reseller_value") {
      const price = Number(ctx.message.text.trim());
      if (!Number.isFinite(price) || price <= 0) {
        return ctx.reply("❌ Valid reseller price bhejo.");
      }

      const { data: product, error: productError } = await supabase
        .from("store_products")
        .select("id")
        .eq("engine", session.engine)
        .eq("game", session.game)
        .eq("duration_days", session.days)
        .maybeSingle();

      if (productError) throw productError;
      if (!product) return ctx.reply("❌ Set user price for this plan first.");

      const { error } = await supabase.from("store_reseller_prices").upsert({
        telegram_id: session.target,
        product_id: product.id,
        price,
      }, { onConflict: "telegram_id,product_id" });

      if (error) throw error;

      sessions.delete(uid);
      return ctx.reply(
        `✅ Reseller price saved.\nUser: ${session.target}\nPrice: ₹${price}`,
        adminButtons()
      );
    }

    if (session.flow === "broadcast") {
      const message = ctx.message.text;
      const { data: users, error } = await supabase
        .from("store_users")
        .select("telegram_id");

      if (error) throw error;

      let sent = 0;
      for (const user of users) {
        try {
          await bot.telegram.sendMessage(user.telegram_id, message);
          sent++;
        } catch {}
      }

      sessions.delete(uid);
      return ctx.reply(`📣 Broadcast finished. Sent: ${sent}`, adminButtons());
    }
  } catch (error) {
    console.error(error);
    await ctx.reply("❌ Save failed. Check Supabase tables and settings.");
  }
});

// Error handling
bot.catch((error) => {
  console.error("Telegram bot error:", error);
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ status: "Techno Aabid Store endpoint running" });
  }

  try {
    await bot.handleUpdate(req.body);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ ok: false });
  }
}
