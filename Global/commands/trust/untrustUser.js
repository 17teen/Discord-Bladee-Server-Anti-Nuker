const Discord = require('discord.js');
const { prefix } = require('../settings.json');
const fs = require("fs");
const { red, yellowBright, cyanBright } = require('chalk');

module.exports = {
    name: "untrust",
    description: "untrust command",

    async run(client, message, args) {
        const Mentioned = message.mentions.users.first();
        const GetMember = message.guild.member(Mentioned);

        const guildID = message.guild.id;
        const Owner = message.guild.ownerID;

        const path = `Commands/database/guilds/${guildID}.json`;

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

                    if (message.author.id === Owner) {
                        function UnTrustUser(ID) {
                            const TrustedUserArray = Info.Data.TrustListedUsers;
                            const TrustedUserIDArray = Info.Data.TrustListedUserIDs;
    
    
                            if (isNaN(ID)) {
                                return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'));
                            }
    
                            const FindID = TrustedUserIDArray.find((el) => el === ID);
                            const InArray = TrustedUserIDArray.includes(FindID);
                            const ElIndex = TrustedUserIDArray.indexOf(FindID);
                            TrustedUserIDArray.splice(ElIndex, 1)
    
                            const FindID2 = TrustedUserIDArray.find((el) => el === `<@${ID}>`);
                            const ElIndex2 = TrustedUserIDArray.indexOf(FindID2);
                            TrustedUserArray.splice(ElIndex2, 1);
    
                            const content = JSON.stringify(Info, null, 2);
    
                            if (InArray === false) {
                                console.log(cyanBright('\nTrusted User Not in the Trust ❌\n'))
                                const notinDb = new Discord.MessageEmbed()
                                    .setDescription('Error: ID not in the Trust database.')
                                    .setColor(0x36393E)
                                return message.channel.send(notinDb)
                            } else {
                                fs.writeFileSync(`Commands/database/guilds/${guildID}.json`, content, 'utf8');
                                console.log(yellowBright('Removal of Trust Complete\nData Saved ✅'))
                                const Successful = new Discord.MessageEmbed()
                                    .setDescription(`Successfully Removed Trust off \`${GetMember.id}\`. Updating Database!`)
                                    .setColor(0x36393E)
                                message.channel.send(Successful).then((msg) => msg.react('✅'))
                            }
                        }
                            UnTrustUser(GetMember.id)
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