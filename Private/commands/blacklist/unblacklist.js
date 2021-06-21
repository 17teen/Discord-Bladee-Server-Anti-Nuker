const Discord = require('discord.js');
const { founderId, LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');
const { red, yellowBright } = require('chalk');
const Bacess = require('../database/blacklist.json');
const TrustedUserIDs = require('../database/trustedUserIDs.json');
const Blacklisted = require('../database/blacklisted.json');
const fs = require("fs");

module.exports = {
    name: "ubl",
    description: "unblacklist command",

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
                         * Unblacklist User
                         */
                        function UnBlacklist(ID) {
                            const Array = Bacess;
                            const FindID = Array.find((el) => el === ID);
                            const InArray = Array.includes(FindID);
                            const ElIndex = Array.indexOf(FindID);
                            Array.splice(ElIndex, 1)
                            const content = JSON.stringify(Array)

                            const Array2 = Blacklisted;
                            const FindID2 = Array.find((el) => el === `<@${ID}>`);
                            const ElIndex2 = Array.indexOf(FindID2);
                            Array2.splice(ElIndex2, 1)
                            const content2 = JSON.stringify(Array2, null, 2)

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
                                fs.writeFileSync('commands/database/blacklist.json', content, 'utf8');
                                fs.writeFileSync('commands/database/blacklisted.json', content2, 'utf8');
                                console.log(yellowBright('Unblacklist Successful\nData Saved ✅'))
                                const Successful = new Discord.MessageEmbed()
                                    .setDescription(`Successfully Unblacklisted \`${GetMember.id}\`. Updating Database!`)
                                    .setColor(0x36393E)
                                message.channel.send(Successful).then((msg) => msg.react('✅'))
                            }
                        }
                        UnBlacklist(GetMember.id);

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
                         * Unblacklist User
                         */
                        function UnBlacklist(ID) {
                            const Array = Bacess;
                            const FindID = Array.find((el) => el === ID);
                            const InArray = Array.includes(FindID);
                            const ElIndex = Array.indexOf(FindID);
                            Array.splice(ElIndex, 1)
                            const content = JSON.stringify(Array)

                            const Array2 = Blacklisted;
                            const FindID2 = Array.find((el) => el === `<@${ID}>`);
                            const ElIndex2 = Array.indexOf(FindID2);
                            Array2.splice(ElIndex2, 1)
                            const content2 = JSON.stringify(Array2, null, 2)

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
                                fs.writeFileSync('commands/database/blacklist.json', content, 'utf8');
                                fs.writeFileSync('commands/database/blacklisted.json', content2, 'utf8');
                                console.log(yellowBright('Unblacklist Successful\nData Saved ✅'))
                                const Successful = new Discord.MessageEmbed()
                                    .setDescription(`Successfully Unblacklisted \`${GetMember.id}\`. Updating Database!`)
                                    .setColor(0x36393E)
                                message.channel.send(Successful).then((msg) => msg.react('✅'))
                            }
                        }
                        UnBlacklist(GetMember.id);

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