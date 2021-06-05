const Discord = require(`discord.js`);
const { Client, Collection, MessageEmbed,MessageAttachment } = require(`discord.js`);
const { readdirSync } = require(`fs`);
const { join } = require(`path`);
const db = require('quick.db');
const { TOKEN, PREFIX, AVATARURL, BOTNAME, } = require(`./config.json`);
const figlet = require("figlet");
const client = new Client({ disableMentions: `` , partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.login('ODQ0MDY5NjgyNTQ1MTY0Mjg5.YKNDJg.uEF14c_fnk3l-Zq16ZEg5pJHq7A');
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
    .setDescription (`
**[Ness Stats](https://discord.com/api/oauth2/authorize?client_id=844069682545164289&permissions=8&scope=bot)**
**Hey My name is Ness ✨ and My Work is to
play Music**`)    
    .addField("**Name** : ", `${client.user.tag} `, true)
    .addField("**ID Bot** : ", ` ${client.user.id} `, true)
    .addField("**Version** : ", `${process.version}`, true)
    .addField("**Prefix Bot** : ", `${prefix}`, true)
    .addField('**My Ping**' , `${client.ws.ping}` , true)
    .addField("**Servers** : ", `${client.guilds.cache.size}`, true)
    .addField("**Users** : ", `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`, true)
    .addField("**Channels** : ", `${client.channels.cache.size}`, true)
    .addField("**Owner Bot** : ", `<@749659830809002014>`, true)

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
  let channel = client.channels.cache.get("846693458433146910");
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
  let channel = client.channels.cache.get("846693458433146910");
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

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "girl")) {
    let man = [
      "https://cdn.discordapp.com/attachments/608711473652563968/830788035221782558/1-28.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830789683994820608/a_f173b0560e24959c0ac615948fff0428.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830788112267345920/1-29.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830788165534220308/1-30.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830791687264796682/1-7.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830791908049158154/gif-18.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830787973166399539/1-36.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830788023028547614/1-27.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830791979281022986/kjhgfghjkl.gif",
      "https://media.discordapp.net/attachments/694695166895849562/797086937068077106/20210106_210640.gif",
      "https://media.discordapp.net/attachments/687763784902770691/802939838793908244/a_b4686f704471be16d09d1cc6506cb4ce.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/818633362616614912/image2.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800849143341514772/a_16743dfad984f574da0b7bc2f9a0b07f.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800850948078698566/000_1-2.gif",
      "https://cdn.discordapp.com/attachments/820811352087330828/820954968793284658/image0.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/818630968776065064/image0.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/821516515391045642/image1.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/770320501204713472/image0-12.gif",
      "https://cdn.discordapp.com/attachments/694694493525377035/737301660455534642/GIF.6.gif",
      "https://cdn.discordapp.com/attachments/737803232600129608/799869130014064681/g7.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/766092295949910056/image2.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/818627992007344158/image0.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/821167015322320916/image4.gif",
      "https://media.discordapp.net/attachments/659108278969696256/802937736675852318/image1.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/818627981580566568/image4.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800849143341514772/a_16743dfad984f574da0b7bc2f9a0b07f.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/818633362616614912/image2.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800850872401657886/dfdc034aab34632039e45f23a089278f.gif",
      "https://cdn.discordapp.com/attachments/737803232600129608/799869125601918996/g5.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800859020608405514/gif1460.gif",
      "https://media.discordapp.net/attachments/711468868924604537/801769423602057286/239.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800859929871253584/gif2294.gif",
      "https://media.discordapp.net/attachments/711468868924604537/801933521139531846/received_235006021413313.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800852457621422080/image3.gif",
      "https://media.discordapp.net/attachments/711468868924604537/801935138866331648/1282579cc2b6456322f9954a71bad773.gif",
      "https://media.discordapp.net/attachments/711468868924604537/801822372885037066/379.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800852701654417468/image4.gif",
      "https://media.discordapp.net/attachments/687763784902770691/802943076841685002/a_ec53b39696d290c29525e63937a54753.gif",
      "https://media.discordapp.net/attachments/711468868924604537/802218051399319561/a_bd64995f97106974f1521805c8729f50.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800850947181510666/girl10-4-1.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800852457914892308/image0.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800849524448690186/image0.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800852700647522304/image7.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800849524708605983/kokokoko.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800850647737565204/image0.gif",
      "https://media.discordapp.net/attachments/711466145764343899/803297206466904095/a_6668c6cb37bdee73dc4129ba6de95aad.gif",
      "https://media.discordapp.net/attachments/711468868924604537/801773930326392862/a_5a14cc0370da659981c90e698f3e7602.gif",
      "https://media.discordapp.net/attachments/711468868924604537/801765536508674078/idlgif78.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/834079908556701716/image3.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/834079908035952660/image2.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/834079907516645436/image1.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/834079907000614962/image0.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/834079857419485204/image1.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/834078196462125136/image3.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/834074306823585802/image1.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/833937816751702036/image3.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/833937806639628298/image1.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/832106696469512232/image0-25.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/832106695677313054/image0-23.gif",
      "https://cdn.discordapp.com/attachments/757298003823427745/777462258510331934/a_702f87a38a181170e63d84348685f82f.gif",
      "https://cdn.discordapp.com/attachments/757298003823427745/775307152297558026/image2-1.gif",
      "https://cdn.discordapp.com/attachments/757298003823427745/775307149890682920/image1-1.gif",
      "https://cdn.discordapp.com/attachments/757298003823427745/775307149688438824/image0-5.gif",
      "https://cdn.discordapp.com/attachments/757298003823427745/775307116369674260/image2-2.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Girl**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FFF712`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "boy")) {
    let man = [
      "https://cdn.discordapp.com/attachments/694693923486171177/737013617538629722/a_fb64ba0c5d3b48b24d4334d7ac2b70af.gif",
      "https://cdn.discordapp.com/attachments/806591479677321246/827053056864419850/image1.gif",
      "https://cdn.discordapp.com/attachments/806591479677321246/824901137375297596/18.gif",
      "https://cdn.discordapp.com/attachments/806591479677321246/822479012185505832/image0.gif",
      "https://cdn.discordapp.com/attachments/806591479677321246/822478959760375828/image0.gif",
      "https://cdn.discordapp.com/attachments/806591479677321246/820956532808089620/image0.gif",
      "https://cdn.discordapp.com/attachments/694693923486171177/737203415339499621/a_c3451f3e42065b560180028d3a62ef5a.gif",
      "https://cdn.discordapp.com/attachments/810651927334748180/810651982611742750/image0.gif",
      "https://cdn.discordapp.com/attachments/630159060162838568/804791175729905764/641c084d12619535.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/806879646956257290/a_6b252acb2f2bcf57dfb4747ecdd768a7.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/807013802733862942/aaaaaaaa.gif",
      "https://cdn.discordapp.com/attachments/694693923486171177/800432438223437874/hit_gif_42.gif",
      "https://cdn.discordapp.com/attachments/737803513052266622/798100644471898152/image0.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/833757795055566889/image0.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/832424242859081748/image1.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833988792913887232/lyng_falna_filan_gif.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833988635992784916/image3-3.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833988515054223380/1gif5.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833982700875939880/a_7d8733c42cbbc774da11edf92089cf12.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833980821177106442/a_00763ffb06320132368f2abe116527ab.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833940802568454204/75.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833939244354633748/image0_2.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833816711357923368/Alkolik_Hayalet_74.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833792144765354005/JanTeL_4.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833757805211156500/ronesa_man_gif_2.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833702031747317800/15-1.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833701966566653962/02.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833701421487882260/6bbcdf2269a577932647febbaa46e6e5.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833700583725989928/12321.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833695252695089172/a_0ef2b749b8ab3dd543d8899b29750ed5.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833682771993559040/gif_1.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833676740697128970/aybala127.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833672337672896564/3d7ae23fdb8ab545427fa7c246cab645.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833668811604492288/43.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833668802063237160/44.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833622997842526278/image0-1.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833622977123450910/image.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833622974740693012/danyakruz_9.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833622951672545290/Eda65.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833622931678560286/4d7b3f2d15c66eaa5e05977a7d832733.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833622929895325706/Vesly_7.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833621308134260736/a_a0dd8e8af3678f920c00c7940df9f9ef.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833621296695869520/a_7e9dca2b21f9fa706cea87299734f42e.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833610337822834728/Zenard_94.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833610319695708170/Zenard_58.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833610296181915738/passenger_19.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833610206042128414/image6.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833610216771551252/image8.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833610220327534622/legion_gif_49-1.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833610165668413470/image0.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833609968464035850/erkeks_65.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833609895232143420/erkeks_12.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/833609785886769202/a_35986c612750900a1bbab91f41448a43.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Boy**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FFF712`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "baby")) {
    let man = [
      "https://media.discordapp.net/attachments/695056166790627409/802808234435149844/a_5a58bdc04b864e8a0cccaf13fba7e7ba.gif",
      "https://media.discordapp.net/attachments/699339066029768796/807247516059303936/charu_baby_gif_36.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/828318187392860190/781189745362468875.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/730499512602329198/14.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/736148143678291968/15.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/828318133205860382/image0_5-1-1.gif",
      "https://media.discordapp.net/attachments/695056166790627409/799769090612133888/Lish5.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/737156529278550046/10.gif",
      "https://media.discordapp.net/attachments/695056166790627409/805723122593693706/baby_3.gif",
      "https://media.discordapp.net/attachments/699339066029768796/804701528316575794/yiaa.gif",
      "https://media.discordapp.net/attachments/699339066029768796/804701034940203028/a_55c21f7fcc948fe884c4e1f7949a68d9.gif",
      "https://media.discordapp.net/attachments/695056166790627409/802808312789205002/a_f30d374c5d9a89b6a9db3d441ddcf9cd.gif",
      "https://media.discordapp.net/attachments/695056166790627409/805723169146404864/baby_9.gif",
      "https://media.discordapp.net/attachments/695056166790627409/798943765007695912/image0-1-6.gif",
      "https://media.discordapp.net/attachments/695056166790627409/805723870035968010/baby_27.gif",
      "https://media.discordapp.net/attachments/695056166790627409/805724580777164830/baby_44.gif",
      "https://media.discordapp.net/attachments/695056166790627409/798944017777426442/a_197ba5b1757b74b7990894a652bb3b48.gif",
      "https://media.discordapp.net/attachments/699339066029768796/804701212569239582/hm.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Baby**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FFF712`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "neon")) {
    let man = [
      "https://cdn.discordapp.com/attachments/764927608013193276/788707397609979914/image0.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/801942276217372672/image0.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/801942418513461328/image1.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/782272576885096468/image0.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/801942291785973800/image0.gif",
      "https://cdn.discordapp.com/attachments/767332506101219348/796047924865138758/gifcity58.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/793756128646922270/image0.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/801942413123125309/image1.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/780790908060172308/image0.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/791247223282335784/image0.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/773386784272810024/image0.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/764931887810478080/image0.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/784420144617095178/a_b5b818f02a358b8463b59e7add4cb24c-1.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/779428418605023252/image0.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/768134950658244608/image7.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/801942442193453096/image1.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/801941864369881098/image0.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/793756075219615754/image0.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/784345886070407208/image0.gif",
      "https://cdn.discordapp.com/attachments/767332506101219348/780471732195557397/devaergagr.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/793756604561883136/image0.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/793756092261072936/image0.gif",
      "https://cdn.discordapp.com/attachments/764927608013193276/796025346340028466/image0.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Neon**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FFF712`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "couple")) {
    let man = [
      "https://cdn.discordapp.com/attachments/787757651752779826/800870200563073075/image0.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800871282342101053/image2.gif",
      "https://cdn.discordapp.com/attachments/694694675679936585/814441253524865064/couple-1.gif",
      "https://cdn.discordapp.com/attachments/672961356412092416/809824375557324850/a_6249c4388698252f938931a30f6eec73.gif",
      "https://cdn.discordapp.com/attachments/694694675679936585/801547744543899708/agabefloransa1.gif",
      "https://cdn.discordapp.com/attachments/737807251825360977/805157436281454672/image2.gif",
      "https://cdn.discordapp.com/attachments/737807251825360977/799659072424771594/image0.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800871281264033802/image0.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800873426163728384/image2.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800870999155146772/image1.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800870999155146772/image1.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800870911968018442/image2.gif",
      "https://cdn.discordapp.com/attachments/694694675679936585/801547951390326884/a_211be57987d0618ccccc9e0a6cbb5472.gif",
      "https://cdn.discordapp.com/attachments/737807251825360977/809515129909542942/image0.gif",
      "https://cdn.discordapp.com/attachments/672961356412092416/810960039149305866/a_d8fe322eef2273c659378db6f05023a8.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800874142051991612/image3.gif",
      "https://cdn.discordapp.com/attachments/694694675679936585/800434435136421888/hit_gif_18.gif",
      "https://cdn.discordapp.com/attachments/737807251825360977/809515181884833862/image0.gif",
      "https://cdn.discordapp.com/attachments/737807251825360977/799657981729308703/image0.gif",
      "https://cdn.discordapp.com/attachments/694694675679936585/800540805848236092/a_1ce7b937e5e5b1ac4d8a540e3d1dcf39.gif",
      "https://cdn.discordapp.com/attachments/694694675679936585/800546050196111370/image0-1.gif",
      "https://cdn.discordapp.com/attachments/694694675679936585/800464338020204564/lietra50.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Couple**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FFF712`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "anime")) {
    let man = [
      "https://media.discordapp.net/attachments/697505578972348436/833326270594416690/1508558338__.gif",
      "https://media.discordapp.net/attachments/694694884459937862/797094656122683412/a_80133297a8a819f10e44ad8e95a5ff81.gif",
      "https://media.discordapp.net/attachments/608711485849337856/832938867744702470/anim7.gif",
      "https://media.discordapp.net/attachments/737803741037854750/791307773039214652/image0.gif",
      "https://media.discordapp.net/attachments/608711485849337856/833094452335345712/13.gif",
      "https://media.discordapp.net/attachments/737803741037854750/822619401496559616/f82abffafd1d1912e70ec97c1be4e5d18971b3b2_hq.gif",
      "https://media.discordapp.net/attachments/608711485849337856/833019544372117514/3d752e372b97b592c3abea2374bdf9be.gif",
      "https://media.discordapp.net/attachments/811224229244436490/831226210079211560/1618250160466.gif",
      "https://media.discordapp.net/attachments/608711485849337856/833132555309416508/tenor.gif",
      "https://media.discordapp.net/attachments/694694884459937862/791631676882681856/anime36.gif",
      "https://media.discordapp.net/attachments/737803741037854750/780814686329110575/image0.gif",
      "https://media.discordapp.net/attachments/770397639857668168/829127792649043978/image1-4.gif",
      "https://media.discordapp.net/attachments/694694884459937862/796668829169614858/a_ce421161aa7135a555768c4f349c11cb.gif",
      "https://media.discordapp.net/attachments/737803741037854750/824257214536744970/p2.gif",
      "https://media.discordapp.net/attachments/608711485849337856/832445218283323462/4492f2948473a9271158bc37246f4e3f.gif",
      "https://media.discordapp.net/attachments/694694884459937862/793415212635521024/141.gif",
      "https://media.discordapp.net/attachments/694694884459937862/790235751056277564/971f0b5b-d225-4b27-9027-5445e21f4322.gif",
      "https://media.discordapp.net/attachments/694694884459937862/795922584981471243/image0-4-1.gif",
      "https://media.discordapp.net/attachments/608711485849337856/832445378137686016/image1.gif",
      "https://media.discordapp.net/attachments/811224229244436490/831226211119267870/1618250160475.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Anime**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FFF712`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "animal")) {
    let man = [
      "https://cdn.discordapp.com/attachments/608711488806584330/823219504578166834/Gif_Pack_-_HostleCreative_73.gif",
      "https://cdn.discordapp.com/attachments/737807699412254811/788719341650051082/image0.gif",
      "https://cdn.discordapp.com/attachments/659108301690372108/753036329700556820/hym.gif",
      "https://cdn.discordapp.com/attachments/608711488806584330/827973064956051476/c9e8306166bf97a20f14fc6093861d8c.gif",
      "https://cdn.discordapp.com/attachments/608711488806584330/809648267091771392/image1.gif",
      "https://cdn.discordapp.com/attachments/737807699412254811/801938698412621844/image1.gif",
      "https://cdn.discordapp.com/attachments/608711488806584330/832917963061461042/291359420049201.gif",
      "https://cdn.discordapp.com/attachments/659108301690372108/782973562251378718/oxytyche_17.gif",
      "https://cdn.discordapp.com/attachments/608711488806584330/823559629475807232/1464342173-cute-puppy-gif.gif",
      "https://cdn.discordapp.com/attachments/737807699412254811/791927311342632980/image0.gif",
      "https://cdn.discordapp.com/attachments/737807699412254811/791681658532266024/image0.gif",
      "https://cdn.discordapp.com/attachments/737807699412254811/801939015061602344/image0.gif",
      "https://cdn.discordapp.com/attachments/737807699412254811/791927410131206164/image0.gif",
      "https://cdn.discordapp.com/attachments/608711488806584330/812304250247970856/tenor_73.gif",
      "https://cdn.discordapp.com/attachments/737807699412254811/780698342991593482/image0.gif",
      "https://cdn.discordapp.com/attachments/659108301690372108/785123256813617172/dvBgr7pA6FTJOMOALY.gif",
      "https://cdn.discordapp.com/attachments/737807699412254811/750275296024068156/image0.gif",
      "https://cdn.discordapp.com/attachments/737807699412254811/791927203671310366/image0.gif",
      "https://cdn.discordapp.com/attachments/659108301690372108/830922706945441892/7223f242debe0af5ac2ab1b9b1dce93a-5.gif",
      "https://cdn.discordapp.com/attachments/737807699412254811/791681662910988298/image0.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Animal**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FFF712`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "emoji")) {
    let man = [
      "https://cdn.discordapp.com/attachments/772439349056634890/800056809553002546/image0.gif",
      "https://media.discordapp.net/attachments/762954136744099842/799807874905669632/seytankus_Invicta.gif",
      "https://cdn.discordapp.com/attachments/772439349056634890/800057099727536148/image0.gif",
      "https://media.discordapp.net/attachments/762954136744099842/799810448664821760/3505_thumps_down.gif",
      "https://cdn.discordapp.com/emojis/779961566367055874.gif",
      "https://media.discordapp.net/attachments/762954136744099842/799811567650471996/Enes_Acar_19.gif",
      "https://media.discordapp.net/attachments/699520919328129055/803610061255213106/Haraketli_Emoji_101.gif",
      "https://cdn.discordapp.com/attachments/772439349056634890/800056826837467159/image0.gif",
      "https://cdn.discordapp.com/attachments/772439349056634890/794117939515228160/image0.gif",
      "https://cdn.discordapp.com/emojis/793415129324322836.gif",
      "https://cdn.discordapp.com/emojis/793414854509199381.gif",
      "https://cdn.discordapp.com/emojis/793415054371323905.gif",
      "https://cdn.discordapp.com/emojis/793415290548781087.gif",
      "https://cdn.discordapp.com/emojis/793415033283543051.gif",
      "https://cdn.discordapp.com/emojis/793415216041033761.gif",
      "https://cdn.discordapp.com/emojis/793415108382162955.gif",
      "https://cdn.discordapp.com/emojis/793415088961880075.gif",
      "https://cdn.discordapp.com/emojis/793415190531276850.gif",
      "https://cdn.discordapp.com/emojis/793415244264636426.gif",
      "https://cdn.discordapp.com/emojis/793219066991083561.gif",
      "https://cdn.discordapp.com/emojis/793219133159243817.gif",
      "https://cdn.discordapp.com/emojis/793219222309437481.gif",
      "https://cdn.discordapp.com/emojis/793218957628276736.gif",
      "https://cdn.discordapp.com/emojis/793218913470382101.gif",
      "https://cdn.discordapp.com/emojis/793218844558098453.gif",
      "https://cdn.discordapp.com/emojis/772402619070152725.gif",
      "https://cdn.discordapp.com/emojis/772402483279691797.gif",
      "https://cdn.discordapp.com/emojis/793219623389626398.gif",
      "https://cdn.discordapp.com/emojis/793219644202287124.gif",
      "https://cdn.discordapp.com/emojis/793405575500660746.gif",
      "https://cdn.discordapp.com/emojis/787762520085495829.gif",
      "https://cdn.discordapp.com/emojis/793219501088702474.gif",
      "https://cdn.discordapp.com/emojis/793219531644338177.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Emoji**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FFF712`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("guildMemberAdd", async member => {
  let channel = member.guild.channels.cache.find(c => c.name === 'new-join')
  let WELCOME = new Discord.MessageEmbed()
  .setTitle('New Join😍!')
  .addField("User Name:", `<@${member.user.id}>`, true)
  .addField("User id:", `${member.user.id}`, true)
  .addField("All User:", ` ${member.guild.memberCount}`, true)
  .addField("Server:", ` ${member.guild.name}`, true)
  .setColor('BLUE')
  .setThumbnail(cleint.user.avatarURL)
  .setTimestamp()
  .setImage("https://cdn.discordapp.com/attachments/837954491403206676/850293441229226024/welcome-15.gif")
  .setFooter('')
  channel.send(WELCOME)
})


client.on("guildMemberRemove", async member => {
  let channel = member.guild.channels.cache.find(c => c.name === 'left')
  let WELCOME = new Discord.MessageEmbed()
  .setThumbnail(clieng.user.avatarURL)
  .addField("Name:", `<@${member.user.id}>`, true)
  .addField("id:", `${member.user.id}`, true)
  .addField("Now We Have:", ` ${member.guild.memberCount} Members`, true)
  .addField("Server:", ` ${member.guild.name}`, true)
  .setColor('YELLOW')
  .setTimestamp()
  .setImage("")
  .setFooter('')
  channel.send(WELCOME)
})


function delay(delayInms) {
 return new Promise(resolve => {
   setTimeout(() => {
     resolve(2);
   }, delayInms);
 });
}

//Bot coded by Wolf#6966
