const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "unbanall",
    description: "unban everyone command",

    async run(client, message, args) {

        const noadmin = new MessageEmbed()
            .setDescription(`*You are missing \`ADMINISTRATOR\` permissions to perform this execution.*`)
            .setColor(0x36393E)

        if (message.member.hasPermission("ADMINISTRATOR")) {
            message.guild.fetchBans().then(bans => {
                if (bans.size == 0) {
                    message.reply("There are no banned users.")
                } else {
                    let counter = 0;
                    let n = 1;
                    const banSize = bans.size;
                    const unbanning = new MessageEmbed()
                        .setDescription(`Currently unbanning users. (${counter}/${banSize})`)
                        .setColor(0x36393E)
                    message.channel.send(unbanning).then((msg) => {
                        bans.forEach((user) => {
                            const unbanning1 = new MessageEmbed()
                                .setDescription(`Currently unbanning users. (${n++}/${banSize})`)
                                .setColor(0x36393E)
                            message.guild.members.unban(user.user.id).then(() => {
                                msg.edit({ embed: unbanning1 })
                            }).catch((err) => console.log(err))
                        })
                    })
                }
            }
            )
        } else {
            return message.channel.send(noadmin);
        }
    }
}