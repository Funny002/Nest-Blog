import { Logger } from '@nestjs/common';

const logger = new Logger('CLI');

async function bootstrap() {}

bootstrap().then(() => {
  logger.log('Hello World!');
});
