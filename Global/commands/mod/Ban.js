const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "help command",

    async run(client, message, args) {
        const user2 = message.mentions.users.first();
        // If we have a user mentioned
        if (user2) {
            // Now we get the member from the user
            const member = message.guild.member(user2);
            const banembed = new Discord.MessageEmbed()
                .setDescription("*You don't have permission to use this command*")
                .setColor(0x36393E)
                .setTimestamp(Date.now());

            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(banembed)

            const highroleembed = new Discord.MessageEmbed()
                .setDescription("*You can't ban member with the same or a higher role position*")
                .setColor(0x36393E)
                .setTimestamp(Date.now());
            if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(highroleembed);
            // If the member is in the guild
            if (member) {

                member
                    .ban({ days: 7, reason: "Bad." })
                    .then(() => {
                        // We let the message author know we were able to kick the person
                        const bannedembed = new Discord.MessageEmbed()
                            .setDescription(`***Successfully banned ${user2.tag}***`)
                            .setColor(0x36393E)
                            .setTimestamp(Date.now());
                        message.channel.send(bannedembed)
                    })
                    .catch(err => {

                        message.reply('I was unable to ban the member');
                        // Log the error
                        console.error(err);
                    });
            } else {
                // The mentioned user isn't in this guild
                const nomemembed = new Discord.MessageEmbed()
                    .setDescription("*That user isn't in this server!*")
                    .setColor(0x36393E)
                    .setTimestamp(Date.now());
                message.channel.send(nomemembed)
            }
            // Otherwise, if no user was mentioned
        } else {
            const nobanmentionembed = new Discord.MessageEmbed()
                .setDescription("*You didn't mention the user*")
                .setColor(0x36393E)
                .setTimestamp(Date.now());
            message.channel.send(nobanmentionembed)
        }
    }
}