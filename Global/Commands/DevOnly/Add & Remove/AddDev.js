const Discord = require('discord.js');
const { DEV_TEAM, founderId } = require('../../settings.json');
const { red, yellowBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "adev",
    description: "Add Dev Command",

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
                 * Blacklists User Throughout All Servers Bot is in
                 */
                function AddDev(ID) {
                    const Array1 = DEV_TEAM;

                    const FindID = Array1.find((el) => el === ID)
                    const InArray = Array1.includes(FindID);

                    if (InArray === true) {
                        return message.reply('This user has already been added to the DEV team.').then((msg) => msg.delete({ timeout: 4000 })) && console.log(red('ERROR: USER ALREADY A DEV'));
                    } else if (isNaN(ID)) {
                        return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                    } else {
                        Array1.push(ID)

                        console.log(yellowBright('Successfully Added ' + GetMember.id + ' to Dev Database\nData Saved ✅'))
                        const content = JSON.stringify(settings, null, 2)
                        fs.writeFileSync(`../Global/Commands/settings.json`, content, 'utf8')
                        const Successful = new Discord.MessageEmbed()
                            .setDescription(`Successfully Added \`${GetMember.id}\` To Dev Database. Updating Database!`)
                            .setColor(0x36393E)
                        message.channel.send(Successful).then((msg) => msg.react('✅'))
                    }
                }
                AddDev(GetMember.id);
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