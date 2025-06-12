const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:pushtest@test.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

async function sendPushNotification(subscription, payload) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
  } catch (err) {
    console.error('Erreur d’envoi push :', err);
  }
}

module.exports = { sendPushNotification };
