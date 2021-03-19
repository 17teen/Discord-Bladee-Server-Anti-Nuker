// https://github.com/17teen
// Discord: 7teen#3868

// API
const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: "everyone" }, { ws: { intents: new Discord.Intents(Discord.Intents.ALL) } });
const fs = require("fs");
const { join } = require("path");
// Settings
const settings = require('./settings.json');
const token = settings.token;
const prefix = settings.prefix;
const author = settings.author;
const settings2 = require('./Commands/settings.json');
const enableGuilds = settings2.AllowGuilds;
// White Listing/Black Listing
const Acess = require('./Commands/Database/whitelist.json');
const Bacess = require('./Commands/Database/blacklist.json');
const TrustedUserIDs = require('./Commands/Database/trustedUserIDs.json');
// Commando Structure
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(join(__dirname, "Commands")).filter(file => file.endsWith(".js"));
const commandFilesBlacklist = fs.readdirSync(join(__dirname, "Commands/Blacklist")).filter(file => file.endsWith(".js"));
const commandFilesTrust = fs.readdirSync(join(__dirname, "Commands/Trust")).filter(file => file.endsWith(".js"));
const commandFilesWhitelist = fs.readdirSync(join(__dirname, "Commands/Whitelist")).filter(file => file.endsWith(".js"));
const commandFilesMod = fs.readdirSync(join(__dirname, "Commands/Mod")).filter(file => file.endsWith(".js"));
const commandFilesMenu = fs.readdirSync(join(__dirname, "Commands/Menu")).filter(file => file.endsWith(".js"));
const commandFilesEND = fs.readdirSync(join(__dirname, "Commands/Enabling & Disabling")).filter(file => file.endsWith(".js"));
const commandFilesAddnRemove = fs.readdirSync(join(__dirname, "Commands/Add & Remove")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "Commands", `${file}`));
    client.commands.set(command.name, command);
}

for (const file of commandFilesBlacklist) {
    const command = require(join(__dirname, "Commands/Blacklist", `${file}`));
    client.commands.set(command.name, command);
}

for (const file of commandFilesTrust) {
    const command = require(join(__dirname, "Commands/Trust", `${file}`));
    client.commands.set(command.name, command);
}

for (const file of commandFilesWhitelist) {
    const command = require(join(__dirname, "Commands/Whitelist", `${file}`));
    client.commands.set(command.name, command);
}

for (const file of commandFilesMod) {
    const command = require(join(__dirname, "Commands/Mod", `${file}`));
    client.commands.set(command.name, command);
}

for (const file of commandFilesEND) {
    const command = require(join(__dirname, "Commands/Enabling & Disabling", `${file}`));
    client.commands.set(command.name, command);
}

for (const file of commandFilesMenu) {
    const command = require(join(__dirname, "Commands/Menu", `${file}`));
    client.commands.set(command.name, command);
}

for (const file of commandFilesAddnRemove) {
    const command = require(join(__dirname, "Commands/Add & Remove", `${file}`));
    client.commands.set(command.name, command);
}

// Event Managing
const events = require("events");
const eventEmitter = new events.EventEmitter();
eventEmitter.setMaxListeners(300); // Listeners
// Customizations
const { red, green, blue, yellow, cyan, magenta, greenBright, bgGreen, magentaBright, yellowBright } = require('chalk');
// Title
const Title = String.raw`



                            ██████╗ ██╗      █████╗ ██████╗ ███████╗███████╗   
                            ██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝██╔════╝   
                            ██████╔╝██║     ███████║██║  ██║█████╗  █████╗     
                            ██╔══██╗██║     ██╔══██║██║  ██║██╔══╝  ██╔══╝     
                            ██████╔╝███████╗██║  ██║██████╔╝███████╗███████╗██╗
                            ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚═╝
                                                   
                                  Anti Nuke | 7teen | Author: ${author}

`;

console.log(magenta(Title));


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

    // Args
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).run(client, message, args);

    } catch (error) {
        console.error(error);
    }

    // Not Onwer
    const notOwner = new Discord.MessageEmbed()
        .setDescription('Error: You must be Owner or a \`Trusted User\` to be granted access to this command.')
        .setColor(0x36393E)

    // No Admin
    const noadmin = new Discord.MessageEmbed()
        .setDescription(`*You are missing \`ADMINISTRATOR\` permissions to perform this execution.*`)
        .setColor(0x36393E)

    // Logs Command
    if (message.content.startsWith(prefix)) {

        const d = new Date();
        const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();

        console.log(green(`[COMMAND RAN] : ${message.content} | ${message.author.tag} | [SERVER] : ${message.guild.name} | [TIME] : ${date}`))
    }


})

