import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { chain } from 'lodash';

export interface IWeb3Service {
    getNFTs(wallet:string )
}

export class Web3Service implements IWeb3Service {
    async getNFTs(wallet: string): Promise<any> {
    }
}
