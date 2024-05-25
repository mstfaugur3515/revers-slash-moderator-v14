const { Client, GatewayIntentBits, Partials } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const db = require("croxydb")
const moment = require('moment');
const config = require('./config.json');
const keep_alive = require('./keep_alive.js')
const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs")
readdirSync('./commands').forEach(f => {
  if(!f.endsWith(".js")) return;

 const props = require(`./commands/${f}`);

 client.commands.push({
       name: props.name.toLowerCase(),
       description: props.description,
       options: props.options,
       dm_permission: props.dm_permission,
       type: 1
 });

console.log(`[COMMAND] ${props.name} komutu yüklendi.`)

});
readdirSync('./events').forEach(e => {

  const eve = require(`./events/${e}`);
  const name = e.split(".")[0];

  client.on(name, (...args) => {
            eve(client, ...args)
        });
console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(process.env.TOKEN).catch(err => {
console.error('[!] Gerçesiz token.Giriş yapılamadı!')
console.error(err.message)
});


client.on("guildMemberAdd", async (member) => {
   const rol = db.get(`otorol_${member.guild.id}`)
   const kayıtkanal = db.get(`kayitkanal_${member.guild.id}`)
   
   const avatar = client.user.displayAvatarURL({ dynamic:true })
   const username = client.user.username

   const arrow = member.guild.emojis.cache.find(emoji => emoji.name === 'Verify');
   const verify = member.guild.emojis.cache.find(emoji => emoji.name === 'Verify');
   
   const kayıtsızNick = "Isim | Yaş" == "" ? null : "Isim | Yaş"
  
   if (kayıtsızNick) await member.setNickname(kayıtsızNick)
  
  setTimeout(function(){
    if(!rol) return;
    member.roles.add(rol).catch(() => {})
  },1500)

     
   const embed = new Discord.EmbedBuilder()
   .setColor("#0080FF")
   .setAuthor({ name: `${username}`, iconURL: `${avatar}`, url: 'https://discord.gg/zGwFVQkX' })


   .setDescription(`<@${member.user.id}>**, Aramıza Hoşgeldin.**

   ${arrow}  **Seninle Beraber ${member.guild.memberCount} Kişiyiz.**  
   ${arrow} **Kayıt Olmak Için Ses Teyit Odalarından Birine Geçip Bekleyiniz.**
   ${arrow} **Kayıt Tarihi: ${moment.utc(member.user.createdAt).format('DD.MM.YY')}**
   ${arrow} **Güvenli Hesap!**

  ${verify} **Bol keyifli zaman geçirmeniz dileğiyle..**
   `,true)

   .setTimestamp()
   .setImage("https://i.hizliresim.com/2la4xoi.gif")

   member.guild.channels.cache.get(kayıtkanal).send({embeds: [embed]})
 
});

client.on("guildMemberAdd", member => {
  const kanal = db.get(`hgbb_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:inbox_tray: | ${member} sunucuya katıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`})
})

client.on("messageCreate", async message => {
  const db = require("croxydb");

  if (await db.get(`afk_${message.author.id}`)) {
   
    db.delete(`afk_${message.author.id}`);

    message.reply("Afk Modundan Başarıyla Çıkış Yaptın!");
  }

  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  var sebep = await db.get(`afk_${kullanıcı.id}`);

  if (sebep) {
    message.reply("Etiketlediğin Kullanıcı **"+sebep+"** Sebebiyle Afk Modunda!");
  }
});

//client.on("guildMemberAdd", member => {
  //const tag = db.get(`ototag_${member.guild.id}`)
  //if(!tag) return;
 // member.setNickname(`${tag} | ${member.displayName}`)
//})
client.on("guildMemberRemove", member => {
  const kanal = db.get(`hgbb_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:outbox_tray: | ${member} sunucudan ayrıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`})
})

