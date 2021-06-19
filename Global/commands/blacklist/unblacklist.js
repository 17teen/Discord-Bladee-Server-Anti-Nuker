const Discord = require('discord.js');
const { prefix } = require('../settings.json');
const { red, yellowBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "ubl",
    description: "unblacklist command",

    async run(client, message, args) {
        // Not Onwer
        const notOwner = new Discord.MessageEmbed()
            .setDescription('Error: You must be Owner or a \`Trusted User\` to be granted access to this command.')
            .setColor(0x36393E)

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
                         * Unblacklist User
                         */
                        function UnBlacklist(ID) {
                            const Array = Info.Data.BlackListedUserIDs;
                            const FindID = Array.find((el) => el === ID);
                            const InArray = Array.includes(FindID);
                            const ElIndex = Array.indexOf(FindID);
                            Array.splice(ElIndex, 1)

                            const Array2 = Info.Data.BlackListedUsers;
                            const FindID2 = Array.find((el) => el === `<@${ID}>`);
                            const ElIndex2 = Array.indexOf(FindID2);
                            Array2.splice(ElIndex2, 1)

                            const content = JSON.stringify(Info, null, 2)

                            if (isNaN(ID)) {
                                return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                            }

                            if (InArray === false) {
                                console.log('\nNot in the blacklist ❌\n')
                                const notinDb = new Discord.MessageEmbed()
                                    .setDescription('Error: ID not in the blacklist database.')
                                    .setColor(0x36393E)
                                return message.channel.send(notinDb)
                            } else {
                                fs.writeFileSync(`commands/database/guilds/${guildID}.json`, content, 'utf8');
                                console.log(yellowBright('Unblacklist Successful\nData Saved ✅'))
                                const Successful = new Discord.MessageEmbed()
                                    .setDescription(`Successfully Unblacklisted \`${GetMember.id}\`. Updating Database!`)
                                    .setColor(0x36393E)
                                message.channel.send(Successful).then((msg) => msg.react('✅'))
                            }

                        }
                        UnBlacklist(GetMember.id);
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
        })
    }
}