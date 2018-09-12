import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { UsuariosGateway } from 'websocket-redis/usuarios/usuarios-gateway';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly _usuariosGateway:UsuariosGateway) {}

  @Get('yeah')
  root(): string {
    this._usuariosGateway.socket.emit('events',{data:1})
    // this._usuariosGateway.findAll()
    return this.appService.root();
  }
}
