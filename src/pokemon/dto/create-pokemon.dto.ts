import { IsInt, IsString, IsPositive, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {

    @IsInt()//debe ser entero
    @IsPositive()//debe ser positivo
    @Min(1)//minimo es 1
    no: number;

    @IsString()//debe ser string
    @MinLength(1)//debe tener una letra o mas
    name: string;

}
