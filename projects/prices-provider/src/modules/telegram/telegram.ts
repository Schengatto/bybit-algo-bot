import TelegramBot from 'node-telegram-bot-api';

export class AlgoTelegramBot {
    private static instance: TelegramBot;
    private static botToken: string = "";
    private static userToken: number = 0;

    private constructor() {
    }

    public static getInstance(): TelegramBot {
        if (!AlgoTelegramBot.instance) {
            AlgoTelegramBot.botToken = process.env.TELEGRAM_BOT_TOKEN;
            AlgoTelegramBot.userToken = Number(process.env.TELEGRAM_USER_TOKEN);
            AlgoTelegramBot.instance = new TelegramBot(AlgoTelegramBot.botToken);
        }
        return AlgoTelegramBot.instance;
    }

    public static sendMessages(messages: string[]): void {
        AlgoTelegramBot.getInstance()
        const DEFAULT_CHUNK_SIZE = 10;
        while (messages.length > 0) {
            const chunkSize = Math.min(DEFAULT_CHUNK_SIZE, messages.length);
            const chunk = messages.splice(0, chunkSize);
            const message = chunk.join("\n\n");
            if (message) {
                AlgoTelegramBot.getInstance().sendMessage(AlgoTelegramBot.userToken, message)
                    .catch((error) => {
                        console.log(error.code);
                        console.log(error.response.body);
                    });
            }
        }
    };
}