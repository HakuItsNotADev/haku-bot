import { 
    ApplicationCommandOptionType, 
    CommandInteraction, 
    EmbedBuilder 
} from 'discord.js';

const errorEmbed = (msg: string) => {
    return new EmbedBuilder()
        .setTitle(`:x: | ${msg}.`)
        .setColor('Red')
        .setTimestamp();
}

module.exports = {
    name: 'kick',
    description: 'Kick a member.',
    options: [
        {
            name: 'user',
            description: 'The user to be kicked',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for the user being kicked',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    run: async (interaction: CommandInteraction) => {
        const mentionedUser = interaction.options.get('user')?.user!;
        const member = await interaction.guild?.members.fetch(mentionedUser.id!);
        const author = await interaction.guild?.members.fetch(interaction.user.id);

        if (!interaction.options.get('user') || !member) {
            return interaction.reply(':x: | Membro inválido.')
        }

        if (!author?.permissions.has('KickMembers')) {
            return interaction.reply(
                { 
                    embeds: [ 
                        errorEmbed("You don't have permission to execute this command")
                    ]
                }
            );
        }

        if (!member.kickable) {
            return interaction.reply(
                {
                    embeds: [
                        errorEmbed("It was not possible to expel the mentioned member")
                    ]
                }
            );
        }

        await member.kick()
            .then(() => {
                const date = new Date();
                const localeDateString = date.toLocaleDateString();
                const localeTimeString = date.toLocaleTimeString();
                const reason = () => {
                    const input = interaction.options.get('reason');

                    if (!input) {
                        return `N/A`
                    }

                    return input.value;
                } 

                return interaction.reply(
                    {
                        embeds: [
                            new EmbedBuilder()
                                .setColor('Green')
                                .setDescription(`:palm_down_hand: | Member ${member} kicked.`)
                                .addFields([
                                    {
                                        name: '📅 | Date',
                                        value: `${localeDateString} / ${localeTimeString}`,
                                        inline: true
                                    },
                                    {
                                        name: '⚖️ | Reason',
                                        value: `${reason()}`,
                                        inline: true
                                    }
                                ])
                        ]
                    }
                )
            })
    }
}
