const Discord = require('discord.js');
const { inviteLink } = require('../settings.json');

module.exports = {
    name: "invite",
    description: "Invite bot to server command",

    async run(client, message, args) {

        const inviteEmbed = new Discord.MessageEmbed()
            .setDescription(`[Click Here.](${inviteLink})`)
            .setColor(0x36393E);
        message.channel.send(inviteEmbed)
    }
}