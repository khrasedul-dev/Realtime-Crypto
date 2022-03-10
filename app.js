const { Telegraf } = require("micro-bot");
const axios = require("axios");
const { url } = require("inspector");

const bot = new Telegraf("5249674838:AAEpvXebORYAre5aCgXygLw63DdSMeKMjdw");

bot.start((ctx) => {
  ctx.telegram.sendMessage(
    ctx.chat.id,
    `🔎  To find coin latest info type coin name`,
    {
      reply_markup: {
        keyboard: [
          [{ text: "🔔 Bitcoin" }],
          [{ text: "📈 Top 10" }, { text: "📊 Get All" }],
          [{ text: "🙍 About" }, { text: "🔗 Contact" }],
          [{ text: "🔰 Help" }],
        ],
        resize_keyboard: true,
      },
    }
  );
});

bot.hears("🔔 Bitcoin", (ctx) => {
  axios
    .get("https://coingeckounoffcialapi.herokuapp.com/")
    .then((data) => {
      const item = data.data.filter((items) => {
        const cName = items.coin_name;
        return cName == "Bitcoin";
      });

      ctx.telegram.sendMessage(
        ctx.chat.id,
        `Rank : ${item[0].rank} \nCoin Name : ${item[0].coin_name} \nPrice : ${item[0].price} \n1 hour : ${item[0].one_hour} \n1 day : ${item[0].one_day} \n7 day : ${item[0].one_week} \n24H Volume : ${item[0].oneday_volume} \nMarket Cap : ${item[0].market_cap}`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Preview",
                  url:
                    "https://www.coingecko.com/en/coins/" +
                    item[0].coin_name.toLowerCase(),
                },
                { text: "Order", url: "https://www.khrasedu.com/" },
              ],
            ],
          },
        }
      );
    })
    .catch((e) => console.log(e));
});

bot.hears("📈 Top 10", (ctx) => {
  axios
    .get("https://coingeckounoffcialapi.herokuapp.com/")
    .then((data) => {
      const item = data.data.filter((items) => {
        return items.rank <= 10;
      });

      item.map((item) => {
        ctx.telegram.sendMessage(
          ctx.chat.id,
          `Rank : ${item.rank} \nCoin Name : ${item.coin_name} \nPrice : ${item.price} \n1 hour : ${item.one_hour} \n1 day : ${item.one_day} \n7 day : ${item.one_week} \n24H Volume : ${item.oneday_volume} \nMarket Cap : ${item.market_cap}`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Preview",
                    url:
                      "https://www.coingecko.com/en/coins/" +
                      item.coin_name.toLowerCase(),
                  },
                ],
              ],
            },
          }
        );
      });
    })
    .catch((e) => console.log(e));
});

bot.hears("📊 Get All", (ctx) => {
  axios
    .get("https://coingeckounoffcialapi.herokuapp.com/")
    .then((data) => {
      const item = data.data.filter((items) => {
        return items.rank <= 100;
      });

      item.map((item) => {
        ctx.telegram.sendMessage(
          ctx.chat.id,
          `Rank : ${item.rank} \nCoin Name : ${item.coin_name} \nPrice : ${item.price} \n1 hour : ${item.one_hour} \n1 day : ${item.one_day} \n7 day : ${item.one_week} \n24H Volume : ${item.oneday_volume} \nMarket Cap : ${item.market_cap}`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Preview",
                    url:
                      "https://www.coingecko.com/en/coins/" +
                      item.coin_name.toLowerCase(),
                  },
                ],
              ],
            },
          }
        );
      });
    })
    .catch((e) => console.log(e));
});

bot.hears("🙍 About", (ctx) => {
  ctx.reply("This demo about");
});

bot.hears("🔗 Contact", (ctx) => {
  ctx.reply("This is demo contract");
});

bot.hears("🔰 Help", (ctx) => {
  ctx.reply("This is demo help");
});

bot.on("text", (ctx) => {
  const input = ctx.update.message.text;
  let a = input.toUpperCase();
  let b = input.toLowerCase();
  let c = input.charAt(0).toUpperCase() + input.slice(1);
  let d = b.charAt(0).toUpperCase() + b.slice(1);

  axios
    .get("https://coingeckounoffcialapi.herokuapp.com/")
    .then((data) => {
      const item = data.data.filter((items) => {
        const cName = items.coin_name;
        return (
          cName == d || cName == input || cName == a || cName == b || cName == c
        );
      });

      if (item.length > 0) {
        ctx.telegram.sendMessage(
          ctx.chat.id,
          `Rank : ${item[0].rank} \nCoin Name : ${item[0].coin_name} \nPrice : ${item[0].price} \n1 hour : ${item[0].one_hour} \n1 day : ${item[0].one_day} \n7 day : ${item[0].one_week} \n24H Volume : ${item[0].oneday_volume} \nMarket Cap : ${item[0].market_cap}`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Preview",
                    url: "https://www.coingecko.com/en/coins/" + b,
                  },
                ],
              ],
            },
          }
        );
      } else {
        ctx.reply("We could not found anything for: " + input);
      }
    })
    .catch((e) => console.log(e));
});

bot
  .launch()
  .then(() => console.log("Bot Started"))
  .catch((e) => console.log(e));
