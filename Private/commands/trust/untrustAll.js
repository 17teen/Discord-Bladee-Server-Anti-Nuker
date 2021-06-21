const Discord = require('discord.js');
const { founderId, LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');
const TrustedUserIDs = require('../Database/trustedUserIDs.json');
const TrustedUsers = require('../Database/trustedUsers.json');
const fs = require("fs");
const { yellowBright } = require('chalk');

module.exports = {
    name: "untrustall",
    description: "untrust all command",

    async run(client, message, args) {
        // Not Onwer
        const notOwner = new Discord.MessageEmbed()
            .setDescription('Error: You must be Owner or a \`Trusted User\` to be granted access to this command.')
            .setColor(0x36393E)
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
                if (message.author.id === founderId || message.guild.owner.id) {
                    async function UnwhitelistAll() {
                        const Array = TrustedUserIDs;
                        const Array2 = TrustedUsers;

                        if (Array.length === 0) {

                            const nothing = new Discord.MessageEmbed()
                                .setDescription(`Trust System data is currently empty.`)
                                .setColor(0x36393E)
                            message.channel.send(nothing)

                        } else {

                            TrustedUserIDs.length = 0;
                            TrustedUsers.length = 0;

                            const content = JSON.stringify(Array);
                            const content2 = JSON.stringify(Array2);

                            fs.writeFileSync('commands/database/whitelist.json', content, 'utf8');
                            fs.writeFileSync('commands/database/whitelisted.json', content2, 'utf8');
                            console.log(yellowBright('\nSuccessfully Cleared trust system\nData Saved ✅'))
                            const Successful = new Discord.MessageEmbed()
                                .setDescription(`Successfully Cleared Database. Updating Database!`)
                                .setColor(0x36393E)
                            message.channel.send(Successful).then((msg) => msg.react('✅'))
                        }

                    }
                    UnwhitelistAll()

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
                if (message.author.id === founderId || message.guild.owner.id) {
                    async function UnwhitelistAll() {
                        const Array = TrustedUserIDs;
                        const Array2 = TrustedUsers;

                        if (Array.length === 0) {

                            const nothing = new Discord.MessageEmbed()
                                .setDescription(`Trust System data is currently empty.`)
                                .setColor(0x36393E)
                            message.channel.send(nothing)

                        } else {

                            TrustedUserIDs.length = 0;
                            TrustedUsers.length = 0;

                            const content = JSON.stringify(Array);
                            const content2 = JSON.stringify(Array2);

                            fs.writeFileSync('commands/database/whitelist.json', content, 'utf8');
                            fs.writeFileSync('commands/database/whitelisted.json', content2, 'utf8');
                            console.log(yellowBright('\nSuccessfully Cleared trust system\nData Saved ✅'))
                            const Successful = new Discord.MessageEmbed()
                                .setDescription(`Successfully Cleared Database. Updating Database!`)
                                .setColor(0x36393E)
                            message.channel.send(Successful).then((msg) => msg.react('✅'))
                        }

                    }
                    UnwhitelistAll()
                    setTimeout(function () {
                        process.exit();
                    }, 1000)
                } else {
                    message.channel.send(notOwner)
                }
            }
        }

    }
}