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
    UseInterceptors,
  } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
  import { Request, Response } from 'express';
import { AddWalletToUserDto, CreateUserDto } from '../dtos/user.dto';
import { BadRequestSwaggerSchema, ForbiddenSwaggerSchema, NotFoundSwaggerSchema } from '../exception-filters/http-exception.filter';
import { TransformInterceptor } from '../interceptors/transfrom.interceptor';
import { UserService } from '../services/user.service';
  
  @ApiResponse({ status: 404, schema: NotFoundSwaggerSchema })
  @ApiResponse({
      status: 400,
      schema: BadRequestSwaggerSchema,
  })
  @ApiResponse({
      status: 403,
      schema: ForbiddenSwaggerSchema,
  })
  @UseInterceptors(TransformInterceptor)
  @ApiTags('user')
  @Controller('user')
  export class UserController {
    constructor(
      private readonly userService: UserService,
    ) {}
    
      
    @Post()
    async saveUser(@Body() data:CreateUserDto): Promise<any> {
      return await this.userService.create(data)
    }

    @Post('/wallet')
    async addWalletToUser(@Body() data:AddWalletToUserDto): Promise<any> {
        return await this.userService.addWallet(data)
    }

  }
  