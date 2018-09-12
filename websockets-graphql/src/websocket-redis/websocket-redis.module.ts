import { UsuariosGateway } from './usuarios/usuarios-gateway';
import { Module } from '@nestjs/common';
import { UniversidadesGateway } from './universidades/universidades-gateway';

@Module({
	providers: [ UsuariosGateway, UniversidadesGateway ],
	exports:[UsuariosGateway]
})
export class WebsocketRedisModule {}
