// api/order.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const data = req.body;
  const { name, email, adresse, bäckerei, cart } = data;

  const webhookMap = {
    backstube1: 'https://discord.com/api/webhooks/1360985136547631304/4VfK9pZqlvDR1mnrq3Qp6jmIlQSav65sZuUAtviLK3AMKp65uatrQ20BnEQpOWs1wPmh',
    backstube2: 'https://discord.com/api/webhooks/1360985316256907425/xmkzwT1Wjcno5uucA6pCV6kXh1w0gZcwFAuB4zhbKCk2SNJ2hKG0MFEMwSA1UQxtynox',
    backstube3: 'https://discord.com/api/webhooks/1360985419629723750/yWk_Cbb2-VYo7u87rQSBoGKKeD-Mwj2dI906am_yDASCamV2dr3eS5nEahcM8ErocVGY',
    backstube4: 'https://discord.com/api/webhooks/1360985504555864084/jOxQyHPGFNxj3MlRsRAA4K0LSrMqUqnm4XeJ66Wowd-JIoL_IwZeAGxOh2XrWX_vSyv9',
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
