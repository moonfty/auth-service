import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import * as _ from 'lodash';
import { AuthDto } from '../dtos/auth.dto';

const firebaseConfig = {
  apiKey: 'AIzaSyCny8sRf34cD-SS5eO-8CVoY0Z7DakLJAE',

  authDomain: 'baumeta-onthemoon.firebaseapp.com',

  projectId: 'baumeta-onthemoon',

  storageBucket: 'baumeta-onthemoon.appspot.com',

  messagingSenderId: '678967332897',

  appId: '1:678967332897:web:bdf17bd78b70c1a9a65360',

  measurementId: 'G-GFV6NLQEB9',
};

initializeApp(firebaseConfig);

@Injectable()
export class FirebaseService {
  constructor() {}
  public readonly db = getFirestore();

  async getUser(data: AuthDto) {
    const snapshot = await this.db.collection('users').doc(data.id).get();
    const user_data = snapshot.data();
    const user = { id: user_data, email: user_data.email };
    return user;
  }

  async checkAdminUser(id) {
    const snapshot = await this.db
      .collection('admin')
      .doc('drops_config')
      .get();
    const admins = snapshot.data();
    const admin = _.find(admins.admins_uid, function (uid) {
      return uid == id;
    });
    if (admin === undefined) {
      throw new ForbiddenException('No permission');
    }
    return admin;
  }

  async checkAuthentication(data: AuthDto) {
    await getAuth()
      .verifyIdToken(data.token)
      .then((decodedToken) => {
        const exp_date = decodedToken.exp;
        const curr_date = new Date().getTime();

        if (decodedToken.uid !== data.id || exp_date < curr_date) {
          throw new BadRequestException();
        }
      })
      .catch((error) => {
        throw new BadRequestException('Access Token Failed');
      });
  }
}
