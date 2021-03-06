const Discord = module.require("discord.js");

module.exports = {
   name: "open",
   aliases: ["on"],
   description: "UnHide a Channel",
   async execute(message, args) {
   if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.send("You don't have enough Permissions")
   }
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        null : ['VIEW_CHANNEL'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("")
   .setTimestamp()
   .setThumbnail(message.author.avatarURL({dynamic: "true"}))
   .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
   .setDescription(`
🔓 - UnHided A Channel
> Channel Name : <#${message.channel.id}>
> Locked By : <@${message.author.id}>
> Channel Status : Send Message
`)
   .setColor("#FFF712");
   await message.channel.send(embed);
}
}
