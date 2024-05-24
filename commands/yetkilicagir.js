const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
const Discord = require("discord.js")
module.exports = {
  name: "yetkili",
  description: "Botun pingini görürsün!",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const { user, guildId, channel } = interaction;


     
interaction.channel.send( "reis sunucuya biri geldi <@&1167889535745654964>")
interaction.reply({content: "Başarıyla yetkiliye bildirim gönderildi.", ephemeral: true}) 
  }
};