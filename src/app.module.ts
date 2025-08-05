import {Module, NestModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {LoggerMiddleware} from './common/middlewares/logger.middleware';
import {ApiKeyMiddleware} from './common/middlewares/api-key.middleware';
import {CommonModule} from "./common/common.module";
import {FeatureModule} from "./modules/feature.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        FeatureModule,
        CommonModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware, ApiKeyMiddleware)
            .forRoutes('*');
    }
}
