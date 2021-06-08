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
    .setTitle(`**Luna✨ Help**`)
    .setDescription(`

**User Commands**
> \`${prefix}invite\` - \`${prefix}support\` - \`${prefix}about\`
> \`${prefix}ping\` - \`${prefix}prefix\` - \`${prefix}uptime\`
> \`${prefix}se\` - \`${prefix}avatar\` - \`${prefix}embed\`
> \`${prefix}invites\`
**Music Commands**
> \`c!play\` - \`c!skip\` - \`c!skipto\`
> \`c!stop\` - \`c!volume\` - \`c!nowplaying\`
> \`c!shuffle\` - \`c!search\` - \`c!resume\`
> \`c!remove\` - \`c!queue\` - \`c!filter\`
> \`c!loop\` - \`c!lyrics\` - \`c!radio\`
‌**Other Commands**
> \`${prefix}lock\` - \`${prefix}unlock\`
> \`${prefix}close\` - \`${prefix}open\`
> \`${prefix}ban\` - \`${prefix}unban\`
> \`${prefix}mute\` - \`${prefix}unmute\`
> \`${prefix}slowmode\` - \`${prefix}giveaway\`
> \`${prefix}clear\` - \`${prefix}say\`
> \`${prefix}bans\` - \`${prefix}cv\`
> \`${prefix}slap\` - \`${prefix}hug\`
**Gifs Commands**
> \`${prefix}boy\` - \`${prefix}girl\` - \`${prefix}baby\`
> \`${prefix}couple\` - \`${prefix}animal\` - \`${prefix}anime\`
> \`${prefix}emoji\`
**Auto Commands**
> \`Welcome Channel\` **[ 💘»welcome ]**
> \`Left Channel\` **[ 🔔»left ]**
**‌Links**
**[Support](https://discord.gg/2jAP99jssR) - [invite](https://discord.com/api/oauth2/authorize?client_id=844069682545164289&permissions=8&scope=bot)**
`)

   .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
   .setColor("#FFF712");
   message.react("<:emoji_15:830469967752724500>")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
