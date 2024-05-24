const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"stats-ayarla",
    description: 'Kayıtlı rol ayarlarsın!',
    type:1,
    options: [
        {
            name:"rol",
            description:"Lütfen bir rol etiketle!",
            type:8,
            required:true
        },
        {
            name:"rol2",
            description:"Lütfen ikinci bir rol etiketle!",
            type:8,
            required:true
        },
        {
            name:"rol3",
            description:"Lütfen ikinci bir rol etiketle!",
            type:8,
            required:true
        },
        {
            name:"rol4",
            description:"Lütfen ikinci bir rol etiketle!",
            type:8,
            required:true
        },
       
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    const rol = interaction.options.getRole('rol')
    db.set(`rol1_${interaction.guild.id}`, rol.id)
    const rol2 = interaction.options.getRole('rol2')
    db.set(`rol2_${interaction.guild.id}`, rol2.id)
    const rol3 = interaction.options.getRole('rol3')
    db.set(`rol3_${interaction.guild.id}`, rol2.id)
    const rol4 = interaction.options.getRole('rol4')
    db.set(`rol4_${interaction.guild.id}`, rol2.id)
    interaction.reply({content: "Kayıtlı Rolü Başarıyla <@&"+rol+"> - <@&"+rol2+"> Olarak Ayarlandı."})
}

};
