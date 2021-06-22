const Discord = require('discord.js');
const { prefix, LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');
const pagination = require("discord.js-pagination");
const { red } = require("chalk");

module.exports = {
    name: "setup",
    description: "help command",

    async run(client, message, args) {

        const page1 = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} | Whitelist`)
            .setDescription(`\n*Whitelist your friends and bots so they won't get banned for doing certain actions*\n\n **Whitelist** | \`${prefix}wl [ID]\` \n **Unwhitelist** | \`${prefix}uwl [ID]\`\n **Unwhitelist All** | \`${prefix}uwall\`\n **Whitelisted Users** | \`${prefix}whitelisted\``)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const page2 = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} | Blacklist`)
            .setDescription(`\n*Blacklist the people you don't want joining back to your server/server(s) the bot is in.*\n\n**Blacklist** | \`${prefix}bl [ID]\` \n**Unblacklist** | \`${prefix}ubl [ID]\` \n**Unblacklist All** | \`${prefix}uball\` \n**Blacklisted** | \`${prefix}blacklisted\``)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const page3 = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} | Trust`)
            .setDescription(`\n*To the ones you trust the most.*\n\n**Trust** | \`${prefix}trust [ID]\` \n**Untrust** | \`${prefix}untrust [ID]\` \n**Untrust All** | \`${prefix}untrustall\` \n**Trusted** | \`${prefix}trusted\``)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const page4 = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} | Enabling & Disabling`)
            .setDescription(`\n**Not recommended. It allows for the bot to be used in other servers.**\n\n**Enable Guilds** | \`${prefix}eguilds\` \n**Disable Guilds** | \`${prefix}dguilds\``)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const page5 = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} | Adding & Removing`)
            .setDescription(`\n**Allows for removals or add ons of guilds.**\n\n**Add Guild** | \`${prefix}aguild\` \n**Remove Guild** | \`${prefix}rguild\`\n**List of Guilds** | \`${prefix}glist\``)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const pages = [ page1, page2, page3, page4, page5 ]

        const emojis = ["⏪", "⏩"];

        const timeout = '100000';

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
                pagination(message, pages, emojis, timeout).catch((err) => {
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
                pagination(message, pages, emojis, timeout).catch((err) => {
                    console.error(red(`[COMMAND FAILED] : [GUILD] ${message.guild.name} | [CHANNEL] ${message.channel.name} | [REASON] MISSING PERMISSIONS | ${err}`));
                });
            }
        }

    }
}