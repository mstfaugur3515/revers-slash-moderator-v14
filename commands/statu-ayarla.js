const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"stats-kanal",
    description: 'Aktiflik Kanal Sistemini Ayarlar!',
    type:1,
    options: [
        {
            name:"kanal1",
            description:"Ayarlama İşlemleri",
            type:1,
            options:[{name:"kanal",description:"Kayıtsız Kanalını Ayarlar!",type:7,required:true,channel_types:[0]}]            
        },
        {
            name:"kanal2",
            description:"Ayarlama İşlemleri",
            type:1,
            options:[{name:"kanal",description:"Kayıtsız Kanalını Ayarlar!",type:7,required:true,channel_types:[0]}]            
        },
        {
            name:"kanal3",
            description:"Ayarlama İşlemleri",
            type:1,
            options:[{name:"kanal",description:"Kayıtsız Kanalını Ayarlar!",type:7,required:true,channel_types:[0]}]            
        },
        {
            name:"kanal4",
            description:"Ayarlama İşlemleri",
            type:1,
            options:[{name:"kanal",description:"Kayıtsız Kanalını Ayarlar!",type:7,required:true,channel_types:[0]}]            
        },
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "Kanalları Yönet Yetkin Yok!", ephemeral: true})
    
    const kanal1 = interaction.options.getChannel('kanal1')
   db.set(`statkanal1_${interaction.guild.id}`, kanal1.id)
    const kanal2 = interaction.options.getChannel('kanal2')
   db.set(`statkanal2_${interaction.guild.id}`, kanal2.id)
    const kanal3 = interaction.options.getChannel('kanal3')
   db.set(`statkanal3_${interaction.guild.id}`, kanal3.id)
    const kanal4 = interaction.options.getChannel('kanal4')
   db.set(`statkanal4_${interaction.guild.id}`, kanal4.id)
    
   interaction.reply("Hoşgeldin Kanalı Kanalı Başarıyla <#"+kanal1+"> Olarak Ayarlandı!")
}

};
