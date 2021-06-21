/**
 * Bladee Anti Nuke: Private Mode
 * https://github.com/17teen
 * Discord: 7teen#3868
 */

// API
const { MessageEmbed, Client, Collection, Intents } = require('discord.js');
const client = new Client({ disableMentions: "everyone" }, { ws: { intents: Intents.PRIVILEGED } });
const fs = require("fs");
const path = require("path");
// Settings
const settings = require('./commands/settings.json');
const token = settings.token;
const prefix = settings.prefix;
const author = settings.author;
const enableGuilds = settings.AllowGuilds;
// White Listing/Black Listing
const Bacess = require('./commands/Database/blacklist.json');
// Commando Structure
client.commands = new Collection();

let commandDir = "commands";

for (const category of fs.readdirSync(`./${commandDir}`)) {
    if (!fs.statSync(`./${commandDir}/${category}`).isDirectory()) continue;
    const direc2 = fs.readdirSync(path.join(`./${commandDir}/${category}`)).filter(file => file.endsWith(".js"))
    for (const f of direc2) {
        const command = require(`./${commandDir}/${category}/${f}`);
        client.commands.set(command.name, command);
    }
    for (const folder of fs.readdirSync(`./${commandDir}/${category}`)) {
        if (!fs.statSync(`./${commandDir}/${category}/${folder}`).isDirectory()) continue;
        const direc = fs.readdirSync(path.join(`./${commandDir}/${category}/${folder}`)).filter(file => file.endsWith(".js"))
        for (const f of direc) {
            const command = require(`./${commandDir}/${category}/${folder}/${f}`);
            client.commands.set(command.name, command);
        }
        for (const files of fs.readdirSync(`./${commandDir}/${category}/${folder}`)) {
            const command = require(`./${commandDir}/${category}/${folder}/${files}`);

            client.commands.set(command.name, command);
        }
    }
}

// Listeners
process.setMaxListeners(300);
// Customizations
const { red, green, magenta, greenBright, magentaBright, yellowBright, blue, blueBright, grey, redBright, yellow, cyan, cyanBright } = require('chalk');
// Title
console.log(magenta(`

                            ██████╗ ██╗      █████╗ ██████╗ ███████╗███████╗   
                            ██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝██╔════╝   
                            ██████╔╝██║     ███████║██║  ██║█████╗  █████╗     
                            ██╔══██╗██║     ██╔══██║██║  ██║██╔══╝  ██╔══╝     
                            ██████╔╝███████╗██║  ██║██████╔╝███████╗███████╗██╗
                            ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚═╝
                       
                               Anti Nuke | 7teen | Author: ${author}

`));

client.on("ready", () => {
    // UserCount
    const userCount = client.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c, 0);
    // Login
    console.log(magentaBright('              ════════════════════════════════════════════════════════════════════════════════'));
    console.log(magentaBright(`                                           Guardian: ${client.user.username}#${client.user.discriminator} `));
    console.log(magentaBright('              ════════════════════════════════════════════════════════════════════════════════'));
    // Status
    // Status Title Options
    // Status Activity Options
    let ActiOptions = ["STREAMING", "PLAYING", "LISTENING", "WATCHING"];
    setInterval(function () {
        // Randomise
        let randomsieActivity = ActiOptions[Math.floor(Math.random() * ActiOptions.length)];
        // Activity
        client.user.setActivity({
            name: `${userCount} users protected.`,
            type: randomsieActivity,
            url: "https://www.twitch.tv/ayoohennio"
        });

    }, 10000); // Change 10 Every Second(s)
});

// Commands
client.on("message", message => {

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    // Logs Command
    if (message.content.startsWith(prefix)) {

        const d = new Date();
        const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();

        console.log(green(`[COMMAND RAN] : ${message.content} | ${message.author.tag} | [SERVER] : ${message.guild.name} | [TIME] : ${date}`))

        // Args
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if (!client.commands.has(command)) return;

        try {
            client.commands.get(command).run(client, message, args);

        } catch (error) {
            console.error(error);
        }
    }


})

client.on("guildCreate", async guild => {
    // This event triggers when the bot joins a guild.
    console.log(greenBright(`\n[GUILD JOINED] ${guild.name} | [ID] ${guild.id} | [ (+) MEMBERCOUNT: ${guild.memberCount}]\n`));

    const AllowedGuildIDs = settings.PermittedGuilds.find((g) => g === `${guild.id}`);
    const PrivGuild = settings.LockGuildID;

    if (enableGuilds === false) {
        if (guild.id !== PrivGuild) {
            return guild.leave().then(
                console.log(greenBright('Invited to unauthorised guild.'))
            );
        } else {
            return console.log(greenBright('Invited to an authorised guild.'));
        }
    } else {
        if (guild.id === AllowedGuildIDs || PrivGuild) {
            return console.log(greenBright('Invited to an authorised guild.'));
        } else {
            return guild.leave().then(
                console.log(greenBright('Invited to unauthorised guild.'))
            );
        }
    }
});

// When Bot leaves
client.on("guildDelete", guild => {
    console.log(red(`\n[GUILD LEFT] ${guild.name} | [ID] ${guild.id} | [ (-) MEMBERCOUNT: ${guild.memberCount}]\n`));
});

// Blacklist User from server
client.on('guildMemberAdd', member => {
    const BlacklistedUserID = Bacess.find((u) => u === `${member.id}`);
    const noAcess = new MessageEmbed()
        .setTitle('Unauthorised Access To Server: ' + member.guild.name)
        .setDescription(`You've been blacklisted in **${member.guild.name}** and have been denied access of entry.\n
    **Owner:** \`${member.guild.owner.user.tag}\` | <@${member.guild.owner.id}>
    **Member Count:** ${member.guild.memberCount}\n
    *We suggest you DM the owner to be unblacklisted if you wish.*
    `)
        .setTimestamp(Date.now());

    if (member.id === BlacklistedUserID) {
        member.send(noAcess)
        setTimeout(function () {
            member.ban({
                reason: `Blacklisted User`
            })
        }, 2000);
        console.log(red(`Unauthorised User: ${member.user.tag} tried joining ${member.guild.name} and was banned.`))
    } else {
        return console.log(greenBright(`Authorised User: ${member.user.tag} joined ${member.guild.name}.`));
    }
});

