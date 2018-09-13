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

@WebSocketGateway(3002, { namespace:'/'})
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
	@WebSocketServer() server;

	socket = io('http://localhost:3002/');

	@SubscribeMessage('eventos')
	findAll(client, data): Observable<WsResponse<number>> {
		client.broadcast.emit('eventos',data) // los sockets que escuchan 'events'

		return from([ 4,5,6]).pipe(map((item) => ({ event: 'events', data: item })));
	}

	@SubscribeMessage('identity')
	async identity(client, data: number): Promise<number> {
		return data;
	}

	@SubscribeMessage('holauno')
	holaUno(client, data): Observable<WsResponse<number>> {
		console.log('Entro a holauno');
		client.broadcast.emit('holauno',data) // los sockets que escuchan 'events'
		return data;
		// la peticion
	}

	@SubscribeMessage('politica')
	noticias(client, data): Observable<WsResponse<number>> {
		console.log('Entro a holados');
		client.broadcast.emit('politica',data) // los sockets que escuchan 'events'
		return data;
		// la peticion
	}
}
