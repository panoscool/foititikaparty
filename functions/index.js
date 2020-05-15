const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const newActivity = (type, event, id) => {
  return {
    type: type,
    date: event.date,
    hostedBy: event.hostedBy,
    title: event.title,
    photoURL: event.hostPhotoURL,
    hostUid: event.hostUid,
    eventId: id,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  }
};

exports.createActivity = functions.firestore.document('events/{eventId}').onCreate((event) => {
  let newEvent = event.data();

  const activity = newActivity('newEvent', newEvent, event.id)

  return admin.firestore().collection('activity').add(activity).then(doc => {
    return console.log('Activity created with ID:', doc.id);
  }).catch((error) => {
    return console.log('Error adding activity', error)
  })
});

exports.cancelActivity = functions.firestore.document('/events/{eventId}').onUpdate((event, context) => {
  let updatedEvent = event.after.data();
  let previousEventData = event.before.data();

  if (!updatedEvent.cancelled || updatedEvent.cancelled === previousEventData.cancelled) return false;

  const activity = newActivity('cancelledEvent', updatedEvent, context.params.eventId);

  return admin.firestore().collection('activity').add(activity).then(doc => {
    return console.log('Activity created with ID:', doc.id);
  }).catch((error) => {
    return console.log('Error adding activity', error)
  })
});
