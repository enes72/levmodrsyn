const { MessageEmbed, Client, Message } = require("discord.js");
const Settings = require("../Settings/Settings.json")
module.exports.run = async (client, message, args) => {

 if(![(Settings.Roles.rolecommands)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin <@&${Settings.Roles.rolecommands}> rolüne sahip olmalısın.`) 


  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
 var role = message.mentions.roles.first() || message.guild.roles.cache.find(a => a.name == args.slice(1).join(' '));

  if (!role) return message.channel.send("Rol bulunumadı Rolü Etiketle yada Rolün ID'sini gir ve dene").then(a => {
setTimeout(() => {
a.delete()
}, 7000)
})

  if (!member) return message.channel.send("Bir kullanıcı adı girmelisin boş geçtin ve ayrıca işlem başarılı değil ise lütfen etiket yerine\nKenidi kullanıcı ID'ni yada etiketleyeceğin kişinin kullanıcı ID'si girilmeli").then(a => {
setTimeout(() => {
a.delete()
}, 8000)
})

 if (message.member.roles.highest.comparePositionTo(role) < 1) {
  return message.channel.send(`Verilecek rol sizin rolünüzün üstünde bu yüzden rolü **veremiyorum!**`).then(a => {
setTimeout(() => {
a.delete()
}, 4000)
})
  }

member.roles.add(role.id)

  message.channel.send(`Başarıyla ${member} Kişisine \`${role.name}\` Rolü başarıyla verildi.`).then(a => {
setTimeout(() => {
a.delete()
}, 10000)
})
}


module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rolver", "rol"]
};

module.exports.help = {
  name: 'rolver',
  description: 'roletiket üyeetiket'
};