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
> \`n!invite\` - \`n!support\` - \`n!about\`
> \`n!ping\` - \`n!prefix\` - \`n!uptime\`
> \`n!se\` - \`n!avatar\` - \`n!embed\`
> \`n!invites\`
**Music Commands**
> \`n!play\` - \`n!skip\` - \`n!skipto\`
> \`n!stop\` - \`n!volume\` - \`n!nowplaying\`
> \`n!shuffle\` - \`n!search\` - \`n!resume\`
> \`n!remove\` - \`n!queue\` - \`n!filter\`
> \`n!loop\` - \`n!lyrics\` - \`n!radio\`
**Fun Commands**
> \`n!lock\` - \`n!unlock\`
> \`n!ban\` - \`n!unban\`
> \`n!mute\` - \`n!unmute\`
> \`n!slowmode\` - \`n!giveaway\`
> \`n!clear\` - \`n!say\`
> \`n!bans\` - \`n!cv\`
> \`n!slap\` - \`n!hug\`
**Gifs Commands**
> \`n!boy\` - \`n!girl\` - \`n!baby\`
> \`n!couple\` - \`n!animal\` - \`n!anime\`
> \`n!emoji\`
**Links**
**[Support](https://discord.gg/2jAP99jssR) - [invite](https://discord.com/api/oauth2/authorize?client_id=844069682545164289&permissions=8&scope=bot)**
`)

   .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
   .setColor("#FFF712");
   message.react("✅")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
