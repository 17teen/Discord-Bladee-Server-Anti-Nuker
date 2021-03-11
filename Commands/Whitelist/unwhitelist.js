const Discord = require('discord.js');
const { prefix, founderId, LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');
const { red, green, blue, yellow, cyan, magenta, greenBright, bgGreen, magentaBright, yellowBright } = require('chalk');
const TrustedUserIDs = require('../Database/trustedUserIDs.json');
const Acess = require('../Database/whitelist.json');
const Whitelsited = require('../Database/whitelisted.json');
const fs = require("fs");

module.exports = {
    name: "uwl",
    description: "unwhitelist command",

    async run(client, message, args) {
                // Not Onwer
                const notOwner = new Discord.MessageEmbed()
                .setDescription('Error: You must be Owner or a \`Trusted User\` to be granted access to this command.')
                .setColor(0x36393E)
                
            const UserID = args[0];
            const Trusted = TrustedUserIDs.find((user) => user === `${message.author.id}`);
        const AllowedGuildIDs = PermittedGuilds.find((g) => g === `${message.guild.id}`)
        if (AllowGuilds === false){
            if (message.guild.id !== LockGuildID){
                const Unauth = new Discord.MessageEmbed()
                .setDescription(`Unauthorised command usage.`)
                .setColor(0x36393E);

                const Leaving = new Discord.MessageEmbed()
                .setDescription(`Leaving Guild...`)
                .setColor(0x36393E);

                setTimeout(function () {
                    message.channel.send(Unauth).then(msg => {
                        msg.delete({timeout: 2000})
                    })
                },500)
                setTimeout(function () {
                    message.channel.send(Leaving).then(msg => {
                        msg.delete({timeout: 1000})
                    })
                },4000)
                setTimeout(function () {
                    message.guild.leave();
                },6000)
            } else {
                if (message.author.id === founderId || Trusted) {
                    /**
                     * UnWhitelist User
                     */
                    function UnWhitelist(ID) {
                        const Array = Acess;
                        const FindID = Array.find((el) => el === ID);
                        const InArray = Array.includes(FindID);
                        const ElIndex = Array.indexOf(FindID);
                        const RemoveEl = Array.splice(ElIndex, 1)
                        const content = JSON.stringify(Array, null, 2)
        
                        const Array2 = Whitelsited;
                        const FindID2 = Array.find((el) => el === `<@${ID}>`);
                        const InArray2 = Array.includes(FindID2);
                        const ElIndex2 = Array.indexOf(FindID2);
                        const RemoveEl2 = Array2.splice(ElIndex2, 1)
                        const content2 = JSON.stringify(Array2, null, 2)
        
                        if (isNaN(ID)) {
                            return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                        }
        
                        if (InArray === false) {
                            console.log(yellowBright('Not in the whitelist ❌'))
                            const notinDb = new Discord.MessageEmbed()
                                .setDescription('Error: ID not in the whitelist database.')
                                .setColor(0x36393E)
                            return message.channel.send(notinDb)
                        } else {
                            fs.writeFileSync('Commands/Database/whitelist.json', content, 'utf8');
                            fs.writeFileSync('Commands/Database/whitelisted.json', content2, 'utf8');
                            console.log('Unwhitelist Successful\nData Saved ✅')
                            const Successful = new Discord.MessageEmbed()
                                .setDescription(yellowBright(`Successfully Unwhitelisted \`${UserID}\`. Updating Database!`))
                                .setColor(0x36393E);
                            message.channel.send(Successful).then((msg) => msg.react('✅'))
                        }
        
                    }
                    if (!UserID) {
                        const noID = new Discord.MessageEmbed()
                            .setDescription('Error: No ID Provided')
                            .setColor(0x36393E)
                        return message.channel.send(noID)
                    } else {
                        UnWhitelist(UserID);
                    }
                } else {
                    message.channel.send(notOwner)
                }
            }
        } else {
            if (message.guild.id !== AllowedGuildIDs){
                const Unauth = new Discord.MessageEmbed()
                .setDescription(`Unauthorised command usage.`)
                .setColor(0x36393E);

                const Leaving = new Discord.MessageEmbed()
                .setDescription(`Leaving Guild...`)
                .setColor(0x36393E);

                setTimeout(function () {
                    message.channel.send(Unauth).then(msg => {
                        msg.delete({timeout: 2000})
                    })
                },500)
                setTimeout(function () {
                    message.channel.send(Leaving).then(msg => {
                        msg.delete({timeout: 1000})
                    })
                },4000)
                setTimeout(function () {
                    message.guild.leave();
                },6000)
            } else {
                if (message.author.id === founderId || Trusted) {
                    /**
                     * UnWhitelist User
                     */
                    function UnWhitelist(ID) {
                        const Array = Acess;
                        const FindID = Array.find((el) => el === ID);
                        const InArray = Array.includes(FindID);
                        const ElIndex = Array.indexOf(FindID);
                        const RemoveEl = Array.splice(ElIndex, 1)
                        const content = JSON.stringify(Array, null, 2)
        
                        const Array2 = Whitelsited;
                        const FindID2 = Array.find((el) => el === `<@${ID}>`);
                        const InArray2 = Array.includes(FindID2);
                        const ElIndex2 = Array.indexOf(FindID2);
                        const RemoveEl2 = Array2.splice(ElIndex2, 1)
                        const content2 = JSON.stringify(Array2, null, 2)
        
                        if (isNaN(ID)) {
                            return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                        }
        
                        if (InArray === false) {
                            console.log(yellowBright('Not in the whitelist ❌'))
                            const notinDb = new Discord.MessageEmbed()
                                .setDescription('Error: ID not in the whitelist database.')
                                .setColor(0x36393E)
                            return message.channel.send(notinDb)
                        } else {
                            fs.writeFileSync('Commands/Database/whitelist.json', content, 'utf8');
                            fs.writeFileSync('Commands/Database/whitelisted.json', content2, 'utf8');
                            console.log('Unwhitelist Successful\nData Saved ✅')
                            const Successful = new Discord.MessageEmbed()
                                .setDescription(yellowBright(`Successfully Unwhitelisted \`${UserID}\`. Updating Database!`))
                                .setColor(0x36393E);
                            message.channel.send(Successful).then((msg) => msg.react('✅'))
                        }
        
                    }
                    if (!UserID) {
                        const noID = new Discord.MessageEmbed()
                            .setDescription('Error: No ID Provided')
                            .setColor(0x36393E)
                        return message.channel.send(noID)
                    } else {
                        UnWhitelist(UserID);
                    }
                } else {
                    message.channel.send(notOwner)
                }
            }
        }

    }
}