const Discord = require("discord.js");
const client = new Discord.Client();
const Settings = require("./Settings/Settings.json");
const Other = require("./Settings/Other.json");
const { token, gameChannelId, interval } = require("./Settings/Settings.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
require("./Util/eventLoader.js")(client);
const path = require("path");
const snekfetch = require("snekfetch");
const axios = require("axios")
const { MessageButton } = require('discord-buttons');
const express = require("express");
const app = express();
const port = 30002;


app.get('/', (req, res) => res.send('Power By AIuptime'));

app.listen(port, () =>
    console.log(`Bot bu adres üzerinde çalışıyor: http://localhost:${port}`)
);



var prefix = Settings.BotSettings.prefix;

const log = (message) => {
  console.log(`${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./Commands/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} Adet Komut Yüklenecek.`);
  files.forEach((f) => {
    let props = require(`./Commands/${f}`);
    log(`[+] Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach((alias) => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./Commands/${command}`)];
      let cmd = require(`./Commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = (command) => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./Commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./Commands/${command}`)];
      let cmd = require(`./Commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = (message) => {
  if (!message.guild) {
    return;
  }

  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === Settings.BotSettings.Owner) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
//client.on('debug', e => {
//  console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
//});
client.on("warn", (e) => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});
client.on("error", (e) => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});


client.login(Settings.BotSettings.token);


//-----------------------------------------------Komutlar------------------------------------------------\\
//client.on("guildMemberAdd", async (member) => {


//});


// client.on("ready", async () => {
//   let botVoiceChannel = client.channels.cache.get(
//     Settings.Channels.ConfirmationVoice
//   );
 //  if (botVoiceChannel)
 //    botVoiceChannel
  //     .join()
   //    .catch((err) =>
   //      console.error(
   //        "Bot Ses Kanalına Bağlanamıyor, Lütfen Ses Kanal ID'sini Kontrol Et."
    //     )
  //     );
// });

// client.on("guildMemberAdd", (member) => {
//   let los = client.users.cache.get(member.id);
//   require("moment-duration-format");
//   const kurulus = new Date().getTime() - los.createdAt.getTime();

 //  var üyesayısı = member.guild.members.cache.size
 //    .toString()
//     .replace(/ /g, "    ");
 //  var üs = üyesayısı.match(/([0-9])/g);
 //  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
 //  if (üs) {
  //   üyesayısı = üyesayısı.replace(/([0-9])/g, (d) => {
  //     return {
   //      0: Other.EmojiNumbers.Zero,
   //      1: Other.EmojiNumbers.One,
   //      2: Other.EmojiNumbers.Two,
  //       3: Other.EmojiNumbers.Three,
  //       4: Other.EmojiNumbers.Four,
  //       5: Other.EmojiNumbers.Five,
  //       6: Other.EmojiNumbers.Six,
 //        7: Other.EmojiNumbers.Seven,
 //        8: Other.EmojiNumbers.Eight,
  //       9: Other.EmojiNumbers.Nine,
 //      }[d];
 //    });
 //  }

 //  var kontrol;
//   if (kurulus < 1296000000)
 //    kontrol = `Hesap Durumu: **Güvenilir Değil** ${Other.EmojiGeneral.Çarpı}`;
 //  if (kurulus > 1296000000)
 //    kontrol = `Hesap Durumu: **Güvenilir** ${Other.EmojiGeneral.Tik}`;
//   moment.locale("tr");
//   let kanal = member.guild.channels.cache.get(Settings.Welcome.WelcomeChat);
//   const kuruluss = new Date().getTime() - los.createdAt.getTime();
//   const gecen = moment
//     .duration(kuruluss)
//     .format(
//       `YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`
//     );
// 
//   kanal.send(
//     `
//   ${Other.EmojiGeneral.Emoji1} • Sunucumuza Hoşeldin  ${los} !\n
// 
 //  ${Other.EmojiGeneral.Emoji2} • Seninle Beraber Sunucumuzda ` +
 //      üyesayısı +
  //     ` Değerli İnsan Oldu.\n
// 
 //  ${Other.EmojiGeneral.Emoji3} • Hesabın \`` +
 //      gecen +
 //      `\` Önce Oluşturulmuş.\n

 //  ${Other.EmojiGeneral.Emoji4} • ` +
 // // //      kontrol +
 //      `\n

 // //  ${Other.EmojiGeneral.Emoji5} • <@&${Settings.Roles.Registerer}> Rolündeki Yetkililer Seninle İlgilenicektir.\n

//   ${Other.EmojiGeneral.Emoji6} • Soldaki <#1175116435262013501> Odalarından Birine Geçerek Kaydolabilirsin.`
 //  );

  //------------------------------------------------------------------------------------------------------------------------------------\\

  //client.on("guildMemberAdd", (member) => {
    //var moment = require("moment");
   // require("moment-duration-format");
   //  moment.locale("tr");
   //  var { Permissions } = require("discord.js");
   //  var x = moment(member.user.createdAt).add(7, "days").fromNow();
  //   var user = member.user;
  //   x = x.replace("birkaç saniye önce", " ");
 //   if (!x.includes("önce") || x.includes("sonra") || x == " ") {
   //    var rol = member.guild.roles.cache.get(Settings.Roles.Suspicious);
   //    var jail = member.guild.roles.cache.get(Settings.Roles.Jail);
   //    var kayıtsız = member.guild.roles.cache.get(Settings.Roles.Unregister);
  //    member.roles.add(rol);
  //     member.roles.remove(kayıtsız);
   //    member.user.send(
   //      "Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır."
   //    );
    //   setTimeout(() => {}, 1000);
  //   } else {
  //   }
  // });


  //------------------------------------------------------------------------------------------------------------------------------------\\

  //-----------------------TAG-ROL----------------------\\

  // client.on("userUpdate", async (losxstg, yeni) => {
  // var sunucu = client.guilds.cache.get(Settings.ServerSettings.ServerID);
  //   var uye = sunucu.members.cache.get(yeni.id);
  // var tag = (Settings.ServerSettings.Tag);
  //var tagrol = (Settings.Roles.TagRole);
  //var logKanali = (Settings.Channels.TagLog);

  //  if (!sunucu.members.cache.has(yeni.id) || yeni.bot || losxstg.username === yeni.username) return;

  //   if ((yeni.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
  //    try {
  //      await uye.roles.add(tagrol);
  //       await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
  //       await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor(Settings.Colors.Green).setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
  //    } catch (err) { console.error(err) };
  //    };

  //  if (!(yeni.username).includes(tag) && uye.roles.cache.has(tagrol)) {
  //   try {
  //   await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
  //    await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
  //    await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor(Settings.Colors.Red).setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
  //  } catch(err) { console.error(err) };
  // };
  // });//
  //-----------------------TAG-ROL----------------------\\

  //----------------------TAG-KONTROL----------------------\\
  //
  //client.on("guildMemberAdd", member => {
  //   let sunucuid = (Settings.ServerSettings.ServerID);
  //   let tag = (Settings.ServerSettings.Tag);
  //   let rol = (Settings.Roles.TagRole);
  // if(member.user.username.includes(tag)){
  // member.roles.add(rol)
  //   const tagalma = new Discord.MessageEmbed()
  //      .setColor(Settings.Colors.Green)
  //      .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
  //     .setTimestamp()
  //    client.channels.cache.get(Settings.Channels.TagLog).send(tagalma)
  //}
  //})


setInterval((message, member, args)  => { 


    let guildID = '1173711774902661130';// hangi sunucuda çalışsın onu yazın
let guild = client.guilds.cache.get(guildID);
if(!guild) return console.log('Sunucu bulunamadı.');

const randomMember = guild.members.cache.filter(a => !a.user.bot).random();
 let seskanal = guild.channels.cache.filter(x => x.type === 'voice');
  let kanal = seskanal.random();

//const msj = (`./kelimeler.json`);
   const mesajrandom = [`${randomMember} insta verde eklim <a:insta:1220053147909754971>`,`${randomMember}sıkıcı mısın ne ya`,`${randomMember} istek atsana`,`${randomMember} kaç cm laaaa`,`${randomMember} erkekler kapatılsın -.-`,`${randomMember} elimi tut <a:lovve:1220086951768490055>`,`${randomMember} 
   gel sesliye burdayım ${kanal}`,`${randomMember} `,`${randomMember} Aklına gelirim, aklın gider.`,`${randomMember} Tiktokta fenomen olan kızla değil, mutfakta menemen yapan kızla mutlu olunur.`,`${randomMember} Bizde geri vites yok gerekirse ilerden döneriz.`,`${randomMember} mute cezası yedin öpim affederim`,`${randomMember} hele boost bas lo ğerıne`,`${randomMember} cıgara var dayi içek`,`${randomMember} spam bastığın için 15 dakika susturulma cezası sadsada`,`${randomMember} saril annem gelmeden`,`${randomMember} öpim`,`${randomMember} Sunucudan Atıldın sebep: \nk@hpelikten`]
       client.channels.cache.get("1219591461272817774").send(mesajrandom[sn(0, mesajrandom.length)])
.then(msg => {
        msg.delete({ timeout: 10000 }) // 5000 = 5 saniye
    })
    .catch();
  }, 900000)

function sn(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;


  }         


client.on('ready', async (menu) => {
     const channel = "1219976749715030036"
            const emojis = ["<a:lovve:1220086951768490055>","<a:insta:1220053147909754971>"]
            client.on("message", message =>{
                if(channel.includes(message.channel.id)){
                    message.react(emojis[rn(0, emojis.length)])
                }
            })

    })

function rn(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;


  }    

client.on('messageDelete', async message => {// 
  if(message.author.bot || !message.content) return;
  require('quick.db').push(message.guild.id, {
    author: message.author,
    authorTAG: message.author.tag,
    authorID: message.author.id,
    authorUSERNAME: message.author.username,
    authorDISCRIMINATOR: message.author.discriminator,
    messageID: message.id,
    messageCHANNEL: message.channel,
    messageCHANNELID: message.channel.id,
    messageCONTENT: message.content,
    messageCREATEDAT: message.createdAt
  });
})    



 // config.json dosyasından bot tokenini, prefixi ve oyun kanalı ID'sini alıyoruz
client.on('message', message => {
  // !mesajyaz komutunu kontrol ediyoruz
  if (message.content.startsWith(',botts')) {
    // Komutu kullanan kişiye geri dönüş yapmadan önce kendi mesajını siliyoruz
    message.delete().catch(console.error);

    // Etiketlenen üyeyi alıyoruz
    const taggedUser = message.mentions.users.first();

    // Eğer bir üye etiketlenmediyse geri bildirim gönder
    if (!taggedUser) {
      return message.reply('Lütfen bir üyeyi etiketleyin!');
    }

    // Etiketlenen üyenin ID'sini alıyoruz
    const userID = taggedUser.id;

    // Mesaj içeriğini alıyoruz
    const content = message.content.slice(',yazdırr'.length).trim();

    // Etiketlenen üyenin bulunduğu ses kanalını alıyoruz

    // Mesajı belirtilen metin kanalına gönderiyoruz


    // Etiketlenen metin kanalına mesajı gönderiyoruz
    message.channel.send(`${content}`).then(a => {
setTimeout(() => {
a.delete()
}, 100000)
})
}
});



// Belirli aralıklarla resim gönderme işlevi


// });
