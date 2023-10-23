const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const Database = require("../../Schemas/infractions");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("startDaily")
    .setDescription("Ping all registered users once a day with wether or not they were peanuted")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        

    }
}

