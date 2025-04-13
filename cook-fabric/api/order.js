// api/order.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const data = req.body;
  const { name, email, adresse, bäckerei, cart } = data;

  const webhookMap = {
    backstube1: 'WEBHOOK_URL_1',
    backstube2: 'WEBHOOK_URL_2',
    backstube3: 'WEBHOOK_URL_3',
    backstube4: 'WEBHOOK_URL_4',
  };

  const webhookUrl = webhookMap[bäckerei];
  if (!webhookUrl) {
    return res.status(400).json({ message: 'Ungültige Bäckerei-Auswahl' });
  }

  const produktListe = cart
    .map(p => `• ${p.name} x${p.qty} (${(p.qty * p.price).toFixed(2)} €)`)
    .join('\n');

  const payload = {
    content: `📦 Neue Bestellung bei *${bäckerei}*\n\n👤 **Name:** ${name}\n📧 **E-Mail:** ${email}\n🏠 **Adresse:** ${adresse}\n\n🛒 **Produkte:**\n${produktListe}`,
  };

  try {
    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!discordRes.ok) throw new Error('Discord-Webhook fehlgeschlagen');

    res.status(200).json({ message: 'Bestellung erfolgreich gesendet!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fehler beim Senden an Discord.' });
  }
}
