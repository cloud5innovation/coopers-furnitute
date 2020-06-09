const admin = require("firebase-admin");
const Users = require("./../models/users");
// const serviceAccount = process.env.FIREBASE_KEY

admin.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_APP_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    // credential: admin.credential.cert(serviceAccount),
}
 
);

const auth = (req, res, next) => {
  const idToken = req.headers.authorization;
     // verify:
     if (idToken) {
        // verify:
        admin
          .auth()
          .verifyIdToken(idToken)
          .then(decodedIdToken => {
            // verify ok
            req.user = decodedIdToken;
            return next();
          })
          .catch(error => {
            console.error("Error while verifying Firebase ID token:", error);
            res.status(403).send("Unauthorized");
          });
      } else {
        res.status(401).json({
          message: "Log in and provide token to view this content."
        });
};
};


// const grantAdminRole = (uid) => {
//   console.log("claims set for: ", uid)
//   return admin.auth().setCustomUserClaims(uid, {admin: true}).then(() => {
//     console.log("Granted Admin Role")
//     // The new custom claims will propagate to the user's ID token the
//     // next time a new one is issued.
//   })
//   .catch (err => {
//     console.log("Error from Grand Admin Role: ", err)
//   }) 
// }

// async function grantAdminRole (uid) {
//   try {
//     const user = await admin.auth().getUser(uid);
//     console.log("Granting access")
//     if (user.customClaims && user.customClaims.admin === true) {
//       //This user is already and admin
//       return;
//     } else {
//       console.log("Admin granted")
  
//       admin.auth().setCustomUserClaims(user.uid, {
//         admin: true
//       })
//     }
//   } catch (err) {
//     console.log("Error from grant admin: ", err)
//   }
  
  

// };

async function checkadmin (req, res, next) {
  try {
    const idToken = req.headers.authorization;
    console.log(idToken)
    if (idToken) {
       // verify:
       admin
         .auth()
         .verifyIdToken(idToken)
         .then(decodedIdToken => {
           // verify ok
           const uid = decodedIdToken.uid;
           console.log("backend uid", uid)

          Users.userById(uid).then(user => {
            if (user.admin === true) {
              console.log("backend user", user)
             return next();
            } else {
              res.status(403).json({message: "You must be an admin to access this route"})
            }
          })
         
         })
         .catch(error => {
           console.error("Error while verifying Firebase ID token:", error);
           res.status(403).send("Unauthorized");
         });
     } else {
       res.status(401).json({
         message: "Log in and provide token to view this content."
       });
};
  } catch(err) {
    res.status(500).json({message: "Error while checking users role: ", err})
  }
}
// exports.isAdmin = async (req, res, next) => {
//   try {
//     const idToken = req.headers.authorization;
//     if (idToken) {
//        // verify:
//        admin
//          .auth()
//          .verifyIdToken(idToken)
//          .then(decodedIdToken => {
//            // verify ok
//            const uid = decodedIdToken.uid;
//            const user = await Users.getUser(uid)
//            if (user.admin === true) {
//             return next();
//            } else {
//              res.status(403).json({message: "You must be an admin to access this route"})
//            }
//          })
//          .catch(error => {
//            console.error("Error while verifying Firebase ID token:", error);
//            res.status(403).send("Unauthorized");
//          });
//      } else {
//        res.status(401).json({
//          message: "Log in and provide token to view this content."
//        });
// };
//   } catch(err) {
//     res.status(500).json({message: "Error while checking users role: ", err})
//   }
// }


module.exports = {
  auth,
checkadmin
};