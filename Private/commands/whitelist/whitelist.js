const Discord = require('discord.js');
const { founderId, LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');
const { red, yellowBright } = require('chalk');
const TrustedUserIDs = require('../database/trustedUserIDs.json');
const Acess = require('../database/whitelist.json');
const fs = require("fs");

module.exports = {
    name: "wl",
    description: "whitelist command",

    async run(client, message, args) {

        const Owner = message.guild.ownerID;
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
                    if (message.author.id === founderId || Trusted || Owner) {
                        /**
                         * Whitelist User
                        */
                        function Whitelist(ID) {
                            const AccessID = Acess;
                            const Array2 = require('../Database/whitelisted.json')

                            const FindID = AccessID.find((el) => el === ID)
                            const InArray = AccessID.includes(FindID);

                            if (InArray === true) {
                                return message.reply('This user has already been Whitelisted.').then((msg) => msg.delete({ timeout: 4000 })) && console.log(red('ERROR: USER ALREADY WHITELISTED'));
                            } else if (isNaN(ID)) {
                                return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                            } else {
                                AccessID.push(ID);
                                Array2.push("<@" + ID + ">")

                                const content = JSON.stringify(AccessID, null, 2);
                                const content2 = JSON.stringify(Array2, null, 2)
                                console.log(yellowBright('Data Saved ✅'));
                                fs.writeFileSync('commands/Database/whitelist.json', content, 'utf8', function (err) {
                                    if (err) {
                                        return console.error(err)
                                    }
                                })
                                fs.writeFileSync('commands/Database/whitelisted.json', content2, 'utf8');
                                const Successful = new Discord.MessageEmbed()
                                    .setDescription(`Successfully whitelisted \`${GetMember.id}\`. Updating Database!`)
                                    .setColor(0x36393E)
                                message.channel.send(Successful).then((msg) => msg.react('✅'))
                            }

                        }
                        Whitelist(GetMember.id);

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
                    if (message.author.id === founderId || Trusted || Owner) {
                        /**
                         * Whitelist User
                        */
                        function Whitelist(ID) {
                            const AccessID = Acess;
                            const Array2 = require('../Database/whitelisted.json')

                            const FindID = AccessID.find((el) => el === ID)
                            const InArray = AccessID.includes(FindID);

                            if (InArray === true) {
                                return message.reply('This user has already been Whitelisted.').then((msg) => msg.delete({ timeout: 4000 })) && console.log(red('ERROR: USER ALREADY WHITELISTED'));
                            } else if (isNaN(ID)) {
                                return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                            } else {
                                AccessID.push(ID);
                                Array2.push("<@" + ID + ">")

                                const content = JSON.stringify(AccessID, null, 2);
                                const content2 = JSON.stringify(Array2, null, 2)
                                console.log(yellowBright('Data Saved ✅'));
                                fs.writeFileSync('commands/Database/whitelist.json', content, 'utf8', function (err) {
                                    if (err) {
                                        return console.error(err)
                                    }
                                })
                                fs.writeFileSync('commands/Database/whitelisted.json', content2, 'utf8');
                                const Successful = new Discord.MessageEmbed()
                                    .setDescription(`Successfully whitelisted \`${GetMember.id}\`. Updating Database!`)
                                    .setColor(0x36393E)
                                message.channel.send(Successful).then((msg) => msg.react('✅'))
                            }

                        }
                        Whitelist(GetMember.id);

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