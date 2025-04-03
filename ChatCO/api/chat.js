let chats = {};  // Speichert alle Chats und Nachrichten

export default function handler(req, res) {
    if (req.method === "POST") {
        const { chatId, message, user } = req.body;
        if (!chatId || !message || !user) {
            return res.status(400).json({ error: "Invalid request" });
        }
        if (!chats[chatId]) chats[chatId] = [];
        chats[chatId].push({ user, message, timestamp: new Date().toISOString() });
        return res.status(200).json({ success: true, messages: chats[chatId] });
    } else if (req.method === "GET") {
        const { chatId } = req.query;
        if (!chatId || !chats[chatId]) {
            return res.status(404).json({ error: "Chat not found" });
        }
        return res.status(200).json(chats[chatId]);
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
