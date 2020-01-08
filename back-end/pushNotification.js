const PushNotifications = require('node-pushnotifications');

const vapidDetails = {
  subject: 'mailto:rever22411@gmail.com',
  publicKey:
    'BAdlD5AG5vjAOgTHSLUiIdan6INo9rY_S_wRYtoaQCYlcOfCJiXL0Z2mCwMOB-5KYKNFIbWTEPiqTCm32Wlj7sk',
  privateKey: 'Hq2oAYj_G57jbCVcFLIJrKTbIuits8vpmz8hR05ZREc'
};

const settings = {
  gcm: {
    id: null,
    phonegap: false // phonegap compatibility mode, see below (defaults to false)
  },
  apn: {
    token: {
      key: './certs/key.p8', // optionally: fs.readFileSync('./certs/key.p8')
      keyId: 'ABCD',
      teamId: 'EFGH'
    },
    production: false // true for APN production environment, false for APN sandbox environment
  },
  adm: {
    client_id: null,
    client_secret: null
  },
  wns: {
    client_id: null,
    client_secret: null,
    notificationMethod: 'sendTileSquareBlock'
  },
  web: {
    vapidDetails,
    gcmAPIKey: 'gcmkey',
    TTL: 2419200,
    contentEncoding: 'aes128gcm',
    headers: {}
  },
  isAlwaysUseFCM: false // true all messages will be sent through node-gcm (which actually uses FCM)
};
const push = new PushNotifications(settings);
///////////////////////////////////////////////////////////////////////////////////
const registrationIds = [];
registrationIds.push('INSERT_YOUR_DEVICE_ID');
///////////////////////////////////////////////////////////////////////////////////
const data = {
  title: 'New push notification', // REQUIRED for Android
  topic: 'topic', // REQUIRED for iOS (apn and gcm)
  /* The topic of the notification. When using token-based authentication, specify the bundle ID of the app.
   * When using certificate-based authentication, the topic is usually your app's bundle ID.
   * More details can be found under https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/sending_notification_requests_to_apns
   */
  body: 'Powered by AppFeel',
  custom: {
    sender: 'AppFeel'
  },
  priority: 'high', // gcm, apn. Supported values are 'high' or 'normal' (gcm). Will be translated to 10 and 5 for apn. Defaults to 'high'
  collapseKey: '', // gcm for android, used as collapseId in apn
  contentAvailable: true, // gcm, apn. node-apn will translate true to 1 as required by apn.
  delayWhileIdle: true, // gcm for android
  restrictedPackageName: '', // gcm for android
  dryRun: false, // gcm for android
  icon: '', // gcm for android
  image: '', // gcm for android
  style: '', // gcm for android
  picture: '', // gcm for android
  tag: '', // gcm for android
  color: '', // gcm for android
  clickAction: '', // gcm for android. In ios, category will be used if not supplied
  locKey: '', // gcm, apn
  locArgs: '', // gcm, apn
  titleLocKey: '', // gcm, apn
  titleLocArgs: '', // gcm, apn
  retries: 1, // gcm, apn
  encoding: '', // apn
  badge: 2, // gcm for ios, apn
  sound: 'ping.aiff', // gcm, apn
  android_channel_id: '', // gcm - Android Channel ID
  alert: {
    // apn, will take precedence over title and body
    title: 'title',
    body: 'body'
    // details: https://github.com/node-apn/node-apn/blob/master/doc/notification.markdown#convenience-setters
  },
  /*
   * A string is also accepted as a payload for alert
   * Your notification won't appear on ios if alert is empty object
   * If alert is an empty string the regular 'title' and 'body' will show in Notification
   */
  // alert: '',
  launchImage: '', // apn and gcm for ios
  action: '', // apn and gcm for ios
  category: '', // apn and gcm for ios
  // mdm: '', // apn and gcm for ios. Use this to send Mobile Device Management commands.
  // https://developer.apple.com/library/content/documentation/Miscellaneous/Reference/MobileDeviceManagementProtocolRef/3-MDM_Protocol/MDM_Protocol.html
  urlArgs: '', // apn and gcm for ios
  truncateAtWordEnd: true, // apn and gcm for ios
  mutableContent: 0, // apn
  threadId: '', // apn
  pushType: undefined, // apn. valid values are 'alert' and 'background' (https://github.com/parse-community/node-apn/blob/master/doc/notification.markdown#notificationpushtype)
  expiry: Math.floor(Date.now() / 1000) + 28 * 86400, // unit is seconds. if both expiry and timeToLive are given, expiry will take precedence
  timeToLive: 28 * 86400,
  headers: [], // wns
  launch: '', // wns
  duration: '', // wns
  consolidationKey: 'my notification' // ADM
};

exports.push = async function(req, res) {
  console.log('push');
  push
    .send(registrationIds, data)
    .then(results => {
      console.log(results);
    })
    .catch(err => {
      console.log(err);
    });
};