client.on("guildCreate", async guild => {
    // This event triggers when the bot joins a guild.
    console.log(``);
    console.log(greenBright(`[GUILD JOINED] ${guild.name} | [ID] ${guild.id} | [ (+) MEMBERCOUNT: ${guild.memberCount}]`));
    console.log(``);

    const AllowedGuildIDs = settings2.PermittedGuilds.find((g) => g === `${guild.id}`);
    const PrivGuild = settings2.LockGuildID;

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

// Blacklist User from server
client.on('guildMemberAdd', member => {
    const BlacklistedUserID = Bacess.find((u) => u === `${member.id}`);
    const noAcess = new Discord.MessageEmbed()
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

    const fetchingLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_BAN_ADD",
    })
    const banLog = fetchingLogs.entries.first();

    if (!banLog) {
        return console.log(red(`${user.tag} was banned in ${guild.name} but nothing was registered in the audit log...`));
    }

    const { executor, target, createdAt } = banLog;

    if (target.id === user.id) {
        console.log(greenBright(`${user.tag} got banned in ${guild.name}, by ${executor.tag}`));
    } else if (target.id === executor.id) {
        return;
    }
    const WhitelistedUser = Acess.find(el => el === `${executor.id}`)
    const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);
    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === guild.owner.id) {
        return;
    } else if (executor.id === WhitelistedUser || Trusted) {
        return;
    } else {
        await guild.member(executor).ban({
            reason: `Unauthorised ban.`
        }).then(guild.owner.send(`**Unauthorised Ban By:** ${executor.tag} \n**Victim:** ${target.tag} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)).catch(err => {
            return
        });
    }

})

// Fetch Kick
client.on("guildMemberRemove", async member => {

    const FetchingLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_KICK",
    });

    const kickLog = FetchingLogs.entries.first();

    if (!kickLog) {
        return console.log(red(`${member.user.tag} was kicked in ${member.guild.name} but nothing was registered in the audit log...`));
    }

    const { executor, target, createdAt } = kickLog

    if (target.id === member.id) {
        console.log(greenBright(`${member.user.tag} got kicked in ${member.guild.name}, by ${executor.tag}`));
    } else if (target.id === executor.id) {
        return
    }

    const WhitelistedUser = Acess.find(el => el === `${executor.id}`)
    const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);
    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === member.guild.owner.id) {
        return;
    } else if (executor.id === WhitelistedUser || Trusted) {
        return;
    } else {
        member.guild.members.ban(executor.id, {
            reason: `Unauthorised Kick`
        }).then(member.guild.owner.send(`**Unauthorised Kick By:** ${executor.tag} \n**Victim:** ${target.tag} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)).catch(err => {
            return console.log(red("ERROR: BAN WAS NOT FULLY EXECUTED"));
        });
    }

});

