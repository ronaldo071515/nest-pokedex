import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  // private readonly axios: AxiosInstance = axios;
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) {

  }

  async executeSeed() {

    await this.pokemonModel.deleteMany({}); //delete * from pokemons

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    // const insertPromisesArray = [];
    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach(({name, url}) => {

      const segments = url.split('/');
      const no: number = +segments[ segments.length - 2 ];

      // const pokemon = await this.pokemonModel.create( { name, no } );
      // insertPromisesArray.push(
      //   this.pokemonModel.create( { name, no } )
      // )
      pokemonToInsert.push({ name, no });

    });

    // await Promise.all( insertPromisesArray );
    await this.pokemonModel.insertMany( pokemonToInsert );

    return 'Seed Executed';
  }

}
