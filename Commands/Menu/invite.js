const Discord = require('discord.js');
const { prefix, author, LockGuildID, PermittedGuilds, AllowGuilds, inviteLink, founderId } = require('../settings.json');
const TrustedUserIDs = require('../Database/trustedUserIDs.json');

module.exports = {
    name: "invite",
    description: "help command",

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
                const Trusted = TrustedUserIDs.find((user) => user === `${message.author.id}`);
                if (message.author.id === founderId || Trusted) {
                    const inviteEmbed = new Discord.MessageEmbed()
                        .setDescription(`[Click Here.](${inviteLink})`)
                        .setColor(0x36393E);
                    message.channel.send(inviteEmbed)
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
                const Trusted = TrustedUserIDs.find((user) => user === `${message.author.id}`);
                if (message.author.id === founderId || Trusted) {
                    const inviteEmbed = new Discord.MessageEmbed()
                        .setDescription(`[Click Here.](${inviteLink})`)
                        .setColor(0x36393E);
                    message.channel.send(inviteEmbed)
                } else {
                    message.channel.send(notOwner)
                }
            }
        }

    }
}