// Channel Create
client.on("channelCreate", async (channel) => {

    if (!channel.guild) return;

    const FetchingLogs = await client.guilds.cache.get(channel.guild.id).fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_CREATE",
    });

    const ChannelLog = FetchingLogs.entries.first();

    if (!ChannelLog) {
        return console.log(red(`CHANNEL: ${channel.id} was created.`));
    }

    const { executor, target, createdAt } = ChannelLog;

    if (target.id === channel.id || executor.id !== channel.guild.owner.id) {
        console.log(greenBright(`CHANNEL ID: ${channel.id} got created, by ${executor.tag}`));
    } else if (target.id === executor.id) {
        return;
    } else if (target.id === channel.id || executor.id === channel.guild.owner.id) {
        console.log(greenBright(`CHANNEL ID: ${channel.id} got created, by OWNER: ${executor.tag} | No Punishment Needed.`));
    }

    const WhitelistedUser = Acess.find(el => el === `${executor.id}`)
    const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);
    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === channel.guild.owner.id) {
        return;
    } else if (executor.id === WhitelistedUser || Trusted) {
        return;
    } else {
        channel.guild.member(executor.id).ban({
            reason: `Unauthorised Channel Created`
        }).then(channel.guild.owner.send(`**Unauthorised Channel Created By:** ${executor.tag} \n**Channel ID:** ${channel.id} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)).catch();
    }
});

// Channel Delete
client.on("channelDelete", async (channel) => {
    if (!channel.guild) return;

    const FetchingLogs = await client.guilds.cache.get(channel.guild.id).fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_DELETE",
    });

    const ChannelLog = FetchingLogs.entries.first();

    if (!ChannelLog) {
        return console.log(red(`CHANNEL: ${channel.id} was deleted.`));
    }

    const { executor, target, createdAt } = ChannelLog;

    if (target.id === channel.id || executor.id !== channel.guild.owner.id) {
        console.log(greenBright(`CHANNEL ID: ${channel.id} got deleted, by ${executor.tag}`));
    } else if (target.id === channel.id || executor.id === channel.guild.owner.id) {
        console.log(greenBright(`CHANNEL ID: ${channel.id} got deleted, by OWNER: ${executor.tag} | No Punishment Needed.`));
    }

    const WhitelistedUser = Acess.find(el => el === `${executor.id}`)
    const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);
    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === channel.guild.owner.id) {
        return;
    } else if (executor.id === WhitelistedUser || Trusted) {
        return;
    } else {
        channel.guild.member(executor.id).ban({
            reason: `Unauthorised Channel Deleted`
        }).then(channel.guild.owner.send(`**Unauthorised Channel Deleted By:** ${executor.tag} \n**Channel ID:** ${channel.id} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`)).catch();
    }
});

// Bot Banning
client.on("guildMemberAdd", async (member) => {

    const FetchingLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: "BOT_ADD",
    });

    const kickLog = FetchingLogs.entries.first();

    if (!kickLog) {
        return console.log(red(`BOT: ${member.user.tag} was invited in ${member.guild.name} but nothing was registered in the audit log...`));
    }

    const { executor, target, createdAt } = kickLog

    if (target.id === member.id) {
        console.log(greenBright(`BOT: ${member.user.tag} was invited in ${member.guild.name}, by ${executor.tag}`));
    } else if (target.id === executor.id) {
        return
    }

    const WhitelistedUser = Acess.find(el => el === `${executor.id}`)
    const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);
    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === member.guild.owner.id) {
        return;
    } else if (executor.id === WhitelistedUser || Trusted) {
        return;
    } else {
        member.guild.members.ban(executor.id, {
            reason: `Unauthorised Bot Added`
        }).then(member.guild.owner.send(`**Unauthorised Bot Added By:** ${executor.tag} \n**Bot:** ${target.tag} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`))
            .then(member.guild.members.ban(member.id, {
                reason: "Unauthorised Bot"
            }))
            .catch(err => {
                return console.log(red("ERROR: BAN WAS NOT FULLY EXECUTED"));
            });
    }

});

// Create Role
client.on("roleCreate", async (role) => {
    const FetchingLogs = role.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_CREATE",
    });

    const roleCreateLogs = (await FetchingLogs).entries.first();

    if (!roleCreateLogs) {
        return console.log(red(`ROLE: ${role.name} was created in ${role.guild.name} but nothing was registered in the audit log...`));
    }

    const { target, executor, createdAt } = roleCreateLogs;

    if (target.id === role.id) {
        console.log(greenBright(`ROLE: ${role.name} was created in ${role.guild.name}, by ${executor.tag}`));
    } else if (target.id === executor.id) {
        return
    }

    const WhitelistedUser = Acess.find(el => el === `${executor.id}`)
    const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);
    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === role.guild.owner.id) {
        return;
    } else if (executor.id === WhitelistedUser || Trusted) {
        return;
    } else {
        role.guild.members.ban(executor.id, {
            reason: `Unauthorised Role Created`
        }).then(role.guild.owner.send(`**Unauthorised Role Created By:** ${executor.tag} \n**Role:** ${role.name} \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban.`))
    }

});

// Role Update
client.on("roleUpdate", async (oldRole, newRole) => {
    const FetchingLogs = oldRole.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_UPDATE",
    });

    const RoleUpdate = (await FetchingLogs).entries.first();

    if (!RoleUpdate) {
        return console.log(red(`ROLE: ${oldRole.name} was updated in ${oldRole.guild.name} but nothing was registered in the audit log...`));
    }

    const { target, executor, createdAt } = RoleUpdate;

    if (target.id === oldRole.id) {
        console.log(greenBright(`ROLE: ${oldRole.name} was updated in ${oldRole.guild.name}, by ${executor.tag}`));
    } else if (target.id === executor.id) {
        return;
    }

    const WhitelistedUser = Acess.find(el => el === `${executor.id}`)
    const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);
    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === oldRole.guild.owner.id) {
        return;
    } else if (executor.id === WhitelistedUser || Trusted) {
        return;
    } else if (!oldRole.permissions.has("ADMINISTRATOR") && newRole.permissions.has("ADMINISTRATOR")) {
        oldRole.guild.members.ban(executor.id, {
            reason: `Unauthorised Role Updated`
        }).then(oldRole.guild.owner.send(`**Unauthorised Role Update By:** ${executor.tag} \n**Role:** ${oldRole.name} \n**Permission Update:** \`ADMINISTRATOR\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban. | Role Removal.`))
            .then(newRole.delete(
                "Unauthorised Update In Role" // Reason
            ))
            .catch();
    } else if (!oldRole.permissions.has("BAN_MEMBERS") && newRole.permissions.has("BAN_MEMBERS")) {
        oldRole.guild.members.ban(executor.id, {
            reason: `Unauthorised Role Updated`
        }).then(oldRole.guild.owner.send(`**Unauthorised Role Update By:** ${executor.tag} \n**Role:** ${oldRole.name} \n**Permission Update:** \`BAN_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban. | Role Removal.`))
            .then(newRole.delete(
                "Unauthorised Update In Role" // Reason
            ))
            .catch();
    } else if (!oldRole.permissions.has("KICK_MEMBERS") && newRole.permissions.has("KICK_MEMBERS")) {
        oldRole.guild.members.ban(executor.id, {
            reason: `Unauthorised Role Updated`
        }).then(oldRole.guild.owner.send(`**Unauthorised Role Update By:** ${executor.tag} \n**Role:** ${oldRole.name} \n**Permission Update:** \`KICK_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban. | Role Removal.`))
            .then(newRole.delete(
                "Unauthorised Update In Role" // Reason
            ))
            .catch();
    }

});

