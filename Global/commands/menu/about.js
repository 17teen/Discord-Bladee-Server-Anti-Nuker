const Discord = require('discord.js');
const { prefix, author, authorID, github, founder, founderId, sourceCode, SupportServer } = require('../settings.json');
const { red } = require("chalk");

module.exports = {
    name: "about",
    description: "about command",

    async run(client, message, args) {
        const userCount = client.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c);
        const about = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} | About`)
            .setDescription(`\n\n**Author of Anti Nuke Tool** \n\n \`Discord:\` <@${authorID}> | ${author} \n \`Github:\` [7teen](${github}) \n \`Source Code:\` [Bladee Anti by 7teen](${sourceCode}) \n \`Telegram:\` [7teen](https://t.me/clairvoyant7teen)\n\n**Founder** \n\n\`Discord:\` <@${founderId}> | \`${founder}\`\n \`Support Server:\` [Click Here](${SupportServer}) \n \n **Stats:**\n \`${userCount}\` __**Users Protected.**__ \n \`${client.guilds.cache.size}\` __**Servers Protected.**__   \n \n **Bot Description:** \n \`Creation Date:\` 05/01/2021 \n \`Language:\` JavaScript, Batch \n \`Operating System:\` Windows`)
            .setThumbnail(`${client.user.avatarURL({ dynamic: true })}`)
            .setFooter(`© ${client.user.username} | Prefix: ${prefix} | Author: ${author}`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());
        message.channel.send(about).catch((err) => {
            console.error(red(`[COMMAND FAILED] : [GUILD] ${message.guild.name} | [CHANNEL] ${message.channel.name} | [REASON] MISSING PERMISSIONS | ${err}`));
        });
    }
}