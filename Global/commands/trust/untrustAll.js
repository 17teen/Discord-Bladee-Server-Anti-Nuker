const Discord = require('discord.js');
const { prefix } = require('../settings.json');
const fs = require("fs");
const { red, yellowBright } = require('chalk');

module.exports = {
    name: "untrustall",
    description: "untrust all command",

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

                if (message.author.id === Owner) {
                    async function UnwhitelistAll() {
                        const Array = Info.Data.TrustListedUserIDs;

                        if (Array.length === 0) {

                            const nothing = new Discord.MessageEmbed()
                                .setDescription(`Trust System data is currently empty.`)
                                .setColor(0x36393E)
                            message.channel.send(nothing)

                        } else {

                            Info.Data.TrustListedUserIDs.length = 0;
                            Info.Data.TrustListedUsers.length = 0;

                            const content = JSON.stringify(Info, null, 2);

                            fs.writeFileSync(`commands/database/guilds/${guildID}.json`, content, 'utf8');
                            console.log(yellowBright('\nSuccessfully Cleared trust system\nData Saved ✅'))
                            const Successful = new Discord.MessageEmbed()
                                .setDescription(`Successfully Cleared Database. Updating Database!`)
                                .setColor(0x36393E)
                            message.channel.send(Successful).then((msg) => msg.react('✅'))
                        }

                    }
                    UnwhitelistAll()
                } else {
                    message.channel.send(notOwner)
                }
            }
        })

    }
}