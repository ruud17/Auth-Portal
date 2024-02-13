import {
    ArrayMinSize,
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

const passwordRegEx = /^(?=.*\d)[A-Za-z\d@$!%*?&]{6,50}$/;

export class RegisterClientDto {
    @IsString()
    @MinLength(2, { message: 'Name must have at least 2 characters.' })
    @MaxLength(25, { message: 'Name must have maximum 25 characters.' })
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @MinLength(2, { message: 'Name must have at least 2 characters.' })
    @MaxLength(25, { message: 'Name must have maximum 25 characters.' })
    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail(null, { message: 'Please provide valid email.' })
    email: string;

    @IsNotEmpty()
    @Matches(passwordRegEx, {
        message: 'Password must contain Minimum 6 and maximum 50 characters one number'
    })
    password: string;

    @IsString()
    @IsOptional()
    role: string;

    @IsBoolean()
    @IsOptional()
    active: boolean = true;

    @IsOptional()
    avatar: string;

    @IsNotEmpty({ each: true })
    @ArrayMinSize(4, { message: 'At least 4 photos should be selected.' })
    photos: string[];
}
