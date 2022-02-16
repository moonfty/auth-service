import { Request } from 'express';
import * as JWT from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_IN } from '../../config';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { AuthDto } from '../dtos/auth.dto';

@Injectable()
export class JWTutil {
  secret = JWT_SECRET;
  expiresIn = +JWT_EXPIRES_IN;
  refreshIn = +JWT_REFRESH_IN;

  get(req: Request) {
    try {
      let access_token: string;
      const authorizationHeader = _.get(req, 'headers.authorization');
      if (authorizationHeader && _.includes(authorizationHeader, 'Bearer')) {
        access_token = _.get(req.headers, 'authorization').replace(
          'Bearer ',
          '',
        );
      }
      if (access_token) {
        return access_token;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async signAccessToken(data: AuthDto) {
    const payload = { id: data.id, email: data.email, createdAt: Date.now() };
    const access_token_options = { expiresIn: '2h' };
    const access_token = new Promise<string>((resolve, reject) => {
      JWT.sign(payload, this.secret, access_token_options, (error, token) => {
        if (!error) resolve(token);
        else reject(error);
      });
    });
    return await access_token;
  }

  async sign(data: AuthDto) {
    //Access Token generation
    const access_token = await this.signAccessToken(data);
    return access_token;
  }

  verify(token: string) {
    return new Promise((resolve, reject) => {
      JWT.verify(token, this.secret, (error, decoded) => {
        if (!error) {
          resolve(decoded);
        } else {
          throw new BadRequestException('Invalid JWT');
          //reject(error);
        }
      });
    });
  }
}