// Fetch Ban
client.on("guildBanAdd", async (guild, user) => {

    const eventsTimestamp = Date.now().toString()

    const fetchingLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_BAN_ADD",
    }).catch((err) => {
        return console.log(`${red("[Log Error]: True")}\n${red("[Log Error Desc.]: " + err)}`)
    });

    if (!fetchingLogs) return console.log(red("[Entries Error] Unable to fetch Entries."));

    const banLog = fetchingLogs.entries.first();

    if (!banLog) {
        return console.log(red(`[Fetch Log Error]: This Log Type: 'MEMBER_BAN_ADD' has not been previously seen before while the 'guildBanAdd' event has been trigerred.`));
    } else {
        console.log(`\n\n${grey("======================================")}\n${yellow("[!] An Event has been fired.")}\n${yellowBright("[Server]: " + guild.name)}\n${green("[Event]: 'guildBanAdd'")}\n${greenBright("[Log Type]: 'MEMBER_BAN_ADD'")}`)

        const { executor, target, createdAt, createdTimestamp } = banLog;

        console.log(`${greenBright(`[Event Desc.]: [USER]: ${target.tag} was banned from the server.`)}`);

        console.log(`${blue(`[Log Timestamp]: ${createdTimestamp}`)}\n${blueBright(`[Event Timestamp]: ${eventsTimestamp}`)}`);

        /**
        * Checks Whitelisted & Trusted Users Before banning
        */
        const TrustedUserIDs = require('./commands/Database/trustedUserIDs.json');
        const Acess = require('./commands/Database/whitelist.json');
        const WhiteListedUser = Acess.find(el => el === `${executor.id}`)
        const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);

        const successfulBan = new MessageEmbed()
            .setDescription(`**Unauthorised Ban By:** ${executor.tag} \n**Victim:** ${target.tag} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const unsuccessfulBan = new MessageEmbed()
            .setDescription(`**Unauthorised Ban By:** ${executor.tag} \n**Victim:** ${target.tag} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given.`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const LogTimeString = createdTimestamp.toString();
        const EventExecution = eventsTimestamp;

        const logtime = LogTimeString.slice(0, -3);
        const eventtime = EventExecution.slice(0, -3);

        const logtime2 = LogTimeString.slice(0, -4);
        const eventtime2 = EventExecution.slice(0, -4);

        if (logtime === eventtime) {
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === guild.owner.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            guild.members.ban(executor.id, {
                reason: `Unauthorised Ban.`
            }).then(guild.owner.send(successfulBan).catch((err) => {
                return console.log(red("[Owner]: " + guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
            }))
                .then(guild.members.unban(target.id, {
                    reason: "Victim of an unlawful ban"
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + guild.owner.send(unsuccessfulBan);
                });
        } else if (logtime2 === eventtime2) {
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === guild.owner.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            guild.members.ban(executor.id, {
                reason: `Unauthorised Ban.`
            }).then(guild.owner.send(successfulBan).catch((err) => {
                return console.log(red("[Owner]: " + guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
            }))
                .then(guild.members.unban(target.id, {
                    reason: "Victim of an unlawful ban"
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + guild.owner.send(unsuccessfulBan);
                });
        } else {
            return console.log(`${grey(`[Event Validity]: False`)}\n${magenta("[Reason]: Event was triggered but the timestamps didn't match.")}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.tag + " (User)")}\n${grey("======================================")}\n`)
        }
    }

})

// Fetch Kick
client.on("guildMemberRemove", async member => {

    const eventsTimestamp = Date.now().toString()

    const FetchingLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_KICK",
    }).catch((err) => {
        return console.log(`${red("[Log Error]: True")}\n${red("[Log Error Desc.]: " + err)}`)
    });

    if (!FetchingLogs) return console.log(red("[Entries Error] Unable to fetch Entries."));

    const kickLog = FetchingLogs.entries.first();

    if (!kickLog) {
        return console.log(red(`[Fetch Log Error]: This Log Type: 'MEMBER_KICK' has not been previously seen before while the 'guildMemberRemove' event has been trigerred.`));
    } else {
        console.log(`\n\n${grey("======================================")}\n${yellow("[!] An Event has been fired.")}\n${yellowBright("[Server]: " + member.guild.name)}\n${green("[Event]: 'guildMemberRemove'")}\n${greenBright("[Log Type]: 'MEMBER_KICK'")}`)

        const { executor, target, createdAt, createdTimestamp } = kickLog;

        console.log(`${greenBright(`[Event Desc.]: [USER]: ${target.tag} was kicked / removed from the server.`)}`);
        console.log(`${blue(`[Log Timestamp]: ${createdTimestamp}`)}\n${blueBright(`[Event Timestamp]: ${eventsTimestamp}`)}`);

        /**
         * Checks Whitelisted & Trusted Users Before banning
         */

        const LogTimeString = createdTimestamp.toString();
        const EventExecution = eventsTimestamp;

        const logtime = LogTimeString.slice(0, -3);
        const eventtime = EventExecution.slice(0, -3);

        const logtime2 = LogTimeString.slice(0, -4);
        const eventtime2 = EventExecution.slice(0, -4);

        const TrustedUserIDs = require('./commands/Database/trustedUserIDs.json');
        const Acess = require('./commands/Database/whitelist.json');

        const WhiteListedUser = Acess.find(el => el === `${executor.id}`)
        const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);

        const successfulKick = new MessageEmbed()
            .setDescription(`**Unauthorised Kick By:** ${executor.tag} \n**Victim:** ${target.tag} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const unsuccessfulKick = new MessageEmbed()
            .setDescription(`**Unauthorised Kick By:** ${executor.tag} \n**Victim:** ${target.tag} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given.`)
            .setColor("RED")
            .setTimestamp(Date.now());

        if (logtime === eventtime) {
            console.log(`${grey(`[Event Validity #1]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.tag + " (User)")}`)
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === member.guild.owner.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            member.guild.members.ban(executor.id, {
                reason: `Unauthorised Kick`
            }).then(member.guild.owner.send(successfulKick).catch((err) => {
                return console.log(red("[Owner]: " + member.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
            }).then(() => {
                console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
            })).catch((err) => {
                return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + member.guild.owner.send(unsuccessfulKick).catch((err) => {
                    return console.log(red("[Owner]: " + member.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                });
            });
        } else if (logtime2 === eventtime2) {
            console.log(`${grey(`[Event Validity #2]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.tag + " (User)")}`)
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === member.guild.owner.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            member.guild.members.ban(executor.id, {
                reason: `Unauthorised Kick`
            }).then(member.guild.owner.send(successfulKick).catch((err) => {
                return console.log(red("[Owner]: " + member.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
            }).then(() => {
                console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
            })).catch((err) => {
                return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + member.guild.owner.send(unsuccessfulKick).catch((err) => {
                    return console.log(red("[Owner]: " + member.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                });
            });
        } else {
            return console.log(`${grey(`[Event Validity]: False`)}\n${magenta("[Reason]: Event was triggered but the timestamps didn't match.")}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.tag + " (User)")}\n${grey("======================================")}\n`)
        }
    }

});

// Channel Create
client.on("channelCreate", async (channel) => {

    const eventsTimestamp = Date.now().toString()

    if (!channel.guild) return;

    const FetchingLogs = await client.guilds.cache.get(channel.guild.id).fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_CREATE",
    }).catch((err) => {
        return console.log(`${red("[Log Error]: True")}\n${red("[Log Error Desc.]: " + err)}`)
    });

    if (!FetchingLogs) return console.log(red("[Entries Error] Unable to fetch Entries."));

    const ChannelLog = FetchingLogs.entries.first();

    if (!ChannelLog) {
        return console.log(red(`[Fetch Log Error]: This Log Type: 'CHANNEL_CREATE' has not been previously seen before while the 'channelCreate' event has been trigerred.`));
    } else {
        console.log(`\n\n${grey("======================================")}\n${yellow("[!] An Event has been fired.")}\n${yellowBright("[Server]: " + channel.guild.name)}\n${green("[Event]: 'channelCreate'")}\n${greenBright("[Log Type]: 'CHANNEL_CREATE'")}`);

        console.log(`${greenBright(`[Event Desc.]: [CHANNEL]: "${channel.name}" has been created in the server`)}`);
        const { executor, createdAt, createdTimestamp } = ChannelLog;

        console.log(`${blue(`[Log Timestamp]: ${createdTimestamp}`)}\n${blueBright(`[Event Timestamp]: ${eventsTimestamp}`)}`);

        const successfulBanText = new MessageEmbed()
            .setDescription(`**Unauthorised Channel Created By:** ${executor.tag}\n\n**Channel:** \`${channel.name}\` \n**Channel ID:** ||${channel.id}|| \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulBanCategory = new MessageEmbed()
            .setDescription(`**Unauthorised Category Created By:** ${executor.tag}\n\n**Channel:** \`${channel.name}\` \n**Channel ID:** ||${channel.id}|| \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulBanVoice = new MessageEmbed()
            .setDescription(`**Unauthorised Voice Channel Created By:** ${executor.tag}\n\n**Channel:** \`${channel.name}\` \n**Channel ID:** ||${channel.id}|| \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulBanStore = new MessageEmbed()
            .setDescription(`**Unauthorised Store Channel Created By:** ${executor.tag}\n\n**Channel:** \`${channel.name}\` \n**Channel ID:** ||${channel.id}|| \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulBanNews = new MessageEmbed()
            .setDescription(`**Unauthorised Announcement Channel Created By:** ${executor.tag}\n\n**Channel:** \`${channel.name}\` \n**Channel ID:** ||${channel.id}|| \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulBanUnkownChannel = new MessageEmbed()
            .setDescription(`**Unauthorised Unkown Channel Type Created By:** ${executor.tag} \n**Channel:** \`${channel.name}\` \n**Channel ID:** ||${channel.id}|| \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const unsuccessfulBan = new MessageEmbed()
            .setDescription(`**Unauthorised Channel Created By:** ${executor.tag}\n\n**Channel:** \`${channel.name}\` \n**Channel ID:** ||${channel.id}|| \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given.`)
            .setColor("RED")
            .setTimestamp(Date.now());

        /**
         * Checks Whitelisted & Trusted Users Before banning
         */
        const TrustedUserIDs = require('./commands/Database/trustedUserIDs.json');
        const Acess = require('./commands/Database/whitelist.json');

        const WhiteListedUser = Acess.find(el => el === `${executor.id}`)
        const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);

        const LogTimeString = createdTimestamp.toString();
        const EventExecution = eventsTimestamp;

        const logtime = LogTimeString.slice(0, -3);
        const eventtime = EventExecution.slice(0, -3);

        const logtime2 = LogTimeString.slice(0, -4);
        const eventtime2 = EventExecution.slice(0, -4);

        if (logtime === eventtime) {
            console.log(`${grey(`[Event Validity #1]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + channel.name + " (Channel)")}`);
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === channel.guild.owner.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (channel.type === "text") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Channel Created`
                }).then(channel.guild.owner.send(successfulBanText).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "category") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Category Created`
                }).then(channel.guild.owner.send(successfulBanCategory).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "voice") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Voice Channel Created`
                }).then(channel.guild.owner.send(successfulBanVoice).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "store") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Store Channel Created`
                }).then(channel.guild.owner.send(successfulBanStore).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "news") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Announcement Channel Created`
                }).then(channel.guild.owner.send(successfulBanNews).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Unknown Channel Type Created`
                }).then(channel.guild.owner.send(successfulBanUnkownChannel).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            }
        } else if (logtime2 === eventtime2) {
            console.log(`${grey(`[Event Validity #2]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + channel.name + " (Channel)")}`);
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === channel.guild.owner.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (channel.type === "text") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Channel Created`
                }).then(channel.guild.owner.send(successfulBanText).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "category") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Category Created`
                }).then(channel.guild.owner.send(successfulBanCategory).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "voice") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Voice Channel Created`
                }).then(channel.guild.owner.send(successfulBanVoice).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "store") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Store Channel Created`
                }).then(channel.guild.owner.send(successfulBanStore).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "news") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Announcement Channel Created`
                }).then(channel.guild.owner.send(successfulBanNews).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Unknown Channel Type Created`
                }).then(channel.guild.owner.send(successfulBanUnkownChannel).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            }
        } else {
            return console.log(`${grey(`[Event Validity]: False`)}\n${magenta("[Reason]: Event was triggered but the timestamps didn't match.")}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + channel.id + " (Channel ID)")}\n${grey("======================================")}\n`)
        }
    }
});

