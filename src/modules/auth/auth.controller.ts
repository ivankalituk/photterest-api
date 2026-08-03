import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';


@Module({
    imports: [
        JwtModule.register({
            secret: 'SUPER_SECRET_KEY',
            signOptions: {

                // пока не знаю насколько сделать
                expiresIn: '15m'
            }
        })
    ],

    providers:[
        AuthService
    ],

    exports:[
        AuthService
    ]
})
export class AuthModule {}