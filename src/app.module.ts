import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './user/middleware/auth/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        process.env.MONGODB_URI ||
        'mongodb+srv://volodymyrkalinin1978:YGzYnMDLb1A4Tq3l@contacts.gkohigu.mongodb.net/db-test',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UserModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(cnsumer: MiddlewareConsumer) {
    cnsumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
