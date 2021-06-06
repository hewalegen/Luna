const Discord = module.require("discord.js");

module.exports = {
   name: "close",
   aliases: ["cl"],
   cooldown: 5,
   description: "close a Channel",
   async execute(message, args) {
   if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.send("You don't have enough Permissions")
   }
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        deny : ['VIEW_CHANNEL'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("")
   .setTimestamp()
   .setThumbnail(message.author.avatarURL({dynamic: "true"}))
   .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
   .setDescription(`
🔒 - Hided A Channel
> Channel Name : <#${message.channel.id}>
> Hided By : <@${message.author.id}>
> Channel Status : View Channel ❌

`)
   .setColor("#FFF712");
   await message.channel.send(embed);
}
}
