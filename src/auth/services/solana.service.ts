import { Injectable, NotFoundException } from '@nestjs/common';
import { IWeb3Service } from './web3.service';
import * as solanaWeb3 from '@solana/web3.js';
import {
    resolveToWalletAddress,
    getParsedNftAccountsByOwner,
  } from "@nfteyez/sol-rayz";
import axios from 'axios';

@Injectable()
export class SolanaService implements IWeb3Service {
    connection : solanaWeb3.Connection

    constructor() {
        this.connection = new solanaWeb3.Connection(
            solanaWeb3.clusterApiUrl('mainnet-beta'),
            'confirmed',
        );
    }

    async getNFTs(wallet: string) {
        //const key = new solanaWeb3.PublicKey(wallet)
        const nfts = await getParsedNftAccountsByOwner({
            publicAddress: wallet,
            connection: this.connection
          });
          
        for(var nft in nfts) {
            const result = await axios.get(nft['data']['uri'])
            const image = result['data']['image']
        }
    }

}
