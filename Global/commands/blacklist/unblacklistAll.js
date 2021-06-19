const Discord = require('discord.js');
const { prefix } = require('../settings.json');
const { red, yellowBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "uball",
    description: "help command",

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
                    async function UnwhitelistAll() {
                        const BLISTEDIDS = Info.Data.BlackListedUserIDs;
                        const BLISTEDUSERS = Info.Data.BlackListedUsers;

                        if (BLISTEDIDS.length === 0) {

                            const nothing = new Discord.MessageEmbed()
                                .setDescription(`Blacklist data is currently empty.`)
                                .setColor(0x36393E)
                            message.channel.send(nothing)

                        } else {

                            BLISTEDIDS.length = 0;
                            BLISTEDUSERS.length = 0;

                            const content = JSON.stringify(Info, null, 2);

                            fs.writeFileSync(`commands/database/guilds/${guildID}.json`, content, 'utf8');
                            console.log(yellowBright('\nUnblacklist Successful \nData Saved ✅'))
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