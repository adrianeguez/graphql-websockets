import { WebsocketRedisModule } from './websocket-redis/websocket-redis.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosGateway } from 'websocket-redis/usuarios/usuarios-gateway';

@Module({
  imports: [WebsocketRedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly _usuariosGateway:UsuariosGateway){
    this.iniciarBase();
  }

  iniciarBase(){
    console.log('Crear datos')
    setTimeout(()=>{
      // this._usuariosGateway.socket.emit('chat',{nombre:'Servidor',mensaje:'Quemalos vivos'})
    }, 5000);
  }
}
