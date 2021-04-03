const Discord = require('discord.js');

module.exports = {
    name: "unbanall",
    description: "unban everyone command",

    async run(client, message, args) {

        const noadmin = new Discord.MessageEmbed()
            .setDescription(`*You are missing \`ADMINISTRATOR\` permissions to perform this execution.*`)
            .setColor(0x36393E)

        if (message.member.hasPermission("ADMINISTRATOR")) {
            message.guild.fetchBans().then(bans => {
                if (bans.size == 0) {
                    message.reply("There are no banned users.")
                } else {
                    bans.forEach(ban => {
                        message.guild.members.unban(ban.user.id);
                    })
                    message.channel.send(`Unbanning All Banned Members.`)
                }
            }
            )
        } else {
            return message.channel.send(noadmin);
        }
    }
}