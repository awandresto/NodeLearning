import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    public email: string;

    @IsString()
    @IsOptional()
    public password: string;

    @IsString()
    @IsNotEmpty()
    public name: string;
}
