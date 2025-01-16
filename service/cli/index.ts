import { AppService } from './App/app.service';
import { AppModule } from './App/app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false, // 关闭日志输出
  });

  try {
    await app.get(AppService).run();
  } catch (error: any) {
    // 输出错误信息
    console.log(error.message);
  }

  // 关闭应用
  await app.close();
}

(function (start: number) {
  bootstrap().finally(function () {
    console.log(`bootstrap time: ${Date.now() - start}ms`);
    process.exit(1);
  });
})(Date.now());
