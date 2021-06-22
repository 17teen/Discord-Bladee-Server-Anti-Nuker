const Discord = require('discord.js');
const { prefix, LockGuildID, PermittedGuilds, AllowGuilds, author } = require('../settings.json');
const { red } = require("chalk");

module.exports = {
    name: "other",
    description: "other command",

    async run(client, message, args) {

        const AllowedGuildIDs = PermittedGuilds.find((g) => g === `${message.guild.id}`)
        if (AllowGuilds === false) {
            if (message.guild.id !== LockGuildID) {
                const Unauth = new Discord.MessageEmbed()
                    .setDescription(`Unauthorised command usage.`)
                    .setColor(0x36393E);

                const Leaving = new Discord.MessageEmbed()
                    .setDescription(`Leaving Guild...`)
                    .setColor(0x36393E);

                setTimeout(function () {
                    message.channel.send(Unauth).then(msg => {
                        msg.delete({ timeout: 2000 })
                    })
                }, 500)
                setTimeout(function () {
                    message.channel.send(Leaving).then(msg => {
                        msg.delete({ timeout: 1000 })
                    })
                }, 4000)
                setTimeout(function () {
                    message.guild.leave();
                }, 6000)
            } else {
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
        } else {
            if (message.guild.id !== AllowedGuildIDs) {
                const Unauth = new Discord.MessageEmbed()
                    .setDescription(`Unauthorised command usage.`)
                    .setColor(0x36393E);

                const Leaving = new Discord.MessageEmbed()
                    .setDescription(`Leaving Guild...`)
                    .setColor(0x36393E);

                setTimeout(function () {
                    message.channel.send(Unauth).then(msg => {
                        msg.delete({ timeout: 2000 })
                    })
                }, 500)
                setTimeout(function () {
                    message.channel.send(Leaving).then(msg => {
                        msg.delete({ timeout: 1000 })
                    })
                }, 4000)
                setTimeout(function () {
                    message.guild.leave();
                }, 6000)
            } else {
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
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}