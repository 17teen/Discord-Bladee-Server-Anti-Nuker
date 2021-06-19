const Discord = require('discord.js');
const { DEV_TEAM, founderId } = require('../../settings.json');
const { red, yellowBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "rdev",
    description: "Remove Dev command",

    async run(client, message, args) {
        // Not Onwer
        const notDev = new Discord.MessageEmbed()
            .setDescription('Error: You must be the bot \`Founder\` to be granted access to this command.')
            .setColor(0x36393E)

        const Mentioned = message.mentions.users.first();
        const GetMember = message.guild.member(Mentioned);

        const settings = require('../../settings.json');

        if (Mentioned) {
            if (message.author.id === founderId) {

                /**
                 * Unblacklist User
                 */
                function RemoveDev(ID) {
                    const Array = DEV_TEAM;
                    const FindID = Array.find((el) => el === ID);
                    const InArray = Array.includes(FindID);
                    const ElIndex = Array.indexOf(FindID);
                    Array.splice(ElIndex, 1)

                    const content = JSON.stringify(settings, null, 2)

                    if (isNaN(ID)) {
                        return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                    }

                    if (InArray === false) {
                        console.log('\nNot in the Dev Database ❌\n')
                        const notinDb = new Discord.MessageEmbed()
                            .setDescription('Error: ID not in the Dev database.')
                            .setColor(0x36393E)
                        return message.channel.send(notinDb)
                    } else {
                        fs.writeFileSync(`../Global/Commands/settings.json`, content, 'utf8');
                        console.log(yellowBright('Removal of former Dev Successful\nData Saved ✅'))
                        const Successful = new Discord.MessageEmbed()
                            .setDescription(`Successfully Removed \`${GetMember.id}\` From Dev Database. Updating Database!`)
                            .setColor(0x36393E)
                        message.channel.send(Successful).then((msg) => msg.react('✅'))
                    }

                }
                RemoveDev(GetMember.id);
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