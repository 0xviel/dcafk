const { Client, WebEmbed, SpotifyRPC, RichPresence } = require("discord.js-selfbot-v13");
const client = new Client();
const waktu = 1734195187542

function calculateDaysLeft(startTime) {
  const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000; // 1 tahun dalam milidetik
  const targetTime = startTime + oneYearInMilliseconds; // Waktu target (1 tahun dari startTime)
  const currentTime = Date.now(); // Waktu sekarang
  const remainingMilliseconds = targetTime - currentTime; // Sisa waktu dalam milidetik

  if (remainingMilliseconds <= 0) {
    return "Waktu telah habis";
  }

  const remainingDays = Math.floor(remainingMilliseconds / (1000 * 60 * 60 * 24)); // Sisa waktu dalam hari
  return `${remainingDays} day left`;
}

client.on("ready", () => {
    console.log(`${client.user.username} is online!`);

    const status = new RichPresence(client)
        .setApplicationId('1012137367471149186')
        .setType('PLAYING')
        .setName("AFK")
        .setAssetsLargeImage("1317680213479526482")
        .setStartTimestamp(waktu)
        .setPlatform("ios");

    const spotify = new SpotifyRPC(client)
         .setDetails(calculateDaysLeft(waktu))
         .setStartTimestamp(waktu)
         .setEndTimestamp(waktu + 1_000 *(525600 * 60)) // Song length = 2m56s

     client.user.setPresence({ activities: [status, spotify] })
});

client.on("messageCreate", async (message) => {
    if (!message.content.startsWith("!$!help")
        && !message.content.startsWith("!$!links"))
    return;

    const command = message.content.split(" ")[0];
    const args = message.content.split(" ").slice(1);
    const text = message.content.slice(command.length).trim();


    try {
        if (command === "!$!help") {
          message.reply('hallo');
        } else if (command === "!$!links") {
          message.reply('cek connections');
        }
    } catch (err) {
        console.error("Error typing text:", err);
    }
});


client.login(env.TOKEN); // Ganti dengan token selfbot Anda
