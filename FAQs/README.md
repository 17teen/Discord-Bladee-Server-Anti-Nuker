![Bladee-FAQs-Wallpaper-#3 cropped](https://user-images.githubusercontent.com/71920969/113476517-dcb60b80-9473-11eb-88ff-b4597c41bbf0.jpg)

# Frequently Asked Questions

## General

### Whitelisting:
Whitelisting allows user(s) to do all Administration actions without being punished.

- How to Use:
* `prefix`wl `[User ID]`

> Assignable By: Trusted User, Server Owner and Founder (If using private mode)
> Advantages: Bypass Anti Nuke Punishments.
> Limitations: Whitelisted users cannot assign others to the whitelist, blacklist or Trust system.

### Blacklisting:
Blacklisting allows user(s) to be permanently unable to rejoin your server.

- How to Use:
* `prefix`bl `[User ID]`

> Assignable By: Trusted User, Server Owner and Founder (If using private mode).
> Advantages: Blacklisted user will never come back to bother you.

### Trust System:
The Trust System is a system which alllows user(s) to have some sort of administrator authority on your bot.

- How to Use:
* `prefix`trust `[User ID]`

> Assignable By: Server Owner and Founder (If using private mode).
> Advantages: Bypass Anti Nuke Punishments | Assign others to Whitelist and Blacklist.
> Limitations: Trusted users cannot assign others to the Trust System.
> Warning: Grant the Trust System to the ones you trust the most.

## Global Mode

### What is Global Blacklist?
The global blacklist acts like a border between the user and the server the bot is in. Aka Hard Banning or Perm Banning.

- How to Use:
* `prefix`gbl `[User ID]`

> Assignable By: Dev Team Members.
> Advantages: Removes annoying people from joining the servers your bot is in.

## Private Mode

### Is There A Youtube Tutorial For This Tool?
No. Coming soon.

----------------

### Why Does Database Not Differ For Every Server?
The reason for this is because the database is for private use. It will have one set of databases for the entire bot.

----------------

### Why My Bot Keeps Leaving My Server?
The guild which you invited the bot or trying to run a command in is not whitelisted.

Match these conditions to your desire:

if: `AllowGuilds` is set to `false`

- You can only add **one** guild ID to the `LockGuildID` object.

if: `AllowGuilds` is set to `true`

- You can add multiple guild ID's to the `PermittedGuilds` Array
- If your previous guild ID which is in `LockGuildID` is not in `PermittedGuilds` add it so it wont leave the server.
- Make sure to always put your guild ID in between quotation marks | `"GUILD_ID"`.

> Tip: Use `prefix`**eguilds** to Enable the usage of multiple guilds then use `prefix`**aguild** `[GUILD_ID]` to add your guild to the `PermittedGuilds` Array.

## Bugs:

### Repeated Offender:

**Description:** A previous server attacker or a random user sometimes was subject to unfair banning of the bot.

**Issue: Explained**

![Repeated Offender Bug](https://user-images.githubusercontent.com/71920969/122656137-e0daf680-d14f-11eb-94d9-63691a371598.png)

**How it was solved:** Keeping a record of the event timestamp and the log timestamp then comparing the two timestamps to see if they're close enough to come to a conclusion that an offense / unauthorised action is deemed valid to ban or to not.
