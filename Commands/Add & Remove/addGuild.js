const Discord = require('discord.js');
const { prefix, founderId, AllowGuilds, PermittedGuilds, LockGuildID } = require('../settings.json');
const { red, green, blue, yellow, cyan, magenta, greenBright, bgGreen, magentaBright, yellowBright } = require('chalk');
const WhitelistedGuilds = require('../Database/whitelistedGuilds.json');
const TrustedUserIDs = require('../Database/trustedUserIDs.json');
const fs = require("fs");
const settings = require('../settings.json');

module.exports = {
    name: "aguild",
    description: "help command",

    async run(client, message, args) {
        // Not Onwer
        const notOwner = new Discord.MessageEmbed()
            .setDescription('Error: You must be Owner or a \`Trusted User\` to be granted access to this command.')
            .setColor(0x36393E)

        const GuildID = args[0]
        const Trusted = TrustedUserIDs.find((user) => user === `${message.author.id}`);
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
                if (message.author.id === founderId || Trusted) {
                    function AddGuilds(ID) {
                        const config = settings;
                        const AddGuildSettings = WhitelistedGuilds;

                        const push = config.PermittedGuilds.push(ID);
                        const push1 = AddGuildSettings.push(`<@${ID}>`)

                        if (isNaN(ID)) {
                            return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                        }

                        const success = new Discord.MessageEmbed()
                            .setDescription('Successfully Added Guild: ' + `\`${ID}\`` + ' To Database.')
                            .setColor(0x36393E);
                        message.channel.send(success).then(msg => msg.react('✅'))
                        console.log(yellowBright('Successfully Added Guild: ' + `\`${ID}\`` + ' To Database.'))

                        const content = JSON.stringify(config, null, 2);
                        const content2 = JSON.stringify(AddGuildSettings, null, 2);
                        fs.writeFileSync('Commands/settings.json', content, 'utf8');
                        fs.writeFileSync('Commands/Database/whitelistedGuilds.json', content2, 'utf8');
                    }

                    if (!GuildID) {
                        const NoGuildID = new Discord.MessageEmbed()
                            .setDescription(`No guild ID provided.`)
                            .setColor(0x36393E)
                        message.channel.send(NoGuildID)
                    } else {
                        AddGuilds(GuildID)
                    }
                } else {
                    message.channel.send(notOwner)
                }
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
                if (message.author.id === founderId || Trusted) {
                    function AddGuilds(ID) {
                        const config = settings;
                        const AddGuildSettings = WhitelistedGuilds;

                        const push = config.PermittedGuilds.push(ID);
                        const push1 = AddGuildSettings.push(`<@${ID}>`)

                        if (isNaN(ID)) {
                            return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                        }

                        const success = new Discord.MessageEmbed()
                            .setDescription('Successfully Added Guild: ' + `\`${ID}\`` + ' To Database.')
                            .setColor(0x36393E);
                        message.channel.send(success).then(msg => msg.react('✅'))
                        console.log(yellowBright('Successfully Added Guild: ' + `\`${ID}\`` + ' To Database.'))

                        const content = JSON.stringify(config, null, 2);
                        const content2 = JSON.stringify(AddGuildSettings, null, 2);
                        fs.writeFileSync('Commands/settings.json', content, 'utf8');
                        fs.writeFileSync('Commands/Database/whitelistedGuilds.json', content2, 'utf8');
                    }

                    if (!GuildID) {
                        const NoGuildID = new Discord.MessageEmbed()
                            .setDescription(`No guild ID provided.`)
                            .setColor(0x36393E)
                        message.channel.send(NoGuildID)
                    } else {
                        AddGuilds(GuildID)
                    }
                } else {
                    message.channel.send(notOwner)
                }
            }
        }

    }
}