const Discord = require('discord.js');
const { red, green, blue, yellow, cyan, magenta, greenBright, bgGreen, magentaBright, yellowBright } = require('chalk');
const WhitelistedGuilds = require('../Database/whitelistedGuilds.json');
const TrustedUserIDs = require('../Database/trustedUserIDs.json');
const settings = require('../settings.json');
const { LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json')
const fs = require("fs");

module.exports = {
    name: "rguild",
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
                if (message.author.id === settings.founderId || Trusted) {
                    function RemoveGuilds(ID) {
                        const config = settings;
                        const RemoveGuildSettings = WhitelistedGuilds;

                        const WhitelistedGuildsSettings = config.PermittedGuilds;

                        const FindID = WhitelistedGuildsSettings.find((el) => el === ID);
                        const InArray = WhitelistedGuildsSettings.includes(FindID);
                        const ElIndex = WhitelistedGuildsSettings.indexOf(FindID);
                        const RemoveEl = WhitelistedGuildsSettings.splice(ElIndex, 1)
                        const content = JSON.stringify(config, null, 2)

                        const FindID2 = WhitelistedGuildsSettings.find((el) => el === `<@${ID}>`);
                        const InArray2 = WhitelistedGuildsSettings.includes(FindID2);
                        const ElIndex2 = WhitelistedGuildsSettings.indexOf(FindID2);
                        const RemoveEl2 = RemoveGuildSettings.splice(ElIndex2, 1)
                        const content2 = JSON.stringify(RemoveGuildSettings, null, 2)

                        if (isNaN(ID)) {
                            return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                        }

                        if (InArray === false) {
                            console.log('\nNot in the blacklist ❌\n')
                            const notinDb = new Discord.MessageEmbed()
                                .setDescription('Error: ID not in the blacklist database.')
                                .setColor(0x36393E)
                            return message.channel.send(notinDb)
                        } else {
                            fs.writeFileSync('Commands/settings.json', content, 'utf8');
                            fs.writeFileSync('Commands/Database/whitelistedGuilds.json', content2, 'utf8');
                            console.log(yellowBright('Removal of Guild Successful\nData Saved ✅'))
                            const Successful = new Discord.MessageEmbed()
                                .setDescription(`Successfully Removed \`${GuildID}\`. Updating Database!`)
                                .setColor(0x36393E)
                            message.channel.send(Successful).then((msg) => msg.react('✅'))
                        }

                    }

                    if (!GuildID) {
                        const NoGuildID = new Discord.MessageEmbed()
                            .setDescription(`No guild ID provided.`)
                            .setColor(0x36393E)
                        message.channel.send(NoGuildID)
                    } else {
                        RemoveGuilds(GuildID)
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

                if (message.author.id === settings.founderId || Trusted) {
                    function RemoveGuilds(ID) {
                        const config = settings;
                        const RemoveGuildSettings = WhitelistedGuilds;

                        const WhitelistedGuildsSettings = config.PermittedGuilds;

                        const FindID = WhitelistedGuildsSettings.find((el) => el === ID);
                        const InArray = WhitelistedGuildsSettings.includes(FindID);
                        const ElIndex = WhitelistedGuildsSettings.indexOf(FindID);
                        const RemoveEl = WhitelistedGuildsSettings.splice(ElIndex, 1)
                        const content = JSON.stringify(config, null, 2)

                        const FindID2 = WhitelistedGuildsSettings.find((el) => el === `<@${ID}>`);
                        const InArray2 = WhitelistedGuildsSettings.includes(FindID2);
                        const ElIndex2 = WhitelistedGuildsSettings.indexOf(FindID2);
                        const RemoveEl2 = RemoveGuildSettings.splice(ElIndex2, 1)
                        const content2 = JSON.stringify(RemoveGuildSettings, null, 2)

                        if (isNaN(ID)) {
                            return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                        }

                        if (InArray === false) {
                            console.log('\nNot in the blacklist ❌\n')
                            const notinDb = new Discord.MessageEmbed()
                                .setDescription('Error: ID not in the blacklist database.')
                                .setColor(0x36393E)
                            return message.channel.send(notinDb)
                        } else {
                            fs.writeFileSync('Commands/settings.json', content, 'utf8');
                            fs.writeFileSync('Commands/Database/whitelistedGuilds.json', content2, 'utf8');
                            console.log(yellowBright('Removal of Guild Successful\nData Saved ✅'))
                            const Successful = new Discord.MessageEmbed()
                                .setDescription(`Successfully Removed \`${GuildID}\`. Updating Database!`)
                                .setColor(0x36393E)
                            message.channel.send(Successful).then((msg) => msg.react('✅'))
                        }

                    }

                    if (!GuildID) {
                        const NoGuildID = new Discord.MessageEmbed()
                            .setDescription(`No guild ID provided.`)
                            .setColor(0x36393E)
                        message.channel.send(NoGuildID)
                    } else {
                        RemoveGuilds(GuildID)
                    }
                } else {
                    message.channel.send(notOwner)
                }

            }
        }

    }
}