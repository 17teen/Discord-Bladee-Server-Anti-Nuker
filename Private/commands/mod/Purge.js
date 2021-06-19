const Discord = require('discord.js');
const { LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');
const { red } = require('chalk');

module.exports = {
    name: "purge",
    description: "purge command",

    async run(client, message, args) {
        const nopurgeembed = new Discord.MessageEmbed()
            .setDescription("*You don't have permission to use this command*\nREQUIRED: \`MANAGE_MESSAGES\`")
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        var args1 = message.content.split(" ").slice(1);
        var argresult = args1.join(' ');
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
                if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(nopurgeembed)
                if (isNaN(argresult) || (parseInt(argresult) < - 0)) return message.channel.send(`**Provide a valid number to purge**`).then((m) => m.delete({ timeout: 3000 }))
                if (!args1[0]) {
                    message.channel.send(`**Provide a valid number to purge**`).then((m) => m.delete({ timeout: 3000 }))
                } else if (message.member.hasPermission("MANAGE_MESSAGES")) {
                    message.channel.bulkDelete(argresult).then(() => {
                        message.channel.send(`***deleted ${argresult} messages***`)
                            .then(message => {
                                message.delete({ timeout: 1000 })
                            })
                    }).catch(err => {
                        console.error(red(`PURGE LIMIT REACHED OR NO VALID NUMBER PROVIDED | [SERVER] ${message.guild.name}`)) | message.channel.send(`**Unable to Purge 100+ messages or Purge 2 weeks old messages**`).then(msg => {
                            msg.delete({ timeout: 3000 })
                        });
                    })
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
                if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(nopurgeembed)
                if (isNaN(argresult) || (parseInt(argresult) < - 0)) return message.channel.send(`**Provide a valid number to purge**`).then((m) => m.delete({ timeout: 3000 }))
                if (!args1[0]) {
                    message.channel.send(`**Provide a valid number to purge**`).then((m) => m.delete({ timeout: 3000 }))
                } else if (message.member.hasPermission("MANAGE_MESSAGES")) {
                    message.channel.bulkDelete(argresult).then(() => {
                        message.channel.send(`***deleted ${argresult} messages***`)
                            .then(message => {
                                message.delete({ timeout: 1000 })
                            })
                    }).catch(err => {
                        console.error(red(`PURGE LIMIT REACHED OR NO VALID NUMBER PROVIDED | [SERVER] ${message.guild.name}`)) | message.channel.send(`**Unable to Purge 100+ messages or Purge 2 weeks old messages**`).then(msg => {
                            msg.delete({ timeout: 3000 })
                        });
                    })
                }
            }
        }

    }
}