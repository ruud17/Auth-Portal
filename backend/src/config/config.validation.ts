import { plainToClass } from 'class-transformer';
import {
  IsAlpha,
  IsDefined,
  IsNumberString,
  IsString,
  MinLength,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsNumberString()
  @MinLength(1)
  PORT: string;

  @IsNumberString()
  @MinLength(1)
  DB_PORT: string;

  @IsDefined()
  @IsString()
  DB_HOST: string;

  @IsDefined()
  @IsAlpha()
  @MinLength(1)
  DB_USER: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DB_PASSWORD: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DB_NAME: string;
}

export function validate(configuration: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, configuration, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  let index = 0;
  for (const err of errors) {
    Object.values(err.constraints).map((str) => {
      ++index;
      console.log(index, str);
    });
    console.log('\n ***** \n');
  }
  if (errors.length)
    throw new Error('Please provide the valid ENVs mentioned above');

  return validatedConfig;
}
