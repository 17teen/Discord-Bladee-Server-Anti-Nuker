const Discord = require('discord.js');
const { prefix } = require('../settings.json');
const { red } = require('chalk');
const fs = require('fs');

module.exports = {
    name: "whitelisted",
    description: "list of whitelist users command",

    async run(client, message, args) {
        const ID = message.guild.id;

        const path = `commands/database/guilds/${ID}.json`;

        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                console.error(red('File: ' + path + ' does not exist'))

                const nothing = new Discord.MessageEmbed()
                    .setDescription(`Error: Cannot Fetch Data | Tip: use \`${prefix}set\` to create a database`)
                    .setColor(0x36393E)
                message.channel.send(nothing)
            } else {
                const Info = require(`../database/guilds/${ID}.json`)

                if (Info.Data.WhiteListedUserIDs.length > 0) {
                    const List = new Discord.MessageEmbed()
                        .setTitle(`${message.guild.name} ; Whitelisted Users: ${Info.Data.WhiteListedUserIDs.length}`)
                        .setDescription(`${Info.Data.WhiteListedUsers}`)
                        .setColor(0x36393E)
                    message.channel.send(List)
                } else {
                    const noList = new Discord.MessageEmbed()
                        .setTitle(`${message.guild.name} ; Whitelisted Users: ${Info.Data.WhiteListedUserIDs.length}`)
                        .setDescription(`No Currently Whitelisted Users.`)
                        .setColor(0x36393E)
                    message.channel.send(noList)
                }
            }
        })

    }
}