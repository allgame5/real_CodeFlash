let users = []; // Benutzer-Datenbank (in diesem Beispiel nur im Speicher)

export default function handler(req, res) {
    if (req.method === "POST") {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }
        users.push({ username });
        return res.status(200).json({ success: true, username });
    } else if (req.method === "GET") {
        return res.status(200).json(users);
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
