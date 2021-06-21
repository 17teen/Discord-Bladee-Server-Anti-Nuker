const Discord = require('discord.js');
const { founderId, LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');
const { red, yellowBright } = require('chalk');
const TrustedUserIDs = require('../database/trustedUserIDs.json');
const fs = require("fs");

module.exports = {
    name: "bl",
    description: "blacklist command",

    async run(client, message, args) {
        // Not Onwer
        const notOwner = new Discord.MessageEmbed()
            .setDescription('Error: You must be Owner or a \`Trusted User\` to be granted access to this command.')
            .setColor(0x36393E)

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
                const Mentioned = message.mentions.users.first();
                const GetMember = message.guild.member(Mentioned);

                if (Mentioned) {
                    if (message.author.id === founderId || Trusted || message.guild.owner.id) {
                        /**
                         * Blacklist User
                         */
                        function Blacklist(ID) {
                            const Array = require('../database/blacklist.json');
                            const Array2 = require('../database/blacklisted.json');

                            const FindID = Array.find((el) => el === ID)
                            const InArray = Array.includes(FindID);

                            if (InArray === true) {
                                return message.reply('This user has already been Blacklisted.').then((msg) => msg.delete({ timeout: 4000 })) && console.log(red('ERROR: USER ALREADY BLACKLISTED'));
                            } else if (isNaN(ID)) {
                                return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                            } else {
                                Array.push(ID)
                                Array2.push("<@" + ID + ">")

                                console.log(yellowBright('Blacklist Successful\nData Saved ✅'))
                                const content = JSON.stringify(Array)
                                const content2 = JSON.stringify(Array2)
                                fs.writeFileSync('commands/database/blacklist.json', content, 'utf8')
                                fs.writeFileSync('commands/database/blacklisted.json', content2, 'utf8')
                                const Successful = new Discord.MessageEmbed()
                                    .setDescription(`Successfully Blacklisted \`${GetMember.id}\`. Updating Database!`)
                                    .setColor(0x36393E)
                                message.channel.send(Successful).then((msg) => msg.react('✅'))
                            }
                        }
                        Blacklist(GetMember.id);

                    } else {
                        message.channel.send(notOwner)
                    }
                } else {
                    const noID = new Discord.MessageEmbed()
                        .setDescription('Error: User not mentioned')
                        .setColor(0x36393E)
                    return message.channel.send(noID) && console.log(red('User Not Mentioned'))
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
                const Mentioned = message.mentions.users.first();
                const GetMember = message.guild.member(Mentioned);

                if (Mentioned) {
                    if (message.author.id === founderId || Trusted || message.guild.owner.id) {
                        /**
                         * Blacklist User
                         */
                        function Blacklist(ID) {
                            const Array = require('../database/blacklist.json');
                            const Array2 = require('../database/blacklisted.json');

                            const FindID = Array.find((el) => el === ID)
                            const InArray = Array.includes(FindID);

                            if (InArray === true) {
                                return message.reply('This user has already been Blacklisted.').then((msg) => msg.delete({ timeout: 4000 })) && console.log(red('ERROR: USER ALREADY BLACKLISTED'));
                            } else if (isNaN(ID)) {
                                return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                            } else {
                                Array.push(ID)
                                Array2.push("<@" + ID + ">")

                                console.log(yellowBright('Blacklist Successful\nData Saved ✅'))
                                const content = JSON.stringify(Array)
                                const content2 = JSON.stringify(Array2)
                                fs.writeFileSync('commands/database/blacklist.json', content, 'utf8')
                                fs.writeFileSync('commands/database/blacklisted.json', content2, 'utf8')
                                const Successful = new Discord.MessageEmbed()
                                    .setDescription(`Successfully Blacklisted \`${GetMember.id}\`. Updating Database!`)
                                    .setColor(0x36393E)
                                message.channel.send(Successful).then((msg) => msg.react('✅'))
                            }
                        }
                        Blacklist(GetMember.id);

                    } else {
                        message.channel.send(notOwner)
                    }
                } else {
                    const noID = new Discord.MessageEmbed()
                        .setDescription('Error: User not mentioned')
                        .setColor(0x36393E)
                    return message.channel.send(noID) && console.log(red('User Not Mentioned'))
                }
            }
        }

    }
}