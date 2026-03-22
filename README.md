# Node.js Webhook Receiver Example

     npm init -y
     npm install express

     node server.js

     curl -X POST http://localhost:3000/webhook \
   
    -H "Content-Type: application/json" \
    -H "X-Event-Id: evnt_001" \
    -H "X-Webhook-Signature: 471b0587d46684814138e6584c3116ba58d9290074251e60058e5192138a0f6a" \
    -d '{"test":1}'


    // Public URL

    npm install -g ngrok

    ngrok http 3000

    // Copy the resulting https://... URL into the third-party service's webhook settings
