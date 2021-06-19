const Discord = require('discord.js');
const { prefix } = require('../settings.json');
const { red, yellowBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "bl",
    description: "blacklist command",

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
                         * Blacklist User
                         */
                        function Blacklist(ID) {
                            const Array1 = Info.Data.BlackListedUserIDs;
                            const Array2 = Info.Data.BlackListedUsers;
    
    
                            const FindID = Array1.find((el) => el === ID)
                            const InArray = Array1.includes(FindID);
    
                            if (InArray === true) {
                                return message.reply('This user has already been Blacklisted.').then((msg) => msg.delete({ timeout: 4000 })) && console.log(red('ERROR: USER ALREADY BLACKLISTED'));
                            } else if (isNaN(ID)) {
                                return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                            } else {
                                Array1.push(ID)
                                Array2.push("<@" + ID + ">")
    
                                console.log(yellowBright('Blacklist Successful\nData Saved ✅'))
                                const content = JSON.stringify(Info, null, 2)
                                fs.writeFileSync(`commands/database/guilds/${guildID}.json`, content, 'utf8')
                                const Successful = new Discord.MessageEmbed()
                                    .setDescription(`Successfully Blacklisted \`${GetMember.id}\`. Updating Database!`)
                                    .setColor(0x36393E)
                                message.channel.send(Successful).then((msg) => msg.react('✅'))
                            }
                        }
                        Blacklist(GetMember.id);
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