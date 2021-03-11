const Discord = require("discord.js");
const { prefix, founderId, LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');
const { red, green, blue, yellow, cyan, magenta, greenBright, bgGreen, magentaBright, yellowBright } = require('chalk');
const TrustedUserIDs = require('../Database/trustedUserIDs.json');
module.exports = {
    name: "unban",
    description: "unban",

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
                if (message.author.bot) return;
                if (!message.guild) return;
                if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
                    const banembed = new Discord.MessageEmbed()
                        .setDescription("*I don't have permission to use this command*")
                        .setFooter(`© Lovell | Prefix: ${prefix} `)
                        .setColor(0x36393E)
                        .setTimestamp(Date.now());
                    message.channel.send(banembed);
                }
                if (!message.member.hasPermission("BAN_MEMBERS")) {
                    const banembed = new Discord.MessageEmbed()
                        .setDescription("*You don't have permission to use this command*")
                        .setFooter(`© Lovell | Prefix: ${prefix} `)
                        .setColor(0x36393E)
                        .setTimestamp(Date.now());
                    message.channel.send(banembed);
                } else {
                    let time = new Date();
                    function amPm() {
                        if (time.getHours() >= 11) {
                            return "PM";
                        } else return "AM";
                    }
                    var testCont = message.content.split(" ");
                    var content = message.content.split(" ").slice(2).join(' ');
                    var args1 = message.content.split(" ").slice(1);
                    var unbanned = args1[0];
                    if (testCont.length <= 1) {
                        const banembed = new Discord.MessageEmbed()
                            .setDescription("*Please provide an ID of the user to unban!*")
                            .setFooter(`© Lovell | Prefix: ${prefix} `)
                            .setColor(0x36393E)
                            .setTimestamp(Date.now());
                        message.channel.send(banembed);
                    } else if (testCont.length <= 2) {
                        const banembed = new Discord.MessageEmbed()
                            .setDescription("*Please provide a reason for the unban.*")
                            .setFooter(`© Lovell | Prefix: ${prefix} `)
                            .setColor(0x36393E)
                            .setTimestamp(Date.now());
                        message.channel.send(banembed);
                    } else {
                        message.guild.members.unban(unbanned).then(() => {
                            const unbanembed = new Discord.MessageEmbed()
                                .setTitle("Unbanned !")
                                .setDescription(`Unbanned ${unbanned} [ID].`)
                                .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL({ dynamic: true })}`)
                                .addField("Moderator",
                                    `Unban administered by ${message.author.username}#${message.author.discriminator}`)
                                .addField("Reason",
                                    `${content}`)
                                .setColor(0x36393E)
                                .setTimestamp(Date.now());
                            message.channel.send(unbanembed);
                        })
                            .catch(err => {
                                message.reply('The ID is invalid. | Not in the Server.');
                                // Log the error
                                console.error(err);
                            });
                    }
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
                if (message.author.bot) return;
                if (!message.guild) return;
                if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
                    const banembed = new Discord.MessageEmbed()
                        .setDescription("*I don't have permission to use this command*")
                        .setFooter(`© Lovell | Prefix: ${prefix} `)
                        .setColor(0x36393E)
                        .setTimestamp(Date.now());
                    message.channel.send(banembed);
                }
                if (!message.member.hasPermission("BAN_MEMBERS")) {
                    const banembed = new Discord.MessageEmbed()
                        .setDescription("*You don't have permission to use this command*")
                        .setFooter(`© Lovell | Prefix: ${prefix} `)
                        .setColor(0x36393E)
                        .setTimestamp(Date.now());
                    message.channel.send(banembed);
                } else {
                    let time = new Date();
                    function amPm() {
                        if (time.getHours() >= 11) {
                            return "PM";
                        } else return "AM";
                    }
                    var testCont = message.content.split(" ");
                    var content = message.content.split(" ").slice(2).join(' ');
                    var args1 = message.content.split(" ").slice(1);
                    var unbanned = args1[0];
                    if (testCont.length <= 1) {
                        const banembed = new Discord.MessageEmbed()
                            .setDescription("*Please provide an ID of the user to unban!*")
                            .setFooter(`© Lovell | Prefix: ${prefix} `)
                            .setColor(0x36393E)
                            .setTimestamp(Date.now());
                        message.channel.send(banembed);
                    } else if (testCont.length <= 2) {
                        const banembed = new Discord.MessageEmbed()
                            .setDescription("*Please provide a reason for the unban.*")
                            .setFooter(`© Lovell | Prefix: ${prefix} `)
                            .setColor(0x36393E)
                            .setTimestamp(Date.now());
                        message.channel.send(banembed);
                    } else {
                        message.guild.members.unban(unbanned).then(() => {
                            const unbanembed = new Discord.MessageEmbed()
                                .setTitle("Unbanned !")
                                .setDescription(`Unbanned ${unbanned} [ID].`)
                                .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL({ dynamic: true })}`)
                                .addField("Moderator",
                                    `Unban administered by ${message.author.username}#${message.author.discriminator}`)
                                .addField("Reason",
                                    `${content}`)
                                .setColor(0x36393E)
                                .setTimestamp(Date.now());
                            message.channel.send(unbanembed);
                        })
                            .catch(err => {
                                message.reply('The ID is invalid. | Not in the Server.');
                                // Log the error
                                console.error(err);
                            });
                    }
                }
            }
        }

    }

}
