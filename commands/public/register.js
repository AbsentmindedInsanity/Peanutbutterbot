const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const Database = require("../../Schemas/nutTracker");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Registers you to the would you rather peanut butter event"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { member } = interaction;
        let replyText = "You are already registered"

        let userData = await Database.findOne({User: member.id})
        if (!userData) {
            userData = await Database.create({User: member.id, UserTag: member.user.tag, NutCount: 0})
            replyText = "Welcome to peanut buttery hell. Are you ready?"
        }

        const replyEmbed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`${replyText}`)

        interaction.reply({embeds:[replyEmbed]});
    }
}