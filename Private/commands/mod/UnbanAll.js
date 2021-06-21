const Discord = require('discord.js');
const { LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');

module.exports = {
    name: "unbanall",
    description: "unban everyone command",

    async run(client, message, args) {
        const noadmin = new Discord.MessageEmbed()
            .setDescription(`*You are missing \`ADMINISTRATOR\` permissions to perform this execution.*`)
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
                // Unban All

                if (message.member.hasPermission("ADMINISTRATOR")) {
                    message.guild.fetchBans().then(bans => {
                        if (bans.size == 0) {
                            message.reply("There are no banned users.")
                        } else {
                            let counter = 0;
                            let n = 1;
                            const banSize = bans.size;
                            const unbanning = new MessageEmbed()
                                .setDescription(`Currently unbanning users. (${counter}/${banSize})`)
                                .setColor(0x36393E)
                            message.channel.send(unbanning).then((msg) => {
                                bans.forEach((user) => {
                                    const unbanning1 = new MessageEmbed()
                                        .setDescription(`Currently unbanning users. (${n++}/${banSize})`)
                                        .setColor(0x36393E)
                                    message.guild.members.unban(user.user.id).then(() => {
                                        msg.edit({ embed: unbanning1 })
                                    }).catch((err) => console.log(err))
                                })
                            })
                        }
                    }
                    )
                } else {
                    return message.channel.send(noadmin);
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
                // Unban All

                if (message.member.hasPermission("ADMINISTRATOR")) {
                    message.guild.fetchBans().then(bans => {
                        if (bans.size == 0) {
                            message.reply("There are no banned users.")
                        } else {
                            let counter = 0;
                            let n = 1;
                            const banSize = bans.size;
                            const unbanning = new MessageEmbed()
                                .setDescription(`Currently unbanning users. (${counter}/${banSize})`)
                                .setColor(0x36393E)
                            message.channel.send(unbanning).then((msg) => {
                                bans.forEach((user) => {
                                    const unbanning1 = new MessageEmbed()
                                        .setDescription(`Currently unbanning users. (${n++}/${banSize})`)
                                        .setColor(0x36393E)
                                    message.guild.members.unban(user.user.id).then(() => {
                                        msg.edit({ embed: unbanning1 })
                                    }).catch((err) => console.log(err))
                                })
                            })
                        }
                    }
                    )
                } else {
                    return message.channel.send(noadmin);
                }
            }
        }


    }
}