const Discord = require('discord.js');
const { DEV_TEAM, founderId } = require('../../settings.json');

module.exports = {
    name: "gblacklisted",
    description: "blacklisted users command",

    async run(client, message, args) {
        // Not Onwer
        const notDev = new Discord.MessageEmbed()
            .setDescription('Error: You must be a \`Dev\` to be granted access to this command.')
            .setColor(0x36393E)

        const Array2 = require('../../database/global_blacklist/blacklisted.json');

        const DevsID = DEV_TEAM.find((userData) => userData === `${message.author.id}`)

        if (message.author.id === founderId || DevsID) {

            if (Array2.length > 0) {
                const List = new Discord.MessageEmbed()
                    .setTitle(`${client.user.username} | Global Blacklisted Users: ${Array2.length}`)
                    .setDescription(`${Array2}`)
                    .setColor(0x36393E)
                message.channel.send(List)
            } else {
                const noList = new Discord.MessageEmbed()
                    .setTitle(`${client.user.username} | Global Blacklisted Users: ${Array2.length}`)
                    .setDescription(`No Current Blacklisted Users.`)
                    .setColor(0x36393E)
                message.channel.send(noList)
            }
        } else {
            message.channel.send(notDev)
        }
    }
}
