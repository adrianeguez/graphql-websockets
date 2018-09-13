import {
	WebSocketGateway,
	WebSocketServer,
	SubscribeMessage,
	WsResponse,
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const io = require('socket.io-client');

@WebSocketGateway(3002, { namespace: '/universidades' })
export class UniversidadesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	afterInit(server: any) {
		console.log('Init Universidades');

	}
	handleConnection(client: any, ...args: any[]) {
		console.log('Universwidad: conexion de cliente', client.id, args);
	}
	handleDisconnect(client: any) {
		console.log('disconnect', client.id);
	}

	@SubscribeMessage('solicitarCupoUniversidad')
	solicitarCupoUniversidad(socketCliente, datos) {

		const respuesta = `El usuario ${socketCliente.id} solicito unirse a ${datos.cupo}`
		socketCliente.broadcast.emit('cupoUniversidad', respuesta) // los sockets que escuchan 'events'
		return respuesta;
	}


	/*
	@WebSocketServer() server;

	socket = io('http://localhost:3002/universidades');

	@SubscribeMessage('solicitarUnirseASala')
	findAll(client, data): Observable<WsResponse<number>> {
		// client.broadcast.emit('eventos',data) // los sockets que escuchan 'events'

		return from([ 4,5,6]).pipe(map((item) => ({ event: 'events', data: item })));
	}

	@SubscribeMessage('solicitarPostearComentario')
	findAll(client, data): Observable<WsResponse<number>> {
		// client.broadcast.emit('eventos',data) // los sockets que escuchan 'events'

		return from([ 4,5,6]).pipe(map((item) => ({ event: 'events', data: item })));
	}
		*/

}
