const Discord = require('discord.js');
const { prefix, author } = require('../settings.json');
const { red } = require("chalk");

module.exports = {
    name: "other",
    description: "other command",

    async run(client, message, args) {

        const help = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} | Moderation `)
            .setDescription(` Moderation.
\n **Banning:**
\n **Ban** | \`${prefix}ban [user]\` \n **Unban** | \`${prefix}unban [user] (reason)\` \n **Unban All** | \`${prefix}unbanall\`
\n **Kicking:**
\n **Kick** | \`${prefix}kick [user]\`
\n **Messages:**
\n **Purge** | \`${prefix}purge [Numb]\` *Max: 100 | 2 Weeks Old*
                `)
            .setFooter(`© ${client.user.username} | Prefix: ${prefix} | By: ${author}`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());
        message.channel.send(help).catch((err) => {
            console.error(red(`[COMMAND FAILED] : [GUILD] ${message.guild.name} | [CHANNEL] ${message.channel.name} | [REASON] MISSING PERMISSIONS | ${err}`));
        });
    }
}