client.on("guildMemberUpdate", async (oldMember, newMember) => {

    const FetchingLogs = oldMember.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_ROLE_UPDATE",
    });

    const guild = oldMember.guild;

    const MRU = (await FetchingLogs).entries.first();

    if (!MRU) {
        return console.log(red(`MEMBER ROLE UPDATE: ${oldMember.user.tag} roles was updated in ${oldMember.guild.name} but nothing was registered in the audit log...`));
    }

    const { target, executor, createdAt } = MRU;

    if (target.id === oldMember.id) {
        console.log(greenBright(`MEMBER ROLE UPDATE: ${oldMember.user.tag} was updated in ${oldMember.guild.name}, by ${executor.tag}`));
    } else if (target.id === executor.id) {
        return;
    }

    const WhitelistedUser = Acess.find(el => el === `${executor.id}`)
    const Trusted = TrustedUserIDs.find((user) => user === `${executor.id}`);
    if (executor.id === client.user.id) {
        return;
    } else if (executor.id === guild.owner.id) {
        return;
    } else if (executor.id === WhitelistedUser || Trusted) {
        return;
    } else if (!oldMember.permissions.has("ADMINISTRATOR") && newMember.permissions.has("ADMINISTRATOR")) {
        oldMember.guild.members.ban(executor.id, {
            reason: `Unauthorised Member Role Updated`
        }).then(oldMember.guild.owner.send(`**Unauthorised Member Role Update By:** ${executor.tag} \n**Victim** ${oldMember.user.tag} \n**Permission Update:** \`ADMINISTRATOR\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Executor & Victim.`))
            .then(oldMember.guild.members.ban(newMember.id, {
                reason: "Illegal Passing of Permissions: ADMINISTRATOR"
            }))
            .catch();
    } else if (!oldMember.permissions.has("KICK_MEMBERS") && newMember.permissions.has("KICK_MEMBERS")) {
        oldMember.guild.members.ban(executor.id, {
            reason: `Unauthorised Member Role Updated`
        }).then(oldMember.guild.owner.send(`**Unauthorised Member Role Update By:** ${executor.tag} \n**Victim** ${oldMember.user.tag} \n**Permission Update:** \`KICK_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Executor & Victim.`))
            .then(oldMember.guild.members.ban(newMember.id, {
                reason: "Illegal Passing of Permissions: KICK_MEMBERS"
            }))
            .catch();
    } else if (!oldMember.permissions.has("BAN_MEMBERS") && newMember.permissions.has("BAN_MEMBERS")) {
        oldMember.guild.members.ban(executor.id, {
            reason: `Unauthorised Member Role Updated`
        }).then(oldMember.guild.owner.send(`**Unauthorised Member Role Update By:** ${executor.tag} \n**Victim** ${oldMember.user.tag} \n**Permission Update:** \`BAN_MEMBERS\` \n**Time:** ${createdAt.toDateString()} \n**Sentence:** Ban | Executor & Victim.`))
            .then(oldMember.guild.members.ban(newMember.id, {
                reason: "Illegal Passing of Permissions: BAN_MEMBERS"
            }))
            .catch();
    }

})


client.login(token);
