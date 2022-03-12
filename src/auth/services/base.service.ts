import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { errorMessages } from '../errors/auth.errors';

export interface IService {
    getById(id): Promise<any>
    create(data);
    delete(id: string, user: string);
}

export class Service implements IService {
    constructor(public model: Model<any>, public parent?: string) {}

    async getById(id: string): Promise<any> {
        const found_data = await this.model.findById(id);
        return found_data;
    }

    async create(data: any): Promise<any> {
        const created = new this.model(data);
        const saved = await created.save();
        return saved;
    }

    async delete(id: string, user: string): Promise<any> {
        const data = await this.model.findById(id);
        if (!data) {
            throw new NotFoundException(errorMessages.NOT_FOUND_ERROR);
        }
        if (data.user !== user) {
            throw new ForbiddenException(errorMessages.PERMISSION_ERROR);
        }

        const deleted = await data.delete();
        return deleted;
    }
}
