const { MessageEmbed, Client, Message } = require("discord.js");
const Settings = require("../Settings/Settings.json")
module.exports.run = async (client, message, args) => {

 if(![(Settings.Roles.Registerer)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin <@&${Settings.Roles.Registerer}> bu  role sahip olmalısın`) 



  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]

  if (!user) return message.channel.send("Üye etiketlemelisin veya kendini").then(a => {
setTimeout(() => {
a.delete()
}, 5000)
})

  if (!isim) return message.channel.send("Bir kullanıcı adı girmelisin boş geçtin ve ayrıca işlem başarılı değil ise lütfen etiket yerine\nKenidi kullanıcı ID'ni yada etiketleyeceğin kişinin kullanıcı ID'si girilmeli").then(a => {
setTimeout(() => {
a.delete()
}, 8000)
})

user.setNickname(`${isim}`)

  message.channel.send(`Başarıyla ${user} \`${isim}\` olarak değiştin.`).then(a => {
setTimeout(() => {
a.delete()
}, 5000)
})
}


module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isim", "i"]
};

module.exports.help = {
  name: 'isim',
  description: 'ister kendi adını ister başkası için kullanılır ama kayıt için kullanma'
};