// Channel Delete
client.on("channelDelete", async (channel) => {
    const eventsTimestamp = Date.now().toString()

    if (!channel.guild) return;

    const FetchingLogs = await client.guilds.cache.get(channel.guild.id).fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_DELETE",
    }).catch((err) => {
        return console.log(`${red("[Log Error]: True")}\n${red("[Log Error Desc.]: " + err)}`)
    });

    if (!FetchingLogs) return console.log(red("[Entries Error] Unable to fetch Entries."));

    const ChannelLog = FetchingLogs.entries.first();

    if (!ChannelLog) {
        return console.log(red(`[Fetch Log Error]: This Log Type: 'CHANNEL_DELETE' has not been previously seen before while the 'channelDelete' event has been trigerred.`));
    } else {
        console.log(`\n\n${grey("======================================")}\n${yellow("[!] An Event has been fired.")}\n${yellowBright("[Server]: " + channel.guild.name)}\n${green("[Event]: 'channelDelete'")}\n${greenBright("[Log Type]: 'CHANNEL_DELETE'")}`)

        console.log(`${greenBright(`[Event Desc.]: [CHANNEL]: "${channel.name}" has been deleted in the server`)}`);

        const { executor, createdAt, createdTimestamp } = ChannelLog;

        console.log(`${blue(`[Log Timestamp]: ${createdTimestamp}`)}\n${blueBright(`[Event Timestamp]: ${eventsTimestamp}`)}`);

        const successfulBanText = new MessageEmbed()
            .setDescription(`**Unauthorised Channel Deleted By:** ${executor.tag}\n\n**Channel:** \`${channel.name}\` \n**Channel ID:** ||${channel.id}|| \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulBanCategory = new MessageEmbed()
            .setDescription(`**Unauthorised Category Deleted By:** ${executor.tag}\n\n**Channel:** \`${channel.name}\` \n**Channel ID:** ||${channel.id}|| \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulBanVoice = new MessageEmbed()
            .setDescription(`**Unauthorised Voice Channel Deleted By:** ${executor.tag}\n\n**Channel:** \`${channel.name}\` \n**Channel ID:** ||${channel.id}|| \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulBanStore = new MessageEmbed()
            .setDescription(`**Unauthorised Store Channel Deleted By:** ${executor.tag}\n\n**Channel:** \`${channel.name}\` \n**Channel ID:** ||${channel.id}|| \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulBanNews = new MessageEmbed()
            .setDescription(`**Unauthorised Announcement Channel Deleted By:** ${executor.tag}\n\n**Channel:** \`${channel.name}\` \n**Channel ID:** ||${channel.id}|| \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulBanUnkownChannel = new MessageEmbed()
            .setDescription(`**Unauthorised Unkown Channel Type Deleted By:** ${executor.tag} \n**Channel:** \`${channel.name}\` \n**Channel ID:** ||${channel.id}|| \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const unsuccessfulBan = new MessageEmbed()
            .setDescription(`**Unauthorised Channel Deleted By:** ${executor.tag}\n\n**Channel:** \`${channel.name}\` \n**Channel ID:** ||${channel.id}|| \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given.`)
            .setColor("RED")
            .setTimestamp(Date.now());

        /**
         * Checks Whitelisted & Trusted Users Before banning
         */
        const TrustedUserIDs = require('./commands/Database/trustedUserIDs.json');
        const Acess = require('./commands/Database/whitelist.json');
        const WhiteListedUser = Acess.find(el => el === `${executor.id}`)
        const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);

        const LogTimeString = createdTimestamp.toString();
        const EventExecution = eventsTimestamp;

        const logtime = LogTimeString.slice(0, -3);
        const eventtime = EventExecution.slice(0, -3);

        const logtime2 = LogTimeString.slice(0, -4);
        const eventtime2 = EventExecution.slice(0, -4);

        if (logtime === eventtime) {
            console.log(`${grey(`[Event Validity #1]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + channel.name + " (Channel)")}`);
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === channel.guild.owner.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (channel.type === "text") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Channel Deleted`
                }).then(channel.guild.owner.send(successfulBanText).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "category") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Category Deleted`
                }).then(channel.guild.owner.send(successfulBanCategory).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "voice") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Voice Channel Deleted`
                }).then(channel.guild.owner.send(successfulBanVoice).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "store") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Store Channel Deleted`
                }).then(channel.guild.owner.send(successfulBanStore).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "news") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Announcement Channel Deleted`
                }).then(channel.guild.owner.send(successfulBanNews).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Unknown Channel Type Deleted`
                }).then(channel.guild.owner.send(successfulBanUnkownChannel).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            }
        } else if (logtime2 === eventtime2) {
            console.log(`${grey(`[Event Validity #2]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + channel.name + " (Channel)")}`);
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === channel.guild.owner.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (channel.type === "text") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Channel Deleted`
                }).then(channel.guild.owner.send(successfulBanText).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "category") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Category Deleted`
                }).then(channel.guild.owner.send(successfulBanCategory).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "voice") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Voice Channel Deleted`
                }).then(channel.guild.owner.send(successfulBanVoice).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "store") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Store Channel Deleted`
                }).then(channel.guild.owner.send(successfulBanStore).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else if (channel.type === "news") {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Announcement Channel Deleted`
                }).then(channel.guild.owner.send(successfulBanNews).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            } else {
                channel.guild.member(executor.id).ban({
                    reason: `Unauthorised Unknown Channel Type Deleted`
                }).then(channel.guild.owner.send(successfulBanUnkownChannel).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    })
                })
            }
        } else {
            return console.log(`${grey(`[Event Validity]: False`)}\n${magenta("[Reason]: Event was triggered but the timestamps didn't match.")}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + channel.id + " (Channel ID)")}\n${grey("======================================")}\n`)
        }
    }
});

// Bot Banning
client.on("guildMemberAdd", async (member) => {

    const eventsTimestamp = Date.now().toString()

    const FetchingLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: "BOT_ADD",
    }).catch((err) => {
        return console.log(`${red("[Log Error]: True")}\n${red("[Log Error Desc.]: " + err)}`)
    });

    if (!FetchingLogs) return console.log(red("[Entries Error] Unable to fetch Entries."));

    const botAddLog = FetchingLogs.entries.first();

    if (!botAddLog) {
        return console.log(`${red(`[Fetch Log Error]: This Log Type: 'BOT_ADD' has not been previously seen before while the 'guildMemberAdd' event has been trigerred.`)}`);
    } else {

        console.log(`\n\n${grey("======================================")}\n${yellow("[!] An Event has been fired.")}\n${yellowBright("[Server]: " + member.guild.name)}\n${green("[Event]: 'guildMemberAdd'")}\n${greenBright("[Log Type]: 'BOT_ADD'")}`)

        const { executor, target, createdAt, createdTimestamp } = botAddLog;

        console.log(`${greenBright(`[Event Desc.]: [USER]: ${executor.tag} has invited a bot to the server.`)}`);

        console.log(`${blue(`[Log Timestamp]: ${createdTimestamp}`)}\n${blueBright(`[Event Timestamp]: ${eventsTimestamp}`)}`);

        /**
        * Checks Whitelisted & Trusted Users Before banning
        */
        const TrustedUserIDs = require('./commands/Database/trustedUserIDs.json');
        const Acess = require('./commands/Database/whitelist.json');

        const WhiteListedUser = Acess.find(el => el === `${executor.id}`)
        const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);

        const successfulBan = new MessageEmbed()
            .setDescription(`**Unauthorised Bot Added By:** ${executor.tag} \n**Bot:** ${target.tag} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const unsuccessfulBan = new MessageEmbed()
            .setDescription(`**Unauthorised Bot Added By:** ${executor.tag} \n**Bot:** ${target.tag} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given.`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const LogTimeString = createdTimestamp.toString();
        const EventExecution = eventsTimestamp;

        const logtime = LogTimeString.slice(0, -3);
        const eventtime = EventExecution.slice(0, -3);

        const logtime2 = LogTimeString.slice(0, -4);
        const eventtime2 = EventExecution.slice(0, -4);

        if (logtime === eventtime) {
            console.log(`${grey(`[Event Validity #1]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.tag + " (Bot)")}`)
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === member.guild.owner.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (target.bot) {
                member.guild.members.ban(executor.id, {
                    reason: `Unauthorised Bot Added`
                }).then(member.guild.owner.send(successfulBan).catch((err) => {
                    return console.log(red("[Owner]: " + member.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(member.guild.members.ban(target.id, {
                    reason: "Unauthorised Bot"
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                })).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${red("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + member.guild.owner.send(unsuccessfulBan).catch((err) => {
                        return console.log(red("[Owner]: " + member.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                });
            }
        } else if (logtime2 === eventtime2) {
            console.log(`${grey(`[Event Validity #2]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.tag + " (Bot)")}`)
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === member.guild.owner.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (target.bot) {
                member.guild.members.ban(executor.id, {
                    reason: `Unauthorised Bot Added`
                }).then(member.guild.owner.send(successfulBan))
                    .then(member.guild.members.ban(target.id, {
                        reason: "Unauthorised Bot"
                    }).then(() => {
                        console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                    })).catch((err) => {
                        return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + member.guild.owner.send(unsuccessfulBan).catch((err) => {
                            return console.log(red("[Owner]: " + member.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                        });
                    });
            }
        } else {
            return console.log(`${grey(`[Event Validity]: False`)}\n${magenta("[Reason]: Event was triggered but the timestamps didn't match.")}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.tag + " (Bot)")}\n${grey("======================================")}\n`)
        }
    }

});

// Create Role
client.on("roleCreate", async (role) => {
    const eventsTimestamp = Date.now().toString()

    const FetchingLogs = await role.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_CREATE",
    }).catch((err) => {
        return console.log(`${red("[Log Error]: True")}\n${red("[Log Error Desc.]: " + err)}`)
    });

    if (!FetchingLogs) return console.log(red("[Entries Error] Unable to fetch Entries."));

    const roleCreateLogs = FetchingLogs.entries.first();

    if (!roleCreateLogs) {
        return console.log(`${red(`[Fetch Log Error]: This Log Type: 'ROLE_CREATE' has not been previously seen before while the 'roleCreate' event has been trigerred.`)}`);
    } else {
        console.log(`\n\n${grey("======================================")}\n${yellow("[!] An Event has been fired.")}\n${yellowBright("[Server]: " + role.guild.name)}\n${green("[Event]: 'roleCreate'")}\n${greenBright("[Log Type]: 'ROLE_CREATE'")}`)

        console.log(`${greenBright(`[Event Desc.]: [Role]: ${role.name} was created in the server.`)}`);

        const { executor, createdAt, createdTimestamp } = roleCreateLogs;

        console.log(`${blue(`[Log Timestamp]: ${createdTimestamp}`)}\n${blueBright(`[Event Timestamp]: ${eventsTimestamp}`)}`);

        /**
        * Checks Whitelisted & Trusted Users Before banning
        */

        const successfulBan = new MessageEmbed()
            .setDescription(`**Unauthorised Role Created By:** ${executor.tag}\n\n**Role:** ${role.name} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const unsuccessfulBan = new MessageEmbed()
            .setDescription(`**Unauthorised Role Created By:** ${executor.tag}\n\n**Role:** ${role.name} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given.`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const TrustedUserIDs = require('./commands/Database/trustedUserIDs.json');
        const Acess = require('./commands/Database/whitelist.json');

        const WhiteListedUser = Acess.find(el => el === `${executor.id}`)
        const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);

        const LogTimeString = createdTimestamp.toString();
        const EventExecution = eventsTimestamp;

        const logtime = LogTimeString.slice(0, -3);
        const eventtime = EventExecution.slice(0, -3);

        const logtime2 = LogTimeString.slice(0, -4);
        const eventtime2 = EventExecution.slice(0, -4);

        if (logtime === eventtime) {
            console.log(`${grey(`[Event Validity #1]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + role.name + " (Role)")}`)
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === role.guild.owner.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            role.guild.members.ban(executor.id, {
                reason: `Unauthorised Role Created`
            }).then(role.guild.owner.send(successfulBan).catch((err) => {
                return console.log(red("[Owner]: " + role.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
            }).then(() => {
                console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
            })).catch((err) => {
                return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + role.guild.owner.send(unsuccessfulBan).catch((err) => {
                    return console.log(red("[Owner]: " + role.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })
            });
        } else if (logtime2 === eventtime2) {
            console.log(`${grey(`[Event Validity #2]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + role.name + " (Role)")}`)
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === role.guild.owner.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            role.guild.members.ban(executor.id, {
                reason: `Unauthorised Role Created`
            }).then(role.guild.owner.send(successfulBan).catch((err) => {
                return console.log(red("[Owner]: " + role.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
            }).then(() => {
                console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
            })).catch((err) => {
                return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + role.guild.owner.send(unsuccessfulBan).catch((err) => {
                    return console.log(red("[Owner]: " + role.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })
            });
        } else {
            return console.log(`${grey(`[Event Validity]: False`)}\n${magenta("[Reason]: Event was triggered but the timestamps didn't match.")}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + role.name + " (Role)")}\n${grey("======================================")}\n`)
        }
    }

});

// Role Update
client.on("roleUpdate", async (oldRole, newRole) => {
    const eventsTimestamp = Date.now().toString()

    const FetchingLogs = await oldRole.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_UPDATE",
    }).catch((err) => {
        return console.log(`${red("[Log Error]: True")}\n${red("[Log Error Desc.]: " + err)}`)
    });

    if (!FetchingLogs) return console.log(red("[Entries Error] Unable to fetch Entries."));

    const RoleUpdate = FetchingLogs.entries.first();

    if (!RoleUpdate) {
        return console.log(`${red(`[Fetch Log Error]: This Log Type: 'ROLE_UPDATE' has not been previously seen before while the 'roleUpdate' event has been trigerred.`)}`);
    } else {
        console.log(`\n\n${grey("======================================")}\n${yellow("[!] An Event has been fired.")}\n${yellowBright("[Server]: " + oldRole.guild.name)}\n${green("[Event]: 'roleUpdate'")}\n${greenBright("[Log Type]: 'ROLE_UPDATE'")}`)

        console.log(`${greenBright(`[Event Desc.]: [Role]: ${oldRole.name} was updated in the server.`)}`);

        const { executor, createdAt, createdTimestamp } = RoleUpdate;

        console.log(`${blue(`[Log Timestamp]: ${createdTimestamp}`)}\n${blueBright(`[Event Timestamp]: ${eventsTimestamp}`)}`);

        /**
        * Checks Whitelisted & Trusted Users Before banning
        */

        const successfulAdminPermBan = new MessageEmbed()
            .setDescription(`**Unauthorised Role Update By:** ${executor.tag}\n\n**Role:** ${oldRole.name} \n**Permission Update:** \`ADMINISTRATOR\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Role Removal.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulKickPermBan = new MessageEmbed()
            .setDescription(`**Unauthorised Role Update By:** ${executor.tag}\n\n**Role:** ${oldRole.name} \n**Permission Update:** \`KICK_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Role Removal.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulBanPermBan = new MessageEmbed()
            .setDescription(`**Unauthorised Role Update By:** ${executor.tag}\n\n**Role:** ${oldRole.name} \n**Permission Update:** \`BAN_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Role Removal.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulWebhookPermBan = new MessageEmbed()
            .setDescription(`**Unauthorised Role Update By:** ${executor.tag}\n\n**Role:** ${oldRole.name} \n**Permission Update:** \`MANAGE_WEBHOOKS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Role Removal.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        //  Unsuccessful Embeds (Unable to ban executor)

        const unsuccessfulAdminPermBanExecutor = new MessageEmbed()
            .setDescription(`**Unauthorised Role Update By:** ${executor.tag}\n\n**Role:** ${oldRole.name} \n**Permission Update:** \`ADMINISTRATOR\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Executor.**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const unsuccessfulKickPermBanExecutor = new MessageEmbed()
            .setDescription(`**Unauthorised Role Update By:** ${executor.tag}\n\n**Role:** ${oldRole.name} \n**Permission Update:** \`KICK_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Executor.**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const unsuccessfulBanPermBanExecutor = new MessageEmbed()
            .setDescription(`**Unauthorised Role Update By:** ${executor.tag}\n\n**Role:** ${oldRole.name} \n**Permission Update:** \`BAN_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Executor.**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const unsuccessfulWebhookPermBanExecutor = new MessageEmbed()
            .setDescription(`**Unauthorised Role Update By:** ${executor.tag}\n\n**Role:** ${oldRole.name} \n**Permission Update:** \`MANAGE_WEBHOOKS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Executor.**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        // Unsuccessful Embeds (Unable to delete role)

        const unsuccessfulAdminPermBanRole = new MessageEmbed()
            .setDescription(`**Unauthorised Role Update By:** ${executor.tag}\n\n**Role:** ${oldRole.name} \n**Permission Update:** \`ADMINISTRATOR\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Role.**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const unsuccessfulKickPermBanRole = new MessageEmbed()
            .setDescription(`**Unauthorised Role Update By:** ${executor.tag}\n\n**Role:** ${oldRole.name} \n**Permission Update:** \`KICK_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Role.**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const unsuccessfulBanPermBanRole = new MessageEmbed()
            .setDescription(`**Unauthorised Role Update By:** ${executor.tag}\n\n**Role:** ${oldRole.name} \n**Permission Update:** \`BAN_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Role.**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const unsuccessfulWebhookPermBanRole = new MessageEmbed()
            .setDescription(`**Unauthorised Role Update By:** ${executor.tag}\n\n**Role:** ${oldRole.name} \n**Permission Update:** \`MANAGE_WEBHOOKS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Role.**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const TrustedUserIDs = require('./commands/Database/trustedUserIDs.json');
        const Acess = require('./commands/Database/whitelist.json');

        const WhiteListedUser = Acess.find(el => el === `${executor.id}`)
        const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);

        const LogTimeString = createdTimestamp.toString();
        const EventExecution = eventsTimestamp;

        const logtime = LogTimeString.slice(0, -3);
        const eventtime = EventExecution.slice(0, -3);

        const logtime2 = LogTimeString.slice(0, -4);
        const eventtime2 = EventExecution.slice(0, -4);

        if (logtime === eventtime) {
            console.log(`${grey(`[Event Validity #1]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + oldRole.name + " (Role)")}`);
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === oldRole.guild.owner.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);

            if (!oldRole.permissions.has("ADMINISTRATOR") && newRole.permissions.has("ADMINISTRATOR")) {
                oldRole.guild.members.ban(executor.id, {
                    reason: `Unauthorised Role Updated: Admin permissions were added.`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulAdminPermBanExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldRole.guild.owner.send(successfulAdminPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(newRole.delete(
                    "Unauthorised Update In Role" // Reason
                ).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulAdminPermBanRole).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban | Role deleted")}\n${grey("======================================")}\n`)
                }))
            } else if (!oldRole.permissions.has("BAN_MEMBERS") && newRole.permissions.has("BAN_MEMBERS")) {
                oldRole.guild.members.ban(executor.id, {
                    reason: `Unauthorised Role Updated: Ban permissions were added.`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulBanPermBanExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldRole.guild.owner.send(successfulBanPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(newRole.delete(
                    "Unauthorised Update In Role" // Reason
                ).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulBanPermBanRole).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban | Role deleted")}\n${grey("======================================")}\n`)
                }))
            } else if (!oldRole.permissions.has("KICK_MEMBERS") && newRole.permissions.has("KICK_MEMBERS")) {
                oldRole.guild.members.ban(executor.id, {
                    reason: `Unauthorised Role Updated: Kick permissions were added.`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulKickPermBanExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldRole.guild.owner.send(successfulKickPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(newRole.delete(
                    "Unauthorised Update In Role" // Reason
                ).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulKickPermBanRole).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban | Role deleted")}\n${grey("======================================")}\n`)
                }))
            } else if (!oldRole.permissions.has("MANAGE_WEBHOOKS") && newRole.permissions.has("MANAGE_WEBHOOKS")) {
                oldRole.guild.members.ban(executor.id, {
                    reason: `Unauthorised Role Updated: Webhook permissions were added.`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulWebhookPermBanExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldRole.guild.owner.send(successfulWebhookPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(newRole.delete(
                    "Unauthorised Update In Role" // Reason
                ).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulWebhookPermBanRole).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban | Role deleted")}\n${grey("======================================")}\n`)
                }))
            } else {
                return console.log(`${redBright("[ACTION]: NOT AUTHORISED BUT NOT THREATENING")}\n${grey("======================================")}\n`);
            }
        } else if (logtime2 === eventtime2) {
            console.log(`${grey(`[Event Validity #2]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + oldRole.name + " (Role)")}`)
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === oldRole.guild.owner.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (!oldRole.permissions.has("ADMINISTRATOR") && newRole.permissions.has("ADMINISTRATOR")) {
                oldRole.guild.members.ban(executor.id, {
                    reason: `Unauthorised Role Updated: Admin permissions were added.`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulAdminPermBanExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldRole.guild.owner.send(successfulAdminPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(newRole.delete(
                    "Unauthorised Update In Role" // Reason
                ).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulAdminPermBanRole).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban | Role deleted")}\n${grey("======================================")}\n`)
                }))
            } else if (!oldRole.permissions.has("BAN_MEMBERS") && newRole.permissions.has("BAN_MEMBERS")) {
                oldRole.guild.members.ban(executor.id, {
                    reason: `Unauthorised Role Updated: Ban permissions were added.`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulBanPermBanExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldRole.guild.owner.send(successfulBanPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(newRole.delete(
                    "Unauthorised Update In Role" // Reason
                ).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulBanPermBanRole).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban | Role deleted")}\n${grey("======================================")}\n`)
                }))
            } else if (!oldRole.permissions.has("KICK_MEMBERS") && newRole.permissions.has("KICK_MEMBERS")) {
                oldRole.guild.members.ban(executor.id, {
                    reason: `Unauthorised Role Updated: Kick permissions were added.`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulKickPermBanExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldRole.guild.owner.send(successfulKickPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(newRole.delete(
                    "Unauthorised Update In Role" // Reason
                ).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulKickPermBanRole).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban | Role deleted")}\n${grey("======================================")}\n`)
                }))
            } else if (!oldRole.permissions.has("MANAGE_WEBHOOKS") && newRole.permissions.has("MANAGE_WEBHOOKS")) {
                oldRole.guild.members.ban(executor.id, {
                    reason: `Unauthorised Role Updated: Webhook permissions were added.`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulWebhookPermBanExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldRole.guild.owner.send(successfulWebhookPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(newRole.delete(
                    "Unauthorised Update In Role" // Reason
                ).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + oldRole.guild.owner.send(unsuccessfulWebhookPermBanRole).catch((err) => {
                        return console.log(red("[Owner]: " + oldRole.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban | Role deleted")}\n${grey("======================================")}\n`)
                }))
            } else {
                return console.log(`${redBright("[ACTION]: NOT AUTHORISED BUT NOT THREATENING")}\n${grey("======================================")}\n`);
            }
        } else {
            return console.log(`${grey(`[Event Validity]: False`)}\n${magenta("[Reason]: Event was triggered but the timestamps didn't match.")}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + oldRole.name + " (Role)")}\n${grey("======================================")}\n`)
        }
    }

});

// When Member gets a new role or permission(s)
client.on("guildMemberUpdate", async (oldMember, newMember) => {

    const eventsTimestamp = Date.now().toString()

    const FetchingLogs = await oldMember.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_ROLE_UPDATE",
    }).catch((err) => {
        return console.log(`${red("[Log Error]: True")}\n${red("[Log Error Desc.]: " + err)}`)
    });

    if (!FetchingLogs) return console.log(red("[Entries Error] Unable to fetch Entries."));

    const MRU = FetchingLogs.entries.first();

    if (!MRU) {
        return console.log(`${red(`[Fetch Log Error]: This Log Type: 'MEMBER_ROLE_UPDATE' has not been previously seen before while the 'guildMemberUpdate' event has been trigerred.`)}`);
    } else {

        console.log(`\n\n${grey("======================================")}\n${yellow("[!] An Event has been fired.")}\n${yellowBright("[Server]: " + newMember.guild.name)}\n${green("[Event]: 'guildMemberUpdate'")}\n${greenBright("[Log Type]: 'MEMBER_ROLE_UPDATE'")}`)

        console.log(`${greenBright(`[Event Desc.]: [USER/BOT]: ${oldMember.user.tag} Roles, Permissions or Nickname has been changed in the server.`)}`);

        const { executor, target, createdAt, createdTimestamp } = MRU;


        console.log(`${blue(`[Log Timestamp]: ${createdTimestamp}`)}\n${blueBright(`[Event Timestamp]: ${eventsTimestamp}`)}`);

        /**
        * Checks Whitelisted & Trusted Users Before banning
        */
        const TrustedUserIDs = require('./commands/Database/trustedUserIDs.json');
        const Acess = require('./commands/Database/whitelist.json');

        const WhiteListedUser = Acess.find(el => el === `${executor.id}`)
        const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);

        const successfulAdminPermBan = new MessageEmbed()
            .setDescription(`**Unauthorised Member Role Update By:** ${executor.tag}\n\n**Victim** ${target.tag} \n**Permission Update:** \`ADMINISTRATOR\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Executor & Victim.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulKickPermBan = new MessageEmbed()
            .setDescription(`**Unauthorised Member Role Update By:** ${executor.tag}\n\n**Victim** ${target.tag} \n**Permission Update:** \`KICK_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Executor & Victim.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulBanPermBan = new MessageEmbed()
            .setDescription(`**Unauthorised Member Role Update By:** ${executor.tag}\n\n**Victim** ${target.tag} \n**Permission Update:** \`BAN_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Executor & Victim.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const successfulWebhookPermBan = new MessageEmbed()
            .setDescription(`**Unauthorised Member Role Update By:** ${executor.tag}\n\n**Victim** ${target.tag} \n**Permission Update:** \`MANAGE_WEBHOOKS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Executor & Victim.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        // Unsuccessful Ban Executor

        const unsuccessfulBanAdminPermsExecutor = new MessageEmbed()
            .setDescription(`**Unauthorised Member Role Update By:** ${executor.tag}\n\n**Victim** ${target.tag} \n**Permission Update:** \`ADMINISTRATOR\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Executor**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const unsuccessfulBanWebhookPermsExecutor = new MessageEmbed()
            .setDescription(`**Unauthorised Member Role Update By:** ${executor.tag}\n\n**Victim** ${target.tag} \n**Permission Update:** \`MANAGE_WEBHOOKS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Executor**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const unsuccessfulBanPermsExecutor = new MessageEmbed()
            .setDescription(`**Unauthorised Member Role Update By:** ${executor.tag}\n\n**Victim** ${target.tag} \n**Permission Update:** \`BAN_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Executor**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const unsuccessfulBanKickPermsExecutor = new MessageEmbed()
            .setDescription(`**Unauthorised Member Role Update By:** ${executor.tag}\n\n**Victim** ${target.tag} \n**Permission Update:** \`KICK_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Executor**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        // Unsuccessful Ban Victim

        const unsuccessfulBanAdminPermsVictim = new MessageEmbed()
            .setDescription(`**Unauthorised Member Role Update By:** ${executor.tag}\n\n**Victim** ${target.tag} \n**Permission Update:** \`ADMINISTRATOR\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Victim.**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const unsuccessfulBanWebhookPermsVictim = new MessageEmbed()
            .setDescription(`**Unauthorised Member Role Update By:** ${executor.tag}\n\n**Victim** ${target.tag} \n**Permission Update:** \`MANAGE_WEBHOOKS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Victim.**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const unsuccessfulBanPermsVictim = new MessageEmbed()
            .setDescription(`**Unauthorised Member Role Update By:** ${executor.tag}\n\n**Victim** ${target.tag} \n**Permission Update:** \`BAN_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Victim.**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const unsuccessfulBanKickPermsVictim = new MessageEmbed()
            .setDescription(`**Unauthorised Member Role Update By:** ${executor.tag}\n\n**Victim** ${target.tag} \n**Permission Update:** \`KICK_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not Given To The **Victim.**`)
            .setColor("RED")
            .setTimestamp(Date.now());

        const LogTimeString = createdTimestamp.toString();
        const EventExecution = eventsTimestamp;

        const logtime = LogTimeString.slice(0, -3);
        const eventtime = EventExecution.slice(0, -3);

        const logtime2 = LogTimeString.slice(0, -4);
        const eventtime2 = EventExecution.slice(0, -4);

        if (logtime === eventtime) {
            console.log(`${grey(`[Event Validity #1]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.tag + " (Bot/User)")}`)
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === newMember.guild.ownerID) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);

            if (!oldMember.permissions.has("ADMINISTRATOR") && newMember.permissions.has("ADMINISTRATOR")) {
                oldMember.guild.members.ban(executor.id, {
                    reason: `Unauthorised Member Role Updated`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanAdminPermsExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldMember.guild.owner.send(successfulAdminPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(oldMember.guild.members.ban(newMember.id, {
                    reason: "Illegal Passing of Permissions: ADMINISTRATOR"
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanAdminPermsVictim).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                }))
            } else if (!oldMember.permissions.has("KICK_MEMBERS") && newMember.permissions.has("KICK_MEMBERS")) {
                oldMember.guild.members.ban(executor.id, {
                    reason: `Unauthorised Member Role Updated`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanKickPermsExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldMember.guild.owner.send(successfulKickPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(oldMember.guild.members.ban(newMember.id, {
                    reason: "Illegal Passing of Permissions: KICK_MEMBERS"
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanKickPermsVictim).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                }))
            } else if (!oldMember.permissions.has("BAN_MEMBERS") && newMember.permissions.has("BAN_MEMBERS")) {
                oldMember.guild.members.ban(executor.id, {
                    reason: `Unauthorised Member Role Updated`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanPermsExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldMember.guild.owner.send(successfulBanPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(oldMember.guild.members.ban(newMember.id, {
                    reason: "Illegal Passing of Permissions: BAN_MEMBERS"
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanPermsVictim).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                }))
            } else if (!oldMember.permissions.has("MANAGE_WEBHOOKS") && newMember.permissions.has("MANAGE_WEBHOOKS")) {
                oldMember.guild.members.ban(executor.id, {
                    reason: `Unauthorised Member Role Updated`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanWebhookPermsExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldMember.guild.owner.send(successfulWebhookPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(oldMember.guild.members.ban(newMember.id, {
                    reason: "Illegal Passing of Permissions: MANAGE_WEBHOOKS"
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanWebhookPermsVictim).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                }))
            } else {
                return console.log(`${redBright("[ACTION]: NOT AUTHORISED BUT NOT THREATENING")}\n${grey("======================================")}\n`);
            }
        } else if (logtime2 === eventtime2) {
            console.log(`${grey(`[Event Validity #2]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.tag + " (Bot/User)")}`)
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === newMember.guild.ownerID) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);

            if (!oldMember.permissions.has("ADMINISTRATOR") && newMember.permissions.has("ADMINISTRATOR")) {
                oldMember.guild.members.ban(executor.id, {
                    reason: `Unauthorised Member Role Updated`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanAdminPermsExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldMember.guild.owner.send(successfulAdminPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(oldMember.guild.members.ban(newMember.id, {
                    reason: "Illegal Passing of Permissions: ADMINISTRATOR"
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanAdminPermsVictim).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                }))
            } else if (!oldMember.permissions.has("KICK_MEMBERS") && newMember.permissions.has("KICK_MEMBERS")) {
                oldMember.guild.members.ban(executor.id, {
                    reason: `Unauthorised Member Role Updated`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanKickPermsExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldMember.guild.owner.send(successfulKickPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(oldMember.guild.members.ban(newMember.id, {
                    reason: "Illegal Passing of Permissions: KICK_MEMBERS"
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanKickPermsVictim).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                }))
            } else if (!oldMember.permissions.has("BAN_MEMBERS") && newMember.permissions.has("BAN_MEMBERS")) {
                oldMember.guild.members.ban(executor.id, {
                    reason: `Unauthorised Member Role Updated`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanPermsExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldMember.guild.owner.send(successfulBanPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(oldMember.guild.members.ban(newMember.id, {
                    reason: "Illegal Passing of Permissions: BAN_MEMBERS"
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanPermsVictim).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                }))
            } else if (!oldMember.permissions.has("MANAGE_WEBHOOKS") && newMember.permissions.has("MANAGE_WEBHOOKS")) {
                oldMember.guild.members.ban(executor.id, {
                    reason: `Unauthorised Member Role Updated`
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanWebhookPermsExecutor).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(oldMember.guild.owner.send(successfulWebhookPermBan).catch((err) => {
                    return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                })).then(oldMember.guild.members.ban(newMember.id, {
                    reason: "Illegal Passing of Permissions: MANAGE_WEBHOOKS"
                }).catch((err) => {
                    return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + newMember.guild.owner.send(unsuccessfulBanWebhookPermsVictim).catch((err) => {
                        return console.log(red("[Owner]: " + newMember.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                    });
                }).then(() => {
                    console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`)
                }))
            } else {
                return console.log(`${redBright("[ACTION]: NOT AUTHORISED BUT NOT THREATENING")}\n${grey("======================================")}\n`);
            }
        } else {
            return console.log(`${grey(`[Event Validity]: False`)}\n${magenta("[Reason]: Event was triggered but the timestamps didn't match.")}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.tag + " (Bot)")}\n${grey("======================================")}\n`)
        }
    }

});

// Webhook Create
client.on("webhookUpdate", async channel => {

    const eventsTimestamp = Date.now().toString()

    const FetchingLogs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: "WEBHOOK_CREATE"
    }).catch((err) => {
        return console.log(`${red("[Log Type]: 'WEBHOOK_DELETE'\n[Log Error]: True")}\n${red("[Log Error Desc.]: " + err)}`)
    });

    if (!FetchingLogs) return console.log(red("[Entries Error] Unable to fetch Entries."));
    const WBU = FetchingLogs.entries.first();

    if (!WBU) {
        return console.log(`${red(`[Fetch Log Error]: This Log Type: 'WEBHOOK_CREATE' has not been previously seen before while the 'webhookUpdate' event has been trigerred.`)}`);
    } else {
        const { executor, target, createdAt, createdTimestamp } = WBU;

        console.log(`\n\n${grey("======================================")}\n${yellow("[!] An Event has been fired.")}\n${yellowBright("[Server]: " + channel.guild.name)}\n${green("[Event]: 'webhookUpdate'")}\n${greenBright("[Log Type]: 'WEBHOOK_CREATE'")}`)
        console.log(`${greenBright(`[Event Desc.]: [Webhook]: ${target.name} Was created`)}`);

        console.log(`${blue(`[Log Timestamp]: ${createdTimestamp}`)}\n${blueBright(`[Event Timestamp]: ${eventsTimestamp}`)}`);

        /**
        * Checks Whitelisted & Trusted Users Before banning
        */
        const TrustedUserIDs = require('./commands/Database/trustedUserIDs.json');
        const Acess = require('./commands/Database/whitelist.json');

        const WhiteListedUser = Acess.find(el => el === `${executor.id}`)
        const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);

        // Unsuccessful Ban Executor

        const WebhookBan = new MessageEmbed()
            .setDescription(`**Unauthorised Webhook Created By:** ${executor.tag}\n\n**Webhook Name:** ${target.name} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const WebhookBanError = new MessageEmbed()
            .setDescription(`**Unauthorised Webhook Created By:** ${executor.tag}\n\n**Webhook Name:** ${target.name} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not given.\n**Reason:** Missing Permissions.`)
            .setColor("RED")
            .setTimestamp(Date.now());

        // Unsuccessful Ban Victim

        const LogTimeString = createdTimestamp.toString();
        const EventExecution = eventsTimestamp;

        const logtime = LogTimeString.slice(0, -3);
        const eventtime = EventExecution.slice(0, -3);

        const logtime2 = LogTimeString.slice(0, -4);
        const eventtime2 = EventExecution.slice(0, -4);

        if (logtime === eventtime) {
            console.log(`${grey(`[Event Validity #1]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.name + " (Webhook)")}`)
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === channel.guild.ownerID) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            channel.guild.member(executor).ban({ reason: "Unauthorised Webhook Creation" }).catch((err) => {
                return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(WebhookBanError).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                });
            }).then(() => {
                return console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`) + channel.guild.owner.send(WebhookBan).catch((err) => {
                    console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                });
            })
        } else if (logtime2 === eventtime2) {
            console.log(`${grey(`[Event Validity #2]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.name + " (Webhook)")}`)
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === channel.guild.ownerID) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            channel.guild.member(executor).ban({ reason: "Unauthorised Webhook Creation" }).catch((err) => {
                return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(WebhookBanError).catch((err) => {
                    console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                });
            }).then(() => {
                return console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`) + channel.guild.owner.send(WebhookBan).catch((err) => {
                    console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                });
            })
        } else {
            return console.log(`${grey(`[Event Validity]: False`)}\n${magenta("[Reason]: Event was triggered but the timestamps didn't match.")}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.tag + " (Bot)")}\n${grey("======================================")}\n`)
        }
    }

});

// Webhook Delete
client.on("webhookUpdate", async channel => {
    const eventsTimestamp = Date.now().toString()

    const FetchingLogs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: "WEBHOOK_DELETE"
    }).catch((err) => {
        return console.log(`${red("[Log Type]: 'WEBHOOK_DELETE'\n[Log Error]: True")}\n${red("[Log Error Desc.]: " + err)}`)
    });

    if (!FetchingLogs) return console.log(red("[Entries Error] Unable to fetch Entries."));

    const WBD = FetchingLogs.entries.first();

    if (!WBD) {
        return console.log(`${red(`[Fetch Log Error]: This Log Type: 'WEBHOOK_DELETE' has not been previously seen before while the 'webhookUpdate' event has been trigerred.`)}`);
    } else {
        const { executor, target, createdAt, createdTimestamp } = WBD;

        console.log(`\n\n${grey("======================================")}\n${yellow("[!] An Event has been fired.")}\n${yellowBright("[Server]: " + channel.guild.name)}\n${green("[Event]: 'webhookUpdate'")}\n${greenBright("[Log Type]: 'WEBHOOK_DELETE'")}`)
        console.log(`${greenBright(`[Event Desc.]: [Webhook]: ${target.name} Was deleted.`)}`);

        console.log(`${blue(`[Log Timestamp]: ${createdTimestamp}`)}\n${blueBright(`[Event Timestamp]: ${eventsTimestamp}`)}`);

        /**
        * Checks Whitelisted & Trusted Users Before banning
        */
        const TrustedUserIDs = require('./commands/Database/trustedUserIDs.json');
        const Acess = require('./commands/Database/whitelist.json');

        const WhiteListedUser = Acess.find(el => el === `${executor.id}`)
        const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);

        // Unsuccessful Ban Executor

        const WebhookBan = new MessageEmbed()
            .setDescription(`**Unauthorised Webhook Deleted By:** ${executor.tag}\n\n**Webhook Name:** ${target.name} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)
            .setColor(0x36393E)
            .setTimestamp(Date.now());

        const WebhookBanError = new MessageEmbed()
            .setDescription(`**Unauthorised Webhook Deleted By:** ${executor.tag}\n\n**Webhook Name:** ${target.name} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Not given.\n**Reason:** Missing Permissions.`)
            .setColor("RED")
            .setTimestamp(Date.now());

        // Unsuccessful Ban Victim

        const LogTimeString = createdTimestamp.toString();
        const EventExecution = eventsTimestamp;

        const logtime = LogTimeString.slice(0, -3);
        const eventtime = EventExecution.slice(0, -3);

        const logtime2 = LogTimeString.slice(0, -4);
        const eventtime2 = EventExecution.slice(0, -4);

        if (logtime === eventtime) {
            console.log(`${grey(`[Event Validity #1]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.name + " (Webhook)")}`)
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === channel.guild.ownerID) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            channel.guild.member(executor).ban({ reason: "Unauthorised Webhook Deleted" }).catch((err) => {
                return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(WebhookBanError).catch((err) => {
                    return console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                });
            }).then(() => {
                return console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`) + channel.guild.owner.send(WebhookBan).catch((err) => {
                    console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                });
            })
        } else if (logtime2 === eventtime2) {
            console.log(`${grey(`[Event Validity #2]: True`)}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.name + " (Webhook)")}`)
            if (executor.id === client.user.id) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === channel.guild.ownerID) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            if (executor.id === WhiteListedUser || Trusted) return console.log(`${magentaBright(`[Action Type]: AUTHORISED`)}\n${grey("======================================")}\n`);
            channel.guild.member(executor).ban({ reason: "Unauthorised Webhook Deleted" }).catch((err) => {
                return console.log(`${redBright("[Trial]: False")}\n${red("[Sentence]: No Sentence Given")}\n${magentaBright("[Sentence Error]: " + err)}\n${grey("======================================")}\n`) + channel.guild.owner.send(WebhookBanError).catch((err) => {
                    console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                });
            }).then(() => {
                return console.log(`${redBright("[Trial]: True")}\n${red("[Sentence]: Ban")}\n${grey("======================================")}\n`) + channel.guild.owner.send(WebhookBan).catch((err) => {
                    console.log(red("[Owner]: " + channel.guild.owner.user.tag + " could not be messaged. [Message Error Desc.]: " + err));
                });
            })
        } else {
            return console.log(`${grey(`[Event Validity]: False`)}\n${magenta("[Reason]: Event was triggered but the timestamps didn't match.")}\n${cyan("[Executor]: " + executor.tag)}\n${cyanBright("[Target]: " + target.tag + " (Bot)")}\n${grey("======================================")}\n`)
        }
    }
});


client.login(token);
