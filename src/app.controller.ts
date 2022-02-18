import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AuthDto, PublicAuthDto } from './auth/dtos/auth.dto';
import { FirebaseService } from './auth/services/firebase.service';
import { JWTutil } from './auth/utils/jwt.util';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly firebaseService: FirebaseService,
  ) {}
  public readonly jwtUtil = new JWTutil();

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth')
  async getAccessToken(
    @Body() data: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    let access_token: string;
    /*
    try {
      const filtered_account = await this.firebaseService.getUser(data);
      if (!filtered_account) {
        throw new NotFoundException();
      }
      if (filtered_account.email != data.email) {
        throw new BadRequestException();
      }
      access_token = await this.jwtUtil.sign(data);
    } catch (error) {
      throw error;
    }
    */

    if (access_token === null) {
      throw new NotFoundException('Wrong id');
    } else {
      try {
        await this.firebaseService.checkAuthentication(data);
        access_token = await this.jwtUtil.sign(data);
        response.header('withCredentials', 'include');
        response.header('Access-Control-Allow-Credentials', 'true');
        response.send({ access_token: access_token });
        //return access_token;
      } catch (error) {
        throw error;
      }
    }
  }

  @Post('public')
  async getPublicAccessToken(
    @Body() data: PublicAuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    let access_token: string;
    if (access_token === null) {
      throw new NotFoundException('Wrong id');
    } else {
      try {
        await this.firebaseService.checkDevice(data)
        access_token = await this.jwtUtil.signPublicAccessToken(data);
        response.header('withCredentials', 'include');
        response.header('Access-Control-Allow-Credentials', 'true');
        response.send({ access_token: access_token });
        //return access_token;
      } catch (error) {
        throw error;
      }
    }
  }

  /*
  @Post('check')
  async checkFirebaseAuth(@Body() data: AuthCheckDto) {
    try {
      await this.firebaseService.checkAuthentication(data);
    } catch (error) {
      throw error;
    }
  }
  */
}
