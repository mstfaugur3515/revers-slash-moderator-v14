const { Client, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
  name: "yardım",
  description: "Botun yardım menüsüne bakarsın!",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const embed = new EmbedBuilder()
    .setTitle("Patlıcan - Yardım Menüsü!")
    .setDescription("**・Moderasyon Sistemi ↷**\n\n > /ban-list - **Banlı Kullanıcıları Gösterir!**\n> /ban - **Bir Üyeyi Yasaklarsın!**\n> /emojiler - **Emojileri Görürsün!**\n> /forceban - **ID İle Bir Kullanıcıyı Yasaklarsın!**\n> /giriş-çıkış - **Giriş çıkış kanalını ayarlarsın!**\n> /kanal-açıklama - **Kanalın Açıklamasını Değiştirirsin!**\n> /kick - **Bir Üyeyi Atarsın!**\n> /küfür-engel - **Küfür Engel Sistemini Açıp Kapatırsın!**\n> /oylama - **Oylama Açarsın!**\n> /reklam-engel - **Reklam Engel Sistemini Açarsın!**\n> /rol-al - **Rol Alırsın**\n> /rol-oluştur - **Rol Oluşturursun!**\n> /rol-ver - **Rol Verirsin!**\n> /sa-as - **Selam Sistemine Bakarsın!**\n> /temizle - **Mesaj Silersin!**\n> /unban - **Bir üyenin yasağını kaldırırsın!**⠀⠀⠀⠀⠀\n\n**・Kayıt Sistemi ↷**\n\n > /kadın **Kadın Rolü Verirsin**\n> /erkek **Erkek Rolü Verirsin**\n> /kadın-kayıt-ayarla - ** Kadın Rolü Ayarlarsın**\n> /erkek-kayıt-ayarla - **Erkek Rolü Ayarlarsın**\n> /kayıtsız-rol-ayarla - **Kayıtsız Otorolü Ayarlarsın!**\n\n**・Kullanıcı Sistemi ↷**\n\n > /avatar - **Bir Kullanıcının Avatarına Bakarsın!**\n> /afk - **Sebepli Afk Olursun!**\n> /emoji-yazı - **Bota Emoji İle Yazı Yazdırırsın!**\n> /istatistik - **Bot istatistiklerini gösterir!**\n> /kurucu-kim - **Kurucuyu Gösterir!**\n> /ping - **Botun pingini gösterir!**\n> /yardım - **Yardım Menüsünü Gösterir!**")
    .setColor("Random")
interaction.reply({embeds: [embed], ephemeral: true})
  }

};
