const Discord = require('discord.js');
const { prefix, founderId, LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');
const TrustedUserIDs = require('../Database/trustedUserIDs.json');
const TrustedUsers = require('../Database/trustedUsers.json');
const fs = require("fs");
const { red, green, blue, yellow, cyan, magenta, greenBright, bgGreen, magentaBright, yellowBright } = require('chalk');

module.exports = {
    name: "untrust",
    description: "untrust command",

    async run(client, message, args) {
        // Not Onwer
        const notOwner = new Discord.MessageEmbed()
            .setDescription('Error: You must be Owner or a \`Trusted User\` to be granted access to this command.')
            .setColor(0x36393E)

        const TrustedUserID = args[0];
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
                    function UnTrustUser(ID) {
                        const TrustedUserArray = TrustedUsers;
                        const TrustedUserIDArray = TrustedUserIDs;


                        if (isNaN(ID)) {
                            return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'));
                        }

                        const FindID = TrustedUserIDArray.find((el) => el === ID);
                        const InArray = TrustedUserIDArray.includes(FindID);
                        const ElIndex = TrustedUserIDArray.indexOf(FindID);
                        const RemoveEl = TrustedUserIDArray.splice(ElIndex, 1)

                        const FindID2 = TrustedUserIDArray.find((el) => el === `<@${ID}>`);
                        const InArray2 = TrustedUserIDArray.includes(FindID2);
                        const ElIndex2 = TrustedUserIDArray.indexOf(FindID2);
                        const RemoveEl2 = TrustedUserArray.splice(ElIndex2, 1)

                        const content = JSON.stringify(TrustedUserArray, null, 2);
                        const content2 = JSON.stringify(TrustedUserIDArray, null, 2);

                        if (InArray === false) {
                            console.log('\nNot in the blacklist ❌\n')
                            const notinDb = new Discord.MessageEmbed()
                                .setDescription('Error: ID not in the blacklist database.')
                                .setColor(0x36393E)
                            return message.channel.send(notinDb)
                        } else {
                            fs.writeFileSync('Commands/Database/trustedUserIDs.json', content2, 'utf8');
                            fs.writeFileSync('Commands/Database/trustedUsers.json', content, 'utf8');
                            console.log(yellowBright('Removal of Trust Complete\nData Saved ✅'))
                            const Successful = new Discord.MessageEmbed()
                                .setDescription(`Successfully Removed Trust off \`${TrustedUserID}\`. Updating Database!`)
                                .setColor(0x36393E)
                            message.channel.send(Successful).then((msg) => msg.react('✅'))
                        }
                    }

                    if (!TrustedUserID) {
                        const NoGuildID = new Discord.MessageEmbed()
                            .setDescription(`No User ID provided.`)
                            .setColor(0x36393E)
                        message.channel.send(NoGuildID)
                    } else {
                        UnTrustUser(TrustedUserID)
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
                if (message.author.id === founderId || message.guild.owner.id) {
                    function UnTrustUser(ID) {
                        const TrustedUserArray = TrustedUsers;
                        const TrustedUserIDArray = TrustedUserIDs;


                        if (isNaN(ID)) {
                            return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'));
                        }

                        const FindID = TrustedUserIDArray.find((el) => el === ID);
                        const InArray = TrustedUserIDArray.includes(FindID);
                        const ElIndex = TrustedUserIDArray.indexOf(FindID);
                        const RemoveEl = TrustedUserIDArray.splice(ElIndex, 1)

                        const FindID2 = TrustedUserIDArray.find((el) => el === `<@${ID}>`);
                        const InArray2 = TrustedUserIDArray.includes(FindID2);
                        const ElIndex2 = TrustedUserIDArray.indexOf(FindID2);
                        const RemoveEl2 = TrustedUserArray.splice(ElIndex2, 1)

                        const content = JSON.stringify(TrustedUserArray, null, 2);
                        const content2 = JSON.stringify(TrustedUserIDArray, null, 2);

                        if (InArray === false) {
                            console.log('\nNot in the blacklist ❌\n')
                            const notinDb = new Discord.MessageEmbed()
                                .setDescription('Error: ID not in the blacklist database.')
                                .setColor(0x36393E)
                            return message.channel.send(notinDb)
                        } else {
                            fs.writeFileSync('Commands/Database/trustedUserIDs.json', content2, 'utf8');
                            fs.writeFileSync('Commands/Database/trustedUsers.json', content, 'utf8');
                            console.log(yellowBright('Removal of Trust Complete\nData Saved ✅'))
                            const Successful = new Discord.MessageEmbed()
                                .setDescription(`Successfully Removed Trust off \`${TrustedUserID}\`. Updating Database!`)
                                .setColor(0x36393E)
                            message.channel.send(Successful).then((msg) => msg.react('✅'))
                        }
                    }

                    if (!TrustedUserID) {
                        const NoGuildID = new Discord.MessageEmbed()
                            .setDescription(`No User ID provided.`)
                            .setColor(0x36393E)
                        message.channel.send(NoGuildID)
                    } else {
                        UnTrustUser(TrustedUserID)
                    }
                } else {
                    message.channel.send(notOwner)
                }
            }
        }

    }
}