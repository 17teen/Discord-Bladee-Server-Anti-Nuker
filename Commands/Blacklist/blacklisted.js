const Discord = require('discord.js');
const { prefix, LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');
const Blacklisted = require('../Database/blacklisted.json');

module.exports = {
    name: "blacklisted",
    description: "blacklisted users command",

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
                if (Blacklisted.length > 0) {
                    const List = new Discord.MessageEmbed()
                        .setTitle(`${client.user.username} | Blacklisted Users: ${Blacklisted.length}`)
                        .setDescription(`${Blacklisted}`)
                        .setColor(0x36393E)
                    message.channel.send(List)
                } else {
                    const noList = new Discord.MessageEmbed()
                        .setTitle(`${client.user.username} | Blacklisted Users: ${Blacklisted.length}`)
                        .setDescription(`No Current Blacklisted Users.`)
                        .setColor(0x36393E)
                    message.channel.send(noList)
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
                if (Blacklisted.length > 0) {
                    const List = new Discord.MessageEmbed()
                        .setTitle(`${client.user.username} | Blacklisted Users: ${Blacklisted.length}`)
                        .setDescription(`${Blacklisted}`)
                        .setColor(0x36393E)
                    message.channel.send(List)
                } else {
                    const noList = new Discord.MessageEmbed()
                        .setTitle(`${client.user.username} | Blacklisted Users: ${Blacklisted.length}`)
                        .setDescription(`No Current Blacklisted Users.`)
                        .setColor(0x36393E)
                    message.channel.send(noList)
                }
            }
        }

    }
}