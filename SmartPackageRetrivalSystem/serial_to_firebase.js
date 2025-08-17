const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const admin = require('firebase-admin');

// Initialize Firebase
const serviceAccount = require('./firebase-service-account-key.json'); // Replace with your Firebase service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Set up Serial Port
const port = new SerialPort({ path: 'COM8', baudRate: 9600 }); // Replace 'COM8' with your Arduino's port
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Read data from Serial port
parser.on('data', (data) => {
    if (data.startsWith('TAG:')) {
        const tag = data.split(':')[1].trim();
        console.log("Student Scanned Tag:", ${tag}); // Debug statement

        // Send data to Firebase with a Firestore Timestamp
        db.collection('tags').add({
            tag: tag,
            timestamp: admin.firestore.FieldValue.serverTimestamp() //  Firestore Timestamp
        })
        .then(() => console.log(${tag} saved to Database))
        .catch((error) => console.error('Error saving to Firebase:', error));
    }
});