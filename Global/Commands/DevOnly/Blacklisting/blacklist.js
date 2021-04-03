const Discord = require('discord.js');
const { DEV_TEAM, founderId } = require('../../settings.json');
const { red, yellowBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "gbl",
    description: "blacklist command",

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
                 * Blacklists User Throughout All Servers Bot is in
                 */
                function GlobalBlacklist(ID) {
                    const Array1 = require('../../Database/Global Blacklist/blacklist.json');
                    const Array2 = require('../../Database/Global Blacklist/blacklisted.json');


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
                        const content = JSON.stringify(Array1, null, 2)
                        const content2 = JSON.stringify(Array2, null, 2)
                        fs.writeFileSync(`Commands/Database/Global Blacklist/blacklist.json`, content, 'utf8')
                        fs.writeFileSync(`Commands/Database/Global Blacklist/blacklisted.json`, content2, 'utf8')
                        const Successful = new Discord.MessageEmbed()
                            .setDescription(`Successfully Blacklisted \`${GetMember.id}\`. Updating Database!`)
                            .setColor(0x36393E)
                        message.channel.send(Successful).then((msg) => msg.react('✅'))
                    }
                }
                GlobalBlacklist(GetMember.id);
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