const Discord = require('discord.js');
const { prefix, DEV_TEAM, founderId } = require('../settings.json');
const pagination = require("discord.js-pagination");
const { red } = require("chalk");

module.exports = {
    name: "setup",
    description: "help command",

    async run(client, message, args) {

        const DevsID = DEV_TEAM.find((userData) => userData === `${message.author.id}`)

        if (message.author.id === DevsID || founderId) {
            const page0 = new Discord.MessageEmbed()
            .setTitle(`Developer Mode | Database Settings`)
            .setDescription(`\n*Create, Reset, Load databases*\n\n **Create Database** | \`${prefix}set\` \n **Reset** | \`${prefix}reset\``)
            .setColor(0x36393E)
            .setTimestamp(Date.now());
    
            const page1 = new Discord.MessageEmbed()
                .setTitle(`Developer Mode| Whitelist`)
                .setDescription(`\n*Whitelist your friends and bots so they won't get banned for doing certain actions*\n\n **Whitelist** | \`${prefix}wl [ID]\` \n **Unwhitelist** | \`${prefix}uwl [ID]\`\n **Unwhitelist All** | \`${prefix}uwall\`\n **Whitelisted Users** | \`${prefix}whitelisted\``)
                .setColor(0x36393E)
                .setTimestamp(Date.now());
    
            const page2 = new Discord.MessageEmbed()
                .setTitle(`Developer Mode | Blacklist`)
                .setDescription(`\n*Blacklist the people you don't want joining back to your server/server(s) the bot is in.*\n\n**Blacklist** | \`${prefix}bl [ID]\` \n**Unblacklist** | \`${prefix}ubl [ID]\` \n**Unblacklist All** | \`${prefix}uball\` \n**Blacklisted** | \`${prefix}blacklisted\``)
                .setColor(0x36393E)
                .setTimestamp(Date.now());
    
            const page3 = new Discord.MessageEmbed()
                .setTitle(`Developer Mode | Trust`)
                .setDescription(`\n*To the ones you trust the most.*\n\n**Trust** | \`${prefix}trust [ID]\` \n**Untrust** | \`${prefix}untrust [ID]\` \n**Untrust All** | \`${prefix}untrustall\` \n**Trusted** | \`${prefix}trusted\``)
                .setColor(0x36393E)
                .setTimestamp(Date.now());

                const page4 = new Discord.MessageEmbed()
                .setTitle(`Developer Mode | Global Blacklisting`)
                .setDescription(`\n*Hard ban users from this bot*\n\n**Blacklist** | \`${prefix}gbl [ID]\` \n**Unblacklist** | \`${prefix}gubl [ID]\` \n**Unblacklist All** | \`${prefix}gbclear\` \n**Blacklisted** | \`${prefix}gblacklisted\``)
                .setColor(0x36393E)
                .setTimestamp(Date.now());

                const page5 = new Discord.MessageEmbed()
                .setTitle(`Developer Mode | Add Or Remove Devs`)
                .setDescription(`\n*Only Accessed By Bot Founder*\n\n**Add Dev** | \`${prefix}adev\` \n**Remove Guild** | \`${prefix}rdev\``)
                .setColor(0x36393E)
                .setTimestamp(Date.now());
    
            const pages = [ page0, page1, page2, page3, page4, page5 ]
    
            const emojis = ["⏪", "⏩"];
    
            const timeout = '100000';
    
            pagination(message, pages, emojis, timeout).catch((err) => {
                console.error(red(`[COMMAND FAILED] : [GUILD] ${message.guild.name} | [CHANNEL] ${message.channel.name} | [REASON] MISSING PERMISSIONS | ${err}`));
            });
        } else {
            const page0 = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} | Database Settings`)
            .setDescription(`\n*Create, Reset, Load databases*\n\n **Create Database** | \`${prefix}set\` \n **Reset** | \`${prefix}reset\``)
            .setColor(0x36393E)
            .setTimestamp(Date.now());
    
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
    
            const pages = [ page0, page1, page2, page3 ]
    
            const emojis = ["⏪", "⏩"];
    
            const timeout = '100000';
    
            pagination(message, pages, emojis, timeout).catch((err) => {
                console.error(red(`[COMMAND FAILED] : [GUILD] ${message.guild.name} | [CHANNEL] ${message.channel.name} | [REASON] MISSING PERMISSIONS | ${err}`));
            });
        }

    }
}