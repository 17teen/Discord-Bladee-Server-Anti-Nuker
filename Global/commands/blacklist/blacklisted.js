const Discord = require('discord.js');
const { prefix } = require('../settings.json');
const { red } = require('chalk');
const fs = require('fs');

module.exports = {
    name: "blacklisted",
    description: "blacklisted users command",

    async run(client, message, args) {
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

                if (message.author.id === Owner || Trusted) {

                    if (Info.Data.BlackListedUserIDs.length > 0) {
                        const List = new Discord.MessageEmbed()
                            .setTitle(`${client.user.username} | Blacklisted Users: ${Info.Data.BlackListedUserIDs.length}`)
                            .setDescription(`${Info.Data.BlackListedUsers}`)
                            .setColor(0x36393E)
                        message.channel.send(List)
                    } else {
                        const noList = new Discord.MessageEmbed()
                            .setTitle(`${client.user.username} | Blacklisted Users: ${Info.Data.BlackListedUserIDs.length}`)
                            .setDescription(`No Current Blacklisted Users.`)
                            .setColor(0x36393E)
                        message.channel.send(noList)
                    }
                }
            }
        })

    }
}