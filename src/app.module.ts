import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './auth/controllers/user.controller';
import { WalletController } from './auth/controllers/wallet.controller';
import { FirebaseService } from './auth/services/firebase.service';
import { SolanaService } from './auth/services/solana.service';
import { UserService } from './auth/services/user.service';

@Module({
  imports: [],
  controllers: [AppController, WalletController, UserController],
  providers: [AppService, FirebaseService, SolanaService, UserService],
})
export class AppModule {}
