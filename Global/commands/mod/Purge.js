const Discord = require('discord.js');
const { red } = require('chalk');
module.exports = {
    name: "purge",
    description: "help command",

    async run(client, message, args) {
        const nopurgeembed = new Discord.MessageEmbed()
            .setDescription("*You don't have permission to use this command*\nREQUIRED: \`MANAGE_MESSAGES\`")
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        var args1 = message.content.split(" ").slice(1);
        var argresult = args1.join(' ');
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(nopurgeembed)
        if (isNaN(argresult) || (parseInt(argresult) < - 0)) return message.channel.send(`**Provide a valid number to purge**`).then((m) => m.delete({ timeout: 3000 }))
        if (!args1[0]) {
            message.channel.send(`**Provide a valid number to purge**`).then((m) => m.delete({ timeout: 3000 }))
        } else if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.bulkDelete(argresult).then(() => {
                message.channel.send(`***deleted ${argresult} messages***`)
                    .then(message => {
                        message.delete({ timeout: 1000 })
                    })
            }).catch(err => {
                console.error(red(`PURGE LIMIT REACHED OR NO VALID NUMBER PROVIDED | [SERVER] ${message.guild.name}`)) | message.channel.send(`**Unable to Purge 100+ messages or Purge 2 weeks old messages**`).then(msg => {
                    msg.delete({ timeout: 3000 })
                });
            })
        }
    }
}