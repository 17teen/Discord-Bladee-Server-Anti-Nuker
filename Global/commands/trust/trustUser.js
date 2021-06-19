const Discord = require('discord.js');
const { prefix } = require('../settings.json');
const fs = require("fs");
const { red, cyanBright } = require('chalk');

module.exports = {
    name: "trust",
    description: "trust command",

    async run(client, message, args) {
        const Mentioned = message.mentions.users.first();
        const GetMember = message.guild.member(Mentioned);

        const guildID = message.guild.id;
        const Owner = message.guild.ownerID;

        const path = `commands/database/guilds/${guildID}.json`;

        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                console.error(red('File: ' + path + ' does not exist'))

                const nothing = new Discord.MessageEmbed()
                    .setDescription(`Error: Cannot Fetch Data | Tip: use \`${prefix}set\` to create a database`)
                    .setColor(0x36393E)
                message.channel.send(nothing)
            } else {
                const Info = require(`../database/guilds/${guildID}.json`)

                if (Mentioned) {
                    if (message.author.id === Owner) {
                        function TrustUser(ID) {
                            const TrustedUserArray = Info.Data.TrustListedUsers;
                            const TrustedUserIDArray = Info.Data.TrustListedUserIDs;

                            if (isNaN(ID)) {
                                return message.reply('Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'));
                            }

                            if (TrustedUserIDArray.find((i) => i === ID)) {
                                return message.reply('This user has already been trusted.').then((msg) => msg.delete({ timeout: 4000 })) || console.error(red('ERROR: USER ALREADY TRUSTED'));
                            }

                            TrustedUserArray.push(`<@${ID}>`);
                            TrustedUserIDArray.push(ID);

                            const content = JSON.stringify(Info, null, 2);

                            fs.writeFileSync(`commands/database/guilds/${guildID}.json`, content, 'utf8');
                            const Successful = new Discord.MessageEmbed()
                                .setDescription(`Successfully Trusted \`${GetMember.id}\`. Updating Database!`)
                                .setColor(0x36393E)
                            message.channel.send(Successful).then((msg) => msg.react('✅'))

                            console.log(cyanBright('Trust was given to ' + ID))
                        }
                        TrustUser(GetMember.id)
                    } else {
                        const Unauthorised = new Discord.MessageEmbed()
                            .setDescription(`You are not authorised to use this command.`)
                            .setColor(0x36393E)
                        message.channel.send(Unauthorised)
                    }
                } else {
                    const noID = new Discord.MessageEmbed()
                    .setDescription('Error: User not mentioned')
                    .setColor(0x36393E)
                return message.channel.send(noID) && console.log(red('User Not Mentioned'))
                }

            }
        })
    }
}