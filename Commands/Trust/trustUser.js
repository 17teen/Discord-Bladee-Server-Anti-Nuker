const Discord = require('discord.js');
const { prefix, founderId, LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');
const TrustedUserIDs = require('../Database/trustedUserIDs.json');
const TrustedUsers = require('../Database/trustedUsers.json');
const fs = require("fs");
const { red, green, blue, yellow, cyan, magenta, greenBright, bgGreen, magentaBright, yellowBright } = require('chalk');

module.exports = {
    name: "trust",
    description: "trust command",

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
                    function TrustUser(ID) {
                        const TrustedUserArray = TrustedUsers;
                        const TrustedUserIDArray = TrustedUserIDs;

                        if (isNaN(ID)) {
                            return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'));
                        }

                        const push = TrustedUserArray.push(`<@${ID}>`);
                        const push1 = TrustedUserIDArray.push(ID);

                        const content = JSON.stringify(TrustedUserArray, null, 2);
                        const content2 = JSON.stringify(TrustedUserIDArray, null, 2);

                        fs.writeFileSync('Commands/Database/trustedUserIDs.json', content2, 'utf8');
                        fs.writeFileSync('Commands/Database/trustedUsers.json', content, 'utf8');
                        const Successful = new Discord.MessageEmbed()
                            .setDescription(`Successfully Trusted \`${TrustedUserID}\`. Updating Database!`)
                            .setColor(0x36393E)
                        message.channel.send(Successful).then((msg) => msg.react('✅'))
                    }
                    if (!TrustedUserID) {
                        const NoGuildID = new Discord.MessageEmbed()
                            .setDescription(`No User ID provided.`)
                            .setColor(0x36393E)
                        message.channel.send(NoGuildID)
                    } else {
                        TrustUser(TrustedUserID)
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
                    function TrustUser(ID) {
                        const TrustedUserArray = TrustedUsers;
                        const TrustedUserIDArray = TrustedUserIDs;

                        if (isNaN(ID)) {
                            return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'));
                        }

                        const push = TrustedUserArray.push(`<@${ID}>`);
                        const push1 = TrustedUserIDArray.push(ID);

                        const content = JSON.stringify(TrustedUserArray, null, 2);
                        const content2 = JSON.stringify(TrustedUserIDArray, null, 2);

                        fs.writeFileSync('Commands/Database/trustedUserIDs.json', content2, 'utf8');
                        fs.writeFileSync('Commands/Database/trustedUsers.json', content, 'utf8');
                        const Successful = new Discord.MessageEmbed()
                            .setDescription(`Successfully Trusted \`${TrustedUserID}\`. Updating Database!`)
                            .setColor(0x36393E)
                        message.channel.send(Successful).then((msg) => msg.react('✅'))
                    }
                    if (!TrustedUserID) {
                        const NoGuildID = new Discord.MessageEmbed()
                            .setDescription(`No User ID provided.`)
                            .setColor(0x36393E)
                        message.channel.send(NoGuildID)
                    } else {
                        TrustUser(TrustedUserID)
                    }
                } else {
                    message.channel.send(notOwner)
                }
            }
        }

    }
}