const Discord = require('discord.js');
const { prefix, author } = require('../settings.json');
const { red } = require('chalk');

module.exports = {
    name: "help",
    description: "help command",

    async run(client, message, args) {
        const help = new Discord.MessageEmbed()
            .setTitle(`${client.user.username}`)
            .setDescription(`Anti Nuke. \n\n\`SET-UP\` \n\`OTHER\` \n\`INVITE\` \n\`ABOUT\` `)
            .setThumbnail(`${client.user.avatarURL({ dynamic: true })}`)
            .setFooter(`© ${client.user.username} | Prefix: ${prefix} | By: ${author}`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());
        message.channel.send(help).catch((err) => {
            console.error(red(`[COMMAND FAILED] : [GUILD] ${message.guild.name} | [CHANNEL] ${message.channel.name} | [REASON] MISSING PERMISSIONS | ${err}`));
        });
    }
}
