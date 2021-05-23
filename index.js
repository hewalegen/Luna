const Discord = require(`discord.js`);
const { Client, Collection, MessageEmbed,MessageAttachment } = require(`discord.js`);
const { readdirSync } = require(`fs`);
const { join } = require(`path`);
const db = require('quick.db');
const { TOKEN, PREFIX, AVATARURL, BOTNAME, } = require(`./config.json`);
const figlet = require("figlet");
const client = new Client({ disableMentions: `` , partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.login('ODQ0MDY5NjgyNTQ1MTY0Mjg5.YKNDJg.X0O50zYVLCub6kMQ3biDoTYWIvs');
client.commands = new Collection();
client.setMaxListeners(0);
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);

//this fires when the BOT STARTS DO NOT TOUCH
client.on(`ready`, () => {	
//////////////

////////
   
   ///////////////////////////////
    ////////////IFCHEMPTY//////////
        //remove everything in between those 2 big comments if you want to disable that the bot leaves when ch. or queue gets empty!
        setInterval(() => { 
          let member;
        client.guilds.cache.forEach(async guild =>{
        await delay(15);
          member = await client.guilds.cache.get(guild.id).members.cache.get(client.user.id)
        //if not connected
          if(!member.voice.channel)
          return;
        //if alone 
        if (member.voice.channel.members.size === 1) 
        { return member.voice.channel.leave(); }
      });
      

    client.user.setActivity(`${client.guilds.cache.size} Server,Users ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)},`, { type: "LISTENING"});
   
    client.user.setActivity(`${PREFIX}help`, { type: "LISTENING"});
  
      }, (5000));
      ////////////////////////////////
      ////////////////////////////////
    figlet.text(`${client.user.username} ready!`, function (err, data) {
      if (err) {
          console.log('Something went wrong');
          console.dir(err);
      }
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
      console.log(data)
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
    })
   
});
//DO NOT TOUCH
//FOLDERS:
//Admin custommsg data FUN General Music NSFW others
commandFiles = readdirSync(join(__dirname, `Music`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `Music`, `${file}`));
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `others`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `others`, `${file}`));
  client.commands.set(command.name, command);
}
//COMMANDS //DO NOT TOUCH
client.on(`message`, async (message) => {
  if (message.author.bot) return;
  
  //getting prefix 
  let prefix = await db.get(`prefix_${message.guild.id}`)
  //if not prefix set it to standard prefix in the config.json file
  if(prefix === null) prefix = PREFIX;

  //information message when the bot has been tagged
  if(message.content.includes(client.user.id)) {
    message.reply(new Discord.MessageEmbed().setColor("#FFF712").setAuthor(`${message.author.username}, My Prefix is ${prefix}, to get started; type ${prefix}help`, message.author.displayAvatarURL({dynamic:true})));
  } 
  //An embed announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}embed`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#FFF712")
    .setDescription(saymsg)
    //delete the Command
    message.delete({timeout: 300})
    //send the Message
    message.channel.send(embed)
  }


/////////////
if(message.content.startsWith(`${prefix}status`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#FFF712")
    .setAuthor("")
    .setThumbnail(` `)
    .setFooter(message.author.username, message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`
Servers: ${client.guilds.cache.size}
Users: ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}
Channels: ${client.channels.cache.size}
`)

    //send the Message
    message.channel.send(embed)
    message.react("<:emoji_15:830469967752724500>")
  }

//An about announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}about`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#FFF712")
    .setAuthor("About Ness Bot.", "https://cdn.discordapp.com/avatars/844069682545164289/b40e8a61cbeb7a6319b5050238a9aa03.png?size=1024")
    .setThumbnail(`https://cdn.discordapp.com/avatars/844069682545164289/b40e8a61cbeb7a6319b5050238a9aa03.png?size=1024`)
    .setFooter(message.author.username, message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`

[Support](https://discord.gg/2jAP99jssR) - [Invite](https://discord.com/api/oauth2/authorize?client_id=844069682545164289&permissions=8&scope=bot)

**Owner Bot** :
<@749659830809002014>

**ID Bot** :
${client.user.id}

**Name** :
${client.user.tag}

**Prefix Bot** :
${prefix}

**Version** :
${process.version}

**Servers** :
${client.guilds.cache.size} Servers

**Users** :
${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}

**Channels** : 
${client.channels.cache.size}

`)

    //send the Message
    message.channel.send(embed)
   message.react("<:emoji_15:830469967752724500>")
  }

//An cv announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}cv`)){
    //define saymsg
     if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return;
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return;
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`${message.guild.name}`,message.guild.iconURL({ dynamic: true }))
    .setDescription(saymsg)
    .setTimestamp()
    //delete the Command
    message.delete({timeout: 300})
    //send the Message
    message.channel.send(embed)
  }

