const express = require('express');
const crypto = require('crypto');
const app = express();

const WEBHOOK_SECRET = 'my_super_secret_key';
const processedIds = new Set(); // ID storage for idempotency (in production — Redis/DB)

app.use(express.json({
  verify: (req, res, buf) => { req.rawBody = buf; }
}));

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const eventId = req.headers['x-event-id'];

  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = hmac.update(req.rawBody).digest('hex');

  if (!signature || signature !== digest) {
    return res.status(401).send('Invalid signature');
  }

  if (processedIds.has(eventId)) {
    return res.status(200).send('Event already processed');
  }

  res.status(200).send('Received');

  setImmediate(() => {
    console.log('Starting event processing:', eventId, req.body);
    processedIds.add(eventId);
    console.log('Event processed successfully');
  });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
