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
> \`c!invite\` - \`c!support\` - \`c!about\`
> \`c!ping\` - \`c!prefix\` - \`c!uptime\`
> \`n!se\` - \`c!avatar\` - \`c!embed\`
> \`c!invites\`
• ────── <a:emoji_16:846056106392420383> ────── •
**☢︎︎◢Music Commands**
> \`c!play\` - \`c!skip\` - \`c!skipto\`
> \`c!stop\` - \`c!volume\` - \`c!nowplaying\`
> \`c!shuffle\` - \`c!search\` - \`c!resume\`
> \`c!remove\` - \`c!queue\` - \`c!filter\`
> \`c!loop\` - \`c!lyrics\` - \`c!radio\`
• ────── <a:pine_msg:850652037251072000> ────── •
‌**☢︎︎◢Other Commands**
> \`c!lock\` - \`c!unlock\`
> \`c!close\` - \`c!open\`
> \`c!ban\` - \`c!unban\`
> \`c!mute\` - \`c!unmute\`
> \`c!slowmode\` - \`c!giveaway\`
> \`c!clear\` - \`c!say\`
> \`c!bans\` - \`c!cv\`
> \`c!slap\` - \`c!hug\`
• ────── <a:emoji_29:850679611016871957> ────── •
**☢︎︎◢Gifs Commands**
> \`c!boy\` - \`c!girl\` - \`c!baby\`
> \`c!couple\` - \`c!animal\` - \`c!anime\`
> \`c!emoji\`
• ────── <a:emoji_7:843144064337838106> ────── •
**☢︎︎◢Auto Commands**
> \`Welcome Channel\` **[ 💘»welcome ]**
> \`Left Channel\` **[ 🔔»left ]**
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
