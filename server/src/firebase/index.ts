import * as admin from "firebase-admin";

import * as serviceAccount from "./../configs/fbAccountServiceKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;
