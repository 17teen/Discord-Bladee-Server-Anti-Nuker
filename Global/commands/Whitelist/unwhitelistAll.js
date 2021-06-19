const Discord = require('discord.js');
const { prefix } = require('../settings.json');
const { red, yellowBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "uwall",
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
                        const WLUSERIDs = Info.Data.WhiteListedUserIDs;
                        const WLUSERS = Info.Data.WhiteListedUsers;

                        if (WLUSERIDs.length === 0) {
                            const nothing = new Discord.MessageEmbed()
                                .setDescription(`Whitelist data is currently empty.`)
                                .setColor(0x36393E)
                            message.channel.send(nothing)
                        } else {

                            WLUSERIDs.length = 0;
                            WLUSERS.length = 0;

                            const content = JSON.stringify(Info, null, 2);

                            fs.writeFileSync(`commands/database/guilds/${guildID}.json`, content, 'utf8');
                            console.log(yellowBright('\nUnwhitelist Successful\nData Saved ✅'))
                            const Successful = new Discord.MessageEmbed()
                                .setDescription(`Successfully Cleared Database. Updating Database!`)
                                .setColor(0x36393E)
                            message.channel.send(Successful).then((msg) => msg.react('✅'))
                        }

                    }
                    UnwhitelistAll()
                } else {
                    const Unauthorised = new Discord.MessageEmbed()
                        .setDescription(`You are not authorised to use this command.`)
                        .setColor(0x36393E)
                    message.channel.send(Unauthorised)
                }

            }
        })

    }
}
