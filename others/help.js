const { Client, Collection, MessageEmbed } = require(`discord.js`);
const { 
  PREFIX, 
} = require(`../config.json`);

  


module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: 8,
  description: "**Ness Help**",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
    .setThumbnail(`https://cdn.discordapp.com/avatars/844069682545164289/b40e8a61cbeb7a6319b5050238a9aa03.png?size=1024`)
    .setTitle(`**Ness Help**`)
    .setDescription(`

**User Commands**
> \`.invite\` - \`.support\` - \`.about\`
> \`.ping\` - \`.prefix\` - \`.uptime\`
> \`.se\` - \`.avatar\` - \`.embed\`
> \`.invites\`
**Music Commands**
> \`.play\` - \`.skip\` - \`.skipto\`
> \`.stop\` - \`.volume\` - \`.nowplaying\`
> \`.shuffle\` - \`.search\` - \`.resume\`
> \`.remove\` - \`.queue\` - \`.filter\`
> \`.loop\` - \`.lyrics\` - \`.radio\`
**Fun Commands**
> \`.lock\` - \`unlock\`
> \`.ban\` - \`.unban\`
> \`.mute\` - \`.unmute\`
> \`.slowmode\` - \`.giveaway\`
> \`.clear\` - \`.say\`
> \`.bans\` - \`.cv\`
**Links**
**[Support](https://discord.gg/2jAP99jssR) - [invite](https://discord.com/api/oauth2/authorize?client_id=844069682545164289&permissions=8&scope=bot)**
`)

   .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
   .setColor("#FF0000");
   message.react("✅")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
