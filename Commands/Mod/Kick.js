const Discord = require('discord.js');
const { prefix, founderId, LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');
const { red, green, blue, yellow, cyan, magenta, greenBright, bgGreen, magentaBright, yellowBright } = require('chalk');
const TrustedUserIDs = require('../Database/trustedUserIDs.json');
module.exports = {
    name: "kick",
    description: "help command",

    async run(client, message, args) {

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
                const user1 = message.mentions.users.first();
                // If we have a user mentioned
                if (user1) {
                    // Now we get the member from the user

                    // Checks if they have the right permission
                    const member = message.guild.member(user1);
                    const kickembed = new Discord.MessageEmbed()
                        .setDescription("*You don't have permission to use this command*")
                        .setColor(0x36393E)
                        .setTimestamp(Date.now());

                    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(kickembed)
                    // Checks If the user is higher rank than bot
                    const highrolekickembed = new Discord.MessageEmbed()
                        .setDescription("*You can't kick member with the same or a higher role position*")
                        .setColor(0x36393E)
                        .setTimestamp(Date.now());
                    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(highrolekickembed);
                    // If the member is in the guild
                    if (member) {

                        member
                            .kick('Being bad')
                            .then(() => {
                                // We let the message author know we were able to kick the person
                                const kickedembed = new Discord.MessageEmbed()
                                    .setDescription(`***Successfully kicked ${user1.tag}***`)
                                    .setColor(0x36393E)
                                    .setTimestamp(Date.now());
                                message.channel.send(kickedembed);
                            })
                            .catch(err => {
                                message.reply('I was unable to kick the member');
                                // Log the error
                                console.error(err);
                            });
                    } else {
                        // The mentioned user isn't in this guild
                        const nokickmemembed = new Discord.MessageEmbed()
                            .setDescription("*That user isn't in this server!*")
                            .setColor(0x36393E)
                            .setTimestamp(Date.now());
                        message.channel.send(nokickmemembed)
                    }
                    // Otherwise, if no user was mentioned
                } else {
                    const nokickmentionembed = new Discord.MessageEmbed()
                        .setDescription("*You didn't mention the user*")
                        .setColor(0x36393E)
                        .setTimestamp(Date.now());
                    message.channel.send(nokickmentionembed)
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
                const user1 = message.mentions.users.first();
                // If we have a user mentioned
                if (user1) {
                    // Now we get the member from the user

                    // Checks if they have the right permission
                    const member = message.guild.member(user1);
                    const kickembed = new Discord.MessageEmbed()
                        .setDescription("*You don't have permission to use this command*")
                        .setColor(0x36393E)
                        .setTimestamp(Date.now());

                    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(kickembed)
                    // Checks If the user is higher rank than bot
                    const highrolekickembed = new Discord.MessageEmbed()
                        .setDescription("*You can't kick member with the same or a higher role position*")
                        .setColor(0x36393E)
                        .setTimestamp(Date.now());
                    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(highrolekickembed);
                    // If the member is in the guild
                    if (member) {

                        member
                            .kick('Being bad')
                            .then(() => {
                                // We let the message author know we were able to kick the person
                                const kickedembed = new Discord.MessageEmbed()
                                    .setDescription(`***Successfully kicked ${user1.tag}***`)
                                    .setColor(0x36393E)
                                    .setTimestamp(Date.now());
                                message.channel.send(kickedembed);
                            })
                            .catch(err => {
                                message.reply('I was unable to kick the member');
                                // Log the error
                                console.error(err);
                            });
                    } else {
                        // The mentioned user isn't in this guild
                        const nokickmemembed = new Discord.MessageEmbed()
                            .setDescription("*That user isn't in this server!*")
                            .setColor(0x36393E)
                            .setTimestamp(Date.now());
                        message.channel.send(nokickmemembed)
                    }
                    // Otherwise, if no user was mentioned
                } else {
                    const nokickmentionembed = new Discord.MessageEmbed()
                        .setDescription("*You didn't mention the user*")
                        .setColor(0x36393E)
                        .setTimestamp(Date.now());
                    message.channel.send(nokickmentionembed)
                }
            }
        }

    }
}