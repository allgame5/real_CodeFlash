let messages = [];

export default function handler(req, res) {
    if (req.method === "POST") {
        const { message } = req.body;
        if (message) {
            messages.push(message);
            if (messages.length > 50) messages.shift(); // Begrenze die Anzahl der Nachrichten
        }
        return res.status(200).json({ success: true });
    } else if (req.method === "GET") {
        return res.status(200).json(messages);
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
