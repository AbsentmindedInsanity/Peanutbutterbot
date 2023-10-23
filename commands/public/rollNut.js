const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const Database = require("../../Schemas/nutTracker");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("nut")
    .setDescription("Rolls against a 4% chance of peanut butter"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { member } = interaction;
        let chance = Math.floor(Math.random() * 100 + 1);
        let replyText = "You woke up completely clean";
        let nut = 0;

        if(chance <= 40) {
            replyText = "OH NO! YOU WAKE UP COVERED IN PEANUT BUTTER";
            nut = 1;
        }

        let userData = await Database.findOne({User: member.id})
        if (!userData) {
            userData = await Database.create({User: member.id, UserTag: member.user.tag, NutCount: nut})
        } else {
            userData.NutCount += nut;
            await userData.save();
        }
        let count = userData.NutCount;
        const replyEmbed = new EmbedBuilder()
            .setColor("DarkBlue")
            .setDescription(`${replyText}
            \n\n**Total Peanutings: ${count}**`)

        interaction.reply({embeds:[replyEmbed]});
    }
}