//command Handler DO NOT TOUCH
 const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
 if (!prefixRegex.test(message.content)) return;
 const [, matchedPrefix] = message.content.match(prefixRegex);
 const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
 const commandName = args.shift().toLowerCase();
 const command =
   client.commands.get(commandName) ||
   client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
 if (!command) return;
 if (!cooldowns.has(command.name)) {
   cooldowns.set(command.name, new Collection());
 }
 const now = Date.now();
 const timestamps = cooldowns.get(command.name);
 const cooldownAmount = (command.cooldown || 1) * 1000;
 if (timestamps.has(message.author.id)) {
   const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
   if (now < expirationTime) {
     const timeLeft = (expirationTime - now) / 1000;
     return message.reply(
      new MessageEmbed().setColor("#FFF712")
      .setTitle(`<:emoji_15:830469967752724500> Please wait \`${timeLeft.toFixed(1)} seconds\` before reusing the \`${prefix}${command.name}\`!`)    
     );
   }
 }
 timestamps.set(message.author.id, now);
 setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
 try {
   command.execute(message, args, client);
 } catch (error) {
   console.error(error);
   message.reply( new MessageEmbed().setColor("#FFF712")
   .setTitle(`<:emoji_15:830469967752724500> There was an error executing that command.`)).catch(console.error);
 }


});

client.on("guildCreate", guild => {
  let channel = client.channels.cache.get("845970442418389012");
  let embed = new MessageEmbed()
  .setColor("#FFF712")
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle( `✅ Join Server`)
  .addField(" **Server Name**", `${guild.name}`)
  .addField(" **Server Owner**", `${guild.owner}`)
  .addField(" **Server Id**", `${guild.id}`)
  .addField(" **Member Count**", `${guild.memberCount}`)
  .setFooter(`${client.user.tag}`);
  channel.send(embed);
});

client.on("guildDelete", guild => {
  let channel = client.channels.cache.get("845970442418389012");
  let embed = new MessageEmbed()
  .setColor("#FFF712")
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle( `❌ Left Server`)
  .addField(" **Server Name**", `${guild.name}`)
  .addField(" **Server Owner**", `${guild.owner}`)
  .addField(" **Server Id**", `${guild.id}`)
  .addField(" **Member Count**", `${guild.memberCount}`)
  .addField(" **Verification Level**", `${guild.verificationLevel}`)
  .setFooter(`${client.user.tag}`);
  channel.send(embed);
});

client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.cache.find(
    channel => channel.name === "greetings-and-boosts"
  );
  let client = member.user.avatarURL();
  if (!channel) return;
  const joinembed = new Discord.MessageEmbed()
    .setTitle(
      `**Welcome**`
    )
    .setColor("RANDOM")
    .setThumbnail(client)
    .addField(
      "┃**Name** : ",
      `${member}`)
    .addField(
      "┃**Welcome**",
      `Welcome to the server, 
${member}`)
    .addField(
      "┃**ID User** :",
      "**" + `${member.id}` + "**")
    .addField(
      "┃**Your are the member**",
      `${member.guild.memberCount}`)
    .addField("Server", `${member.guild.name}`, true)
    .setFooter(`**${member.guild.name}**`)
    .setTimestamp()
    .setImage(
      "https://cdn.discordapp.com/attachments/756491435229839410/756491623592099890/image0-14.gif"
    )
    .setFooter(`${member.guild.name}`)
    .setTimestamp();
  channel.send(joinembed);
});

client.on("guildMemberRemove", member => {
  const channel = member.guild.channels.cache.find(
    channel => channel.name === "left"
  );
  let client = member.user.avatarURL();
  if (!channel) return;
  const joinembed = new Discord.MessageEmbed()
    .setTitle(
      `**Left**`
    )
    .setColor("RANDOM")
    .setThumbnail(client)
    .addField("┃**Name** : ", `${member}`)
    .addField("┃**All Member** :", `${member.guild.memberCount}`)
    .addField("┃**Server Name** :", `${member.guild.name}`, true)
    .setFooter(`**${member.guild.name}**`)
    .setTimestamp()
    .setImage(
      ""
    )
    .setFooter(`${member.guild.name}`)
    .setTimestamp();
  channel.send(joinembed);
});

function delay(delayInms) {
 return new Promise(resolve => {
   setTimeout(() => {
     resolve(2);
   }, delayInms);
 });
}

//Bot coded by Wolf#6966
