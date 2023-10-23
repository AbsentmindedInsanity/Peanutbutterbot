const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const Database = require("../../Schemas/nutTracker");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Shows the three most covered in peanut butter"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { member } = interaction;
        let replyText = "test"

        let users = await Database.find();

        users.sort((a,b) => a.NutCount - b.NutCount )

        let top = users[users.length-1].UserTag.split("#")[0];
        let second, third;

        if ((users.length-2) > -1 ) {
            second = users[users.length-2].UserTag.split("#")[0];
        } else {
            second = "Unavailable";
        }

        if ((users.length-3) > -1) {
           third = users[users.length-3].UserTag.split("#")[0];
        } else {
            third = "Unavailable";
        }

        const replyEmbed = new EmbedBuilder()
            .setAuthor({name: "LEADERBOARD - Three most peanuty!"})
            .setColor("Gold")
            .setDescription(`**1:**  ${top} \n**2**  ${second} \n**3**  ${third}`)

        interaction.reply({embeds:[replyEmbed]});
    }
}