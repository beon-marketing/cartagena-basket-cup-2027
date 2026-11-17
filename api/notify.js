// Sends a push notification to ntfy.sh for each landing form lead.
// The topic lives in the NTFY_TOPIC env var (Vercel) so it is never exposed in the public repo or page.
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end('Method not allowed');
  }

  const topic = process.env.NTFY_TOPIC;
  if (!topic) {
    res.statusCode = 500;
    return res.end('NTFY_TOPIC not configured');
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const clean = (v) => String(v == null ? '' : v).replace(/[\r\n]+/g, ' ').trim().slice(0, 200);
  const nombre = `${clean(body.nombre)} ${clean(body.apellido)}`.trim();

  const lines = [
    `👤 ${nombre || '—'}`,
    `🏀 Club: ${clean(body.equipo) || '—'}`,
    `🎯 Cargo: ${clean(body.cargo) || '—'}`,
    `📞 ${clean(body.telefono) || '—'}`,
    `✉️ ${clean(body.email) || '—'}`,
    `📋 ${clean(body.categorias) || '—'}`,
  ];

  const tel = clean(body.telefono).replace(/[^\d+]/g, '');
  const headers = {
    Title: 'Nuevo lead web - Cartagena Basket Cup',
    Tags: 'basketball',
    Priority: 'high',
  };
  if (tel) headers.Actions = `view, Llamar, tel:${tel}`;

  try {
    const r = await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
      method: 'POST',
      headers,
      body: lines.join('\n'),
    });
    res.statusCode = r.ok ? 200 : 502;
    return res.end(r.ok ? 'ok' : 'ntfy error');
  } catch (e) {
    res.statusCode = 502;
    return res.end('ntfy unreachable');
  }
};
