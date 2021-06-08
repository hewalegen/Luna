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
> \`_invite\` - \`_support\` - \`_about\`
> \`_ping\` - \`_prefix\` - \`_uptime\`
> \`_se\` - \`_avatar\` - \`_embed\`
> \`_invites\`
**Music Commands**
> \`_play\` - \`_skip\` - \`_skipto\`
> \`_stop\` - \`_volume\` - \`_nowplaying\`
> \`_shuffle\` - \`_search\` - \`_resume\`
> \`_remove\` - \`_queue\` - \`_filter\`
> \`_loop\` - \`_lyrics\` - \`_radio\`
‌**Other Commands**
> \`_lock\` - \`_unlock\`
> \`_close\` - \`_open\`
> \`_ban\` - \`_unban\`
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
