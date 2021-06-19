const Discord = require('discord.js');
const { founderId, DEV_TEAM } = require('../../settings.json');
const { red, yellowBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "gubl",
    description: "Global Unblacklist Command",

    async run(client, message, args) {
        // Not Onwer
        const notDev = new Discord.MessageEmbed()
            .setDescription('Error: You must be a \`Dev\` to be granted access to this command.')
            .setColor(0x36393E)

        const Mentioned = message.mentions.users.first();
        const GetMember = message.guild.member(Mentioned);

        const DevsID = DEV_TEAM.find((userData) => userData === `${message.author.id}`)

        if (Mentioned) {
            if (message.author.id === founderId || DevsID) {

                /**
                 * Unblacklist User
                 */
                function UnBlacklistGlobal(ID) {
                    const Array = require('../../database/global_blacklist/blacklist.json');
                    const FindID = Array.find((el) => el === ID);
                    const InArray = Array.includes(FindID);
                    const ElIndex = Array.indexOf(FindID);
                    Array.splice(ElIndex, 1)

                    const Array2 = require('../../database/global_blacklist/blacklist.json');
                    const FindID2 = Array.find((el) => el === `<@${ID}>`);
                    const ElIndex2 = Array.indexOf(FindID2);
                    Array2.splice(ElIndex2, 1)


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
                        const content = JSON.stringify(Array, null, 2)
                        const content2 = JSON.stringify(Array2, null, 2)
                        fs.writeFileSync(`commands/database/global_blacklist/blacklist.json`, content, 'utf8')
                        fs.writeFileSync(`commands/database/global_blacklist/blacklist.json`, content2, 'utf8')

                        console.log(yellowBright('Unblacklist Successful\nData Saved ✅'))
                        const Successful = new Discord.MessageEmbed()
                            .setDescription(`Successfully Unblacklisted \`${GetMember.id}\`. Updating Database!`)
                            .setColor(0x36393E)
                        message.channel.send(Successful).then((msg) => msg.react('✅'))
                    }

                }
                UnBlacklistGlobal(GetMember.id);
            } else {
                message.channel.send(notDev)
            }
        } else {
            const noID = new Discord.MessageEmbed()
                .setDescription('Error: User not mentioned')
                .setColor(0x36393E)
            return message.channel.send(noID) && console.log(red('User Not Mentioned'))
        }

    }
}