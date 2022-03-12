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
import { BadRequestSwaggerSchema, ForbiddenSwaggerSchema, NotFoundSwaggerSchema } from '../exception-filters/http-exception.filter';
import { TransformInterceptor } from '../interceptors/transfrom.interceptor';
import { SolanaService } from '../services/solana.service';
  
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
  @ApiTags('wallet')
  @Controller('wallet')
  export class WalletController {
    constructor(
      private readonly solanaService: SolanaService,
    ) {}
  
    @Get('/solana/:wallet')
    async getSolana(@Param('wallet') wallet:string): Promise<any> {
      return this.solanaService.getNFTs(wallet);
    }
  
  }
  