import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { Schema } from 'mongoose';
import { AddWalletToUserDto } from '../dtos/user.dto';
import { errorMessages } from '../errors/auth.errors';
import UserModel from '../models/user/user.model';
import { Service } from './base.service';

@Injectable()
export class UserService extends Service {
    constructor() {
        super(UserModel, '');;
    }

    async addWallet(data: AddWalletToUserDto): Promise<any> {
        const user = await UserModel.findOne({username: data.username})
        if (!user) {
            throw new NotFoundException(errorMessages.NOT_FOUND_ERROR);
        }

        user.wallet = data.wallet
        user.type = data.type
        const saved_user = await user.save()
        return saved_user
    }
}
