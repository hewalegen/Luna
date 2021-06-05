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

• ────── <a:emoji_21:847035009298595860> ────── •
**☢︎︎◢User Commands**
> \`n!invite\` - \`n!support\` - \`n!about\`
> \`n!ping\` - \`n!prefix\` - \`n!uptime\`
> \`n!se\` - \`n!avatar\` - \`n!embed\`
> \`n!invites\`
• ────── <a:emoji_16:846056106392420383> ────── •
**☢︎︎◢Music Commands**
> \`n!play\` - \`n!skip\` - \`n!skipto\`
> \`n!stop\` - \`n!volume\` - \`n!nowplaying\`
> \`n!shuffle\` - \`n!search\` - \`n!resume\`
> \`n!remove\` - \`n!queue\` - \`n!filter\`
> \`n!loop\` - \`n!lyrics\` - \`n!radio\`
• ────── <a:pine_msg:850652037251072000> ────── •
‌**☢︎︎◢Other Commands**
> \`n!lock\` - \`n!unlock\`
> \`n!ban\` - \`n!unban\`
> \`n!mute\` - \`n!unmute\`
> \`n!slowmode\` - \`n!giveaway\`
> \`n!clear\` - \`n!say\`
> \`n!bans\` - \`n!cv\`
> \`n!slap\` - \`n!hug\`
• ────── <a:emoji_29:850679611016871957> ────── •
**☢︎︎◢Gifs Commands**
> \`n!boy\` - \`n!girl\` - \`n!baby\`
> \`n!couple\` - \`n!animal\` - \`n!anime\`
> \`n!emoji\`
• ────── <a:emoji_7:843144064337838106> ────── •
**☢︎︎◢Auto Commands**
> \`Welcome Channel\` **[丨𝖶𝖾𝗅𝖼𝗈𝗆𝖾 ]**
> \`Left Channel\` **[丨𝖫𝖾𝖿𝗍 ]**
• ────── 🖇️ ────── •
**‌☢︎︎◢Links**
**[Support](https://discord.gg/2jAP99jssR) - [invite](https://discord.com/api/oauth2/authorize?client_id=844069682545164289&permissions=8&scope=bot)**
`)

   .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
   .setColor("#FFF712");
   message.react("<:emoji_15:830469967752724500>")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
