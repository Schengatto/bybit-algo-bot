"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgoTelegramBot = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
class AlgoTelegramBot {
    constructor() {
    }
    static getInstance() {
        if (!AlgoTelegramBot.instance) {
            AlgoTelegramBot.botToken = process.env.TELEGRAM_BOT_TOKEN;
            AlgoTelegramBot.userToken = Number(process.env.TELEGRAM_USER_TOKEN);
            AlgoTelegramBot.instance = new node_telegram_bot_api_1.default(AlgoTelegramBot.botToken);
        }
        return AlgoTelegramBot.instance;
    }
    static sendMessages(messages) {
        AlgoTelegramBot.getInstance();
        const DEFAULT_CHUNK_SIZE = 10;
        while (messages.length > 0) {
            const chunkSize = Math.min(DEFAULT_CHUNK_SIZE, messages.length);
            const chunk = messages.splice(0, chunkSize);
            const message = chunk.join("\n\n");
            if (message) {
                AlgoTelegramBot.getInstance().sendMessage(AlgoTelegramBot.userToken, message).catch(console.error);
            }
        }
    }
    ;
}
exports.AlgoTelegramBot = AlgoTelegramBot;
AlgoTelegramBot.botToken = "";
AlgoTelegramBot.userToken = 0;
