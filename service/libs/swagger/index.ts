import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

/* 标题 */
const title = 'Nest Blog Api';

/* 说明 */
const description = 'not description';

/* 令牌名 */
export const TOKEN_NAME = 'Authorization';

/* 权限验证配置 */
export const AUTH_OPTIONS: SecuritySchemeObject = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'Bearer',
};

/* Swagger */
export function useSwagger(app: INestApplication, version: string) {
  const api = `swagger-ui/v${version}`;

  const options = new DocumentBuilder();

  options.setTitle(title);

  options.setDescription(description);

  options.setVersion(version);

  options.addBearerAuth(AUTH_OPTIONS, TOKEN_NAME);

  const document = SwaggerModule.createDocument(app, options.build());

  SwaggerModule.setup(api, app, document);

  return api;
}