client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let kufur = db.fetch(`kufurengel_${message.guild.id}`)
  if(!kufur) return;
  
  if(kufur) {
  const kufurler = [
    
    "amk",
    "piç",
    "yarrak",
    "oç",
    "göt",
    "amq",
    "yavşak",
    "amcık",
    "amcı",
    "orospu",
    "sikim",
    "sikeyim",
    "aq",
    "mk"
       
  ]
  
if(kufurler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`Hey <@${message.author.id}>, Bu Sunucuda Küfür Engel Sistemi Aktif! `)
}
}
})
client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let reklamlar = db.fetch(`reklamengel_${message.guild.id}`)
  if(!reklamlar) return;
  
  if(reklamlar) {

  const linkler = [
    
    ".com.tr",
    ".net",
    ".org",
    ".tk",
    ".cf",
    ".gf",
    "https://",
    ".gq",
    "http://",
    ".com",
    ".gg",
    ".porn",
    ".edu"
       
  ]
  
if(linkler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`Hey <@${message.author.id}>, Bu Sunucuda Reklam Engel Sistemi Aktif! `)
}
}
})

client.on("messageCreate", (message) => {
  
  let saas = db.fetch(`saas_${message.guild.id}`)
  if(!saas) return;
  
  if(saas) {
  
  let selaamlar = message.content.toLowerCase()  
if(selaamlar === 'sa' || selaamlar === 'slm' || selaamlar === 'sea' || selaamlar === ' selamünaleyküm' || selaamlar === 'Selamün Aleyküm' || selaamlar === 'selam'){

message.channel.send(`<@${message.author.id}> Aleykümselam, Hoşgeldin ☺️`)
}
}
})


client.once('ready', message => {
   let guild = client.guilds.cache.get(config.guildid)
        
   const stats = db.get(`statkanal1_${guild}`) || ""

		

  setInterval(() => {
	      client.channels.cache.get(stats).setName(`🟢 ${guild.members.cache.filter(m => m.presence?.status == 'online').size} ⛔ ${guild.members.cache.filter(m => m.presence?.status == 'dnd').size} 🌙 ${guild.members.cache.filter(m => m.presence?.status == 'idle').size} ⚫ ${guild.members.cache.filter(m => m.presence?.status == 'offline' || !m.presence).size} `)
	      console.log(`[!] Güncelledim!`);
  }, 600000);
  
   console.log(`[!] Stats kanalları hazır!`);
 
});



client.on("guildMemberAdd", member => {
  
   const toplam = db.get(`statkanal2_${member.guild.id}`) || ""
   const uye = db.get(`statkanal3_${member.guild.id}`) || ""
   const bot = db.get(`statkanal4_${member.guild.id}`) || ""
 
      member.guild.channels.cache.get(toplam).setName(`💜 Toplam ${member.guild.memberCount}`)
      member.guild.channels.cache.get(uye).setName(`💜 Uye ${member.guild.members.cache.filter((m) => !m.user.bot).size}`); // This text is also changeable, still keep the code in ${}'s
      member.guild.channels.cache.get(bot).setName(`🤖 Bot - ${member.guild.members.cache.filter(member => member.user.bot).size}`)
  	//	member.guild.channels.cache.get("1241974151280066572").setName(`🟢 ${member.guild.members.cache.filter(m => m.presence?.status == 'online').size} ⛔ ${member.guild.members.cache.filter(m => m.presence?.status == 'dnd').size} 🌙 ${member.guild.members.cache.filter(m => m.presence?.status == 'idle').size} ⚫ ${member.guild.members.cache.filter(m => m.presence?.status == 'offline' || !m.presence).size} `)

});


client.on("guildMemberRemove", (member) => {
  
   const toplam = db.get(`statkanal2_${member.guild.id}`) || ""
   const uye = db.get(`statkanal3_${member.guild.id}`) || ""
   const bot = db.get(`statkanal4_${member.guild.id}`) || ""
 
      member.guild.channels.cache.get(toplam).setName(`💜 Toplam ${member.guild.memberCount}`)
      member.guild.channels.cache.get(uye).setName(`💜 Uye ${member.guild.members.cache.filter((m) => !m.user.bot).size}`); // This text is also changeable, still keep the code in ${}'s
      member.guild.channels.cache.get(bot).setName(`🤖 Bot - ${member.guild.members.cache.filter(member => member.user.bot).size}`)
  	//	member.guild.channels.cache.get("1241974151280066572").setName(`🟢 ${member.guild.members.cache.filter(m => m.presence?.status == 'online').size} ⛔ ${member.guild.members.cache.filter(m => m.presence?.status == 'dnd').size} 🌙 ${member.guild.members.cache.filter(m => m.presence?.status == 'idle').size} ⚫ ${member.guild.members.cache.filter(m => m.presence?.status == 'offline' || !m.presence).size} `)

});



