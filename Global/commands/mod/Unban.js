const Discord = require("discord.js");
const { prefix } = require('../settings.json');

module.exports = {
    name: "unban",
    description: "unban",

    async run(client, message, args) {
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            const banembed = new Discord.MessageEmbed()
                .setDescription("*I don't have permission to use this command*")
                .setFooter(`© bladee | Prefix: ${prefix} `)
                .setColor(0x36393E)
                .setTimestamp(Date.now());
            message.channel.send(banembed);
        }
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            const banembed = new Discord.MessageEmbed()
                .setDescription("*You don't have permission to use this command*")
                .setFooter(`© bladee | Prefix: ${prefix} `)
                .setColor(0x36393E)
                .setTimestamp(Date.now());
            message.channel.send(banembed);
        } else {
            var testCont = message.content.split(" ");
            var content = message.content.split(" ").slice(2).join(' ');
            var args1 = message.content.split(" ").slice(1);
            var unbanned = args1[0];
            if (testCont.length <= 1) {
                const banembed = new Discord.MessageEmbed()
                    .setDescription("*Please provide an ID of the user to unban!*")
                    .setFooter(`© bladee | Prefix: ${prefix} `)
                    .setColor(0x36393E)
                    .setTimestamp(Date.now());
                message.channel.send(banembed);
            } else if (testCont.length <= 2) {
                const banembed = new Discord.MessageEmbed()
                    .setDescription("*Please provide a reason for the unban.*")
                    .setFooter(`© bladee | Prefix: ${prefix} `)
                    .setColor(0x36393E)
                    .setTimestamp(Date.now());
                message.channel.send(banembed);
            } else {
                message.guild.members.unban(unbanned).then(() => {
                    const unbanembed = new Discord.MessageEmbed()
                        .setTitle("Unbanned !")
                        .setDescription(`Unbanned ${unbanned} [ID].`)
                        .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL({ dynamic: true })}`)
                        .addField("Moderator",
                            `Unban administered by ${message.author.username}#${message.author.discriminator}`)
                        .addField("Reason",
                            `${content}`)
                        .setColor(0x36393E)
                        .setTimestamp(Date.now());
                    message.channel.send(unbanembed);
                })
                    .catch(err => {
                        message.reply('The ID is invalid. | Not in the Server.');
                        // Log the error
                        console.error(err);
                    });
            }
        }
    }
}
