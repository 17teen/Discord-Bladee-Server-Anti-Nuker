const Discord = require('discord.js');
const { prefix } = require('../settings.json');
const { red, yellowBright, cyanBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "uwl",
    description: "unwhitelist command",

    async run(client, message, args) {
        
        const Mentioned = message.mentions.users.first();
        const GetMember = message.guild.member(Mentioned);

        const guildID = message.guild.id;
        const Owner = message.guild.ownerID;

        const path = `commands/database/guilds/${guildID}.json`;

        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                console.error(red('File: ' + path + ' does not exist'))

                const nothing = new Discord.MessageEmbed()
                    .setDescription(`Error: Cannot Fetch Data | Tip: use \`${prefix}set\` to create a database`)
                    .setColor(0x36393E)
                message.channel.send(nothing)
            } else {
                const Info = require(`../database/guilds/${guildID}.json`)

                const Trusted = Info.Data.TrustListedUserIDs.find((user) => user === `${message.author.id}`)

                if (Mentioned) {
                    if (message.author.id === Owner || Trusted) {
                        /**
                         * UnWhitelist User
                         */
                        function UnWhitelist(ID) {
                            const Array = Info.Data.WhiteListedUserIDs;
                            const FindID = Array.find((el) => el === ID);
                            const InArray = Array.includes(FindID);
                            const ElIndex = Array.indexOf(FindID);
                            Array.splice(ElIndex, 1)
    
                            const Array2 = Info.Data.WhiteListedUsers;
                            const FindID2 = Array.find((el) => el === `<@${ID}>`);
                            const ElIndex2 = Array.indexOf(FindID2);
                            Array2.splice(ElIndex2, 1)
                            const content = JSON.stringify(Info, null, 2)
    
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
                                fs.writeFileSync(`commands/database/guilds/${guildID}.json`, content, 'utf8', function (err) {
                                    if (err) {
                                        return console.error(err)
                                    }
                                })
                                const Successful = new Discord.MessageEmbed()
                                    .setDescription(`Successfully Unwhitelisted \`${GetMember.id}\`. Updating Database!`)
                                    .setColor(0x36393E)
                                message.channel.send(Successful).then((msg) => msg.react('✅'))
                                console.log(cyanBright('Unwhitelist Successful\nData Saved ✅'))
                            }
    
                        }
                            UnWhitelist(GetMember.id);
                    } else {
                        const Unauthorised = new Discord.MessageEmbed()
                        .setDescription(`You are not authorised to use this command.`)
                        .setColor(0x36393E)
                    message.channel.send(Unauthorised)
                    }
                } else {
                    const noID = new Discord.MessageEmbed()
                    .setDescription('Error: User not mentioned')
                    .setColor(0x36393E)
                return message.channel.send(noID) && console.log(red('User Not Mentioned'))
                }

            }
        
        })

    }
}