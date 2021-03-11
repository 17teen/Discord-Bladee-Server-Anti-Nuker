const Discord = require('discord.js');
const { prefix, founderId, LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');
const { red, green, blue, yellow, cyan, magenta, greenBright, bgGreen, magentaBright, yellowBright } = require('chalk');
const TrustedUserIDs = require('../Database/trustedUserIDs.json');
const fs = require("fs");

module.exports = {
    name: "bl",
    description: "blacklist command",

    async run(client, message, args) {
        // Not Onwer
        const notOwner = new Discord.MessageEmbed()
            .setDescription('Error: You must be Owner or a \`Trusted User\` to be granted access to this command.')
            .setColor(0x36393E)

        const UserID = args[0];
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
                    /**
                     * Blacklist User
                     */
                    function Blacklist(ID) {
                        const Array = require('../Database/blacklist.json');
                        const Array2 = require('../Database/blacklisted.json');
                        const BlackListUser = Array.push(ID)
                        const BlacklistedUser = Array2.push("<@" + ID + ">")
                        if (isNaN(ID)) {
                            return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                        } else {
                            console.log(yellowBright('Blacklist Successful\nData Saved ✅'))
                            const content = JSON.stringify(Array)
                            const content2 = JSON.stringify(Array2)
                            fs.writeFileSync('Commands/Database/blacklist.json', content, 'utf8')
                            fs.writeFileSync('Commands/Database/blacklisted.json', content2, 'utf8')
                            const Successful = new Discord.MessageEmbed()
                                .setDescription(`Successfully Blacklisted \`${UserID}\`. Updating Database!`)
                                .setColor(0x36393E)
                            message.channel.send(Successful).then((msg) => msg.react('✅'))
                        }
                    }

                    if (!UserID) {
                        const noID = new Discord.MessageEmbed()
                            .setDescription('Error: No ID Provided')
                            .setColor(0x36393E)
                        return message.channel.send(noID)
                    } else {
                        Blacklist(UserID);
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
                    /**
                     * Blacklist User
                     */
                    function Blacklist(ID) {
                        const Array = require('../Database/blacklist.json');
                        const Array2 = require('../Database/blacklisted.json');
                        const BlackListUser = Array.push(ID)
                        const BlacklistedUser = Array2.push("<@" + ID + ">")
                        if (isNaN(ID)) {
                            return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                        } else {
                            console.log(yellowBright('Blacklist Successful\nData Saved ✅'))
                            const content = JSON.stringify(Array)
                            const content2 = JSON.stringify(Array2)
                            fs.writeFileSync('Commands/Database/blacklist.json', content, 'utf8')
                            fs.writeFileSync('Commands/Database/blacklisted.json', content2, 'utf8')
                            const Successful = new Discord.MessageEmbed()
                                .setDescription(`Successfully Blacklisted \`${UserID}\`. Updating Database!`)
                                .setColor(0x36393E)
                            message.channel.send(Successful).then((msg) => msg.react('✅'))
                        }
                    }

                    if (!UserID) {
                        const noID = new Discord.MessageEmbed()
                            .setDescription('Error: No ID Provided')
                            .setColor(0x36393E)
                        return message.channel.send(noID)
                    } else {
                        Blacklist(UserID);
                    }
                } else {
                    message.channel.send(notOwner)
                }
            }
        }

    }
}