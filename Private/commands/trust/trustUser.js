const Discord = require('discord.js');
const { founderId, LockGuildID, PermittedGuilds, AllowGuilds } = require('../settings.json');
const TrustedUserIDs = require('../database/trustedUserIDs.json');
const TrustedUsers = require('../database/trustedUsers.json');
const fs = require("fs");
const { red } = require('chalk');

module.exports = {
    name: "trust",
    description: "trust command",

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
                const Mentioned = message.mentions.users.first();
                const GetMember = message.guild.member(Mentioned);

                if (Mentioned) {

                    if (message.author.id === founderId || message.guild.owner.id) {
                        function TrustUser(ID) {
                            const TrustedUserArray = TrustedUsers;
                            const TrustedUserIDArray = TrustedUserIDs;

                            
                            const FindID = TrustedUserIDArray.find((el) => el === ID)
                            const InArray = TrustedUserIDArray.includes(FindID);

                            if (InArray === true) {
                                return message.reply('This user has already been Trusted.').then((msg) => msg.delete({ timeout: 4000 })) && console.log(red('ERROR: USER ALREADY TRUSTED'));
                            } else if (isNaN(ID)) {
                                return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                            } else { 
                                TrustedUserArray.push(`<@${ID}>`);
                                TrustedUserIDArray.push(ID);
    
                                const content = JSON.stringify(TrustedUserArray, null, 2);
                                const content2 = JSON.stringify(TrustedUserIDArray, null, 2);
    
                                fs.writeFileSync('commands/database/trustedUserIDs.json', content2, 'utf8');
                                fs.writeFileSync('commands/database/trustedUsers.json', content, 'utf8');
                                const Successful = new Discord.MessageEmbed()
                                    .setDescription(`Successfully Trusted \`${GetMember.id}\`. Updating Database!`)
                                    .setColor(0x36393E)
                                message.channel.send(Successful).then((msg) => msg.react('✅'))
                            }
                        }
                        TrustUser(GetMember.id)

                    } else {
                        message.channel.send(notOwner)
                    }
                } else {
                    const noID = new Discord.MessageEmbed()
                        .setDescription('Error: User not mentioned')
                        .setColor(0x36393E)
                    return message.channel.send(noID) && console.log(red('User Not Mentioned'))
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
                const Mentioned = message.mentions.users.first();
                const GetMember = message.guild.member(Mentioned);

                if (Mentioned) {

                    if (message.author.id === founderId || message.guild.owner.id) {
                        function TrustUser(ID) {
                            const TrustedUserArray = TrustedUsers;
                            const TrustedUserIDArray = TrustedUserIDs;

                            
                            const FindID = TrustedUserIDArray.find((el) => el === ID)
                            const InArray = TrustedUserIDArray.includes(FindID);

                            if (InArray === true) {
                                return message.reply('This user has already been Trusted.').then((msg) => msg.delete({ timeout: 4000 })) && console.log(red('ERROR: USER ALREADY TRUSTED'));
                            } else if (isNaN(ID)) {
                                return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                            } else { 
                                TrustedUserArray.push(`<@${ID}>`);
                                TrustedUserIDArray.push(ID);
    
                                const content = JSON.stringify(TrustedUserArray, null, 2);
                                const content2 = JSON.stringify(TrustedUserIDArray, null, 2);
    
                                fs.writeFileSync('commands/database/trustedUserIDs.json', content2, 'utf8');
                                fs.writeFileSync('commands/database/trustedUsers.json', content, 'utf8');
                                const Successful = new Discord.MessageEmbed()
                                    .setDescription(`Successfully Trusted \`${GetMember.id}\`. Updating Database!`)
                                    .setColor(0x36393E)
                                message.channel.send(Successful).then((msg) => msg.react('✅'))
                            }
                        }
                        TrustUser(GetMember.id)

                    } else {
                        message.channel.send(notOwner)
                    }
                } else {
                    const noID = new Discord.MessageEmbed()
                        .setDescription('Error: User not mentioned')
                        .setColor(0x36393E)
                    return message.channel.send(noID) && console.log(red('User Not Mentioned'))
                }

            }
        }

    }
}
