const Discord = require('discord.js');
const { founderId, LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');
const { red, yellowBright } = require('chalk');
const TrustedUserIDs = require('../database/trustedUserIDs.json');
const settings = require('../settings.json');
const fs = require("fs");

module.exports = {
    name: "dguilds",
    description: "help command",

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
                if (message.author.id === founderId || Trusted || message.guild.owner.id) {
                    function disableMultipleGuilds() {
                        const eGuilds = settings;

                        if (eGuilds.AllowGuilds === false) {
                            return message.reply('\`AllowGuilds\` is already set to false | Tip: use \`eguilds\` to allow more guilds to be added.').then((msg) => msg.delete({ timeout: 10000 })) || console.error(red('ERROR: ALLOWGUILDS IS ALREADY SET TO TRUE'));
                        } else {
                            settings.AllowGuilds = false;
                        }

                        const success = new Discord.MessageEmbed()
                            .setDescription('Successfully Disabled Guilds.')
                            .setColor(0x36393E);
                        message.channel.send(success)
                        console.log(yellowBright('Successfully Disabled Guilds.'))

                        const content = JSON.stringify(eGuilds, null, 2);
                        fs.writeFileSync('commands/settings.json', content, 'utf8');
                    }
                    disableMultipleGuilds()

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
                if (message.author.id === founderId || Trusted || message.guild.owner.id) {
                    function disableMultipleGuilds() {
                        const eGuilds = settings;

                        settings.AllowGuilds = false;

                        const success = new Discord.MessageEmbed()
                            .setDescription('Successfully Disabled Guilds.')
                            .setColor(0x36393E);
                        message.channel.send(success)
                        console.log(yellowBright('Successfully Disabled Guilds.'))

                        const content = JSON.stringify(eGuilds, null, 2);
                        fs.writeFileSync('commands/settings.json', content, 'utf8');
                    }
                    disableMultipleGuilds()

                } else {
                    message.channel.send(notOwner)
                }
            }
        }

    }
}
