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
    .setThumbnail(`https://cdn.discordapp.com/attachments/850352717511000065/851928296093909002/icons.jpg`)
    .setTitle(`**Luna Bot ✨ Help**`)
    .setDescription(`

**User Commands**
> \`+invite\` - \`+support\` - \`+about\`
> \`+ping\` - \`+prefix\` - \`+uptime\`
> \`+se\` - \`+avatar\` - \`+embed\`
> \`_invites\`
**Music Commands**
> \`+play\` - \`+skip\` - \`+skipto\`
> \`_stop\` - \`_volume\` - \`+nowplaying\`
> \`_shuffle\` - \`_search\` - \`+resume\`
> \`_remove\` - \`_queue\` - \`+filter\`
> \`_loop\` - \`_lyrics\` - \`+adio\`
‌**Other Commands**
> \`_lock\` - \`_unlock\`
> \`_close\` - \`_open\`
> \`_ban\` - \`_unban\`
> \`_mute\` - \`_unmute\`
> \`_slowmode\` - \`_giveaway\`
> \`_clear\` - \`_say\`
> \`_bans\` - \`_cv\`
> \`_slap\` - \`_hug\`
**Gifs Commands**
> \`_boy\` - \`_girl\` - \`_baby\`
> \`_couple\` - \`_animal\` - \`_anime\`
> \`_emoji\`
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
