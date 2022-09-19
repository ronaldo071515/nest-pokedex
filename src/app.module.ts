import { join } from 'path';//Node

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EvnConfiguration } from './config/env.config';
import { JoinValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EvnConfiguration ],
      validationSchema: JoinValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    PokemonModule,
    CommonModule,
    SeedModule
  ],
})
export class AppModule {

  /* constructor() {
    // console.log(process.env);
  } */

}
