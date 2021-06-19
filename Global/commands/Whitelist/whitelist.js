const Discord = require('discord.js');
const { prefix } = require('../settings.json');
const { red, yellowBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "wl",
    description: "whitelist command",

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
                         * Whitelist User
                        */
                        function Whitelist(ID) {
                            const AccessID = Info.Data.WhiteListedUserIDs;
                            const Array2 = Info.Data.WhiteListedUsers;

                            const FindID = AccessID.find((el) => el === ID)
                            const InArray = AccessID.includes(FindID);

                            if (InArray === true) {
                                return message.reply('This user has already been Whitelisted.').then((msg) => msg.delete({ timeout: 4000 })) && console.log(red('ERROR: USER ALREADY WHITELISTED'));
                            } else if (isNaN(ID)) {
                                return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                            } else {

                                AccessID.push(ID);
                                Array2.push("<@" + ID + ">")

                                const content = JSON.stringify(Info, null, 2);

                                console.log(yellowBright('Data Saved ✅'));
                                fs.writeFileSync(`commands/database/guilds/${guildID}.json`, content, 'utf8', function (err) {
                                    if (err) {
                                        return console.error(err)
                                    }
                                })
                                const Successful = new Discord.MessageEmbed()
                                    .setDescription(`Successfully whitelisted \`${GetMember.id}\`. Updating Database!`)
                                    .setColor(0x36393E)
                                message.channel.send(Successful).then((msg) => msg.react('✅'))
                            }
                        }
                        Whitelist(GetMember.id);
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