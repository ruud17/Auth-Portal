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

  @IsDefined()
  @IsString()
  @MinLength(1)
  AWS_ACCESS_KEY_ID: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  AWS_SECRET_ACCESS_KEY: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  AWS_REGION: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  AWS_S3_BUCKET_NAME: string;
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
