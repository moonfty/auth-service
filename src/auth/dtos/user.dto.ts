import { WalletTypes } from "../models/user/user.model"

export class CreateUserDto {
    username: string;
    n_token: string;
    wallet?: string;
    type?: WalletTypes;
}

export class AddWalletToUserDto{
    username: string
    wallet: string
    type: WalletTypes
}