import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger, ValidationPipe } from "@nestjs/common";
import { AllExceptionFilter } from "./core/exceptions/all-exception.filte";
import { TransformInterceptor } from "./core/filters/transform.interceptor";

export async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('suemor博客接口文档')
    .setDescription('欢迎来到suemor博客接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3371);
  logger.debug('Server listen on:: http://localhost:3371/api')
  logger.debug('swaager文档: http://localhost:3371/api-docs')
}
