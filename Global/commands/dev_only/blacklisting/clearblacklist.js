const Discord = require('discord.js');
const { DEV_TEAM, founderId } = require('../../settings.json');
const { yellowBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "gbclear",
    description: "Clear Global Blacklist Command",

    async run(client, message, args) {
        // Not Onwer
        const notDev = new Discord.MessageEmbed()
            .setDescription('Error: You must be a \`Dev\` to be granted access to this command.')
            .setColor(0x36393E)

        const DevsID = DEV_TEAM.find((userData) => userData === `${message.author.id}`)

            if (message.author.id === founderId || DevsID) {
                    async function ClearGlobalBlacklist() {
                        const BLISTEDIDS = require('../../database/global_blacklist/blacklist.json');
                        const BLISTEDUSERS = require('../../database/global_blacklist/blacklisted.json');

                        if (BLISTEDIDS.length === 0) {

                            const nothing = new Discord.MessageEmbed()
                                .setDescription(`Global Blacklist data is currently empty.`)
                                .setColor(0x36393E)
                            message.channel.send(nothing)

                        } else {

                            BLISTEDIDS.length = 0;
                            BLISTEDUSERS.length = 0;

                            const content = JSON.stringify(BLISTEDIDS, null, 2);
                            const content2 = JSON.stringify(BLISTEDUSERS, null, 2)

                            fs.writeFileSync(`commands/database/global_blacklist/blacklist.json`, content, 'utf8');
                            fs.writeFileSync(`commands/database/global_blacklist/blacklisted.json`, content2, 'utf8');

                            console.log(yellowBright('\nClear Blacklist Successful \nData Saved ✅'))
                            const Successful = new Discord.MessageEmbed()
                                .setDescription(`Successfully Cleared Database. Updating Database!`)
                                .setColor(0x36393E)
                            message.channel.send(Successful).then((msg) => msg.react('✅'))

                        }

                    }
                    ClearGlobalBlacklist()
                } else {
                    message.channel.send(notDev)
                }
    }
}
