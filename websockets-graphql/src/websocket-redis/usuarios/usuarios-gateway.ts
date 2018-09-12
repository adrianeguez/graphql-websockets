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



@WebSocketGateway(3002)
export class UsuariosGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


	afterInit(server: any) {
		console.log('Init Usuarios');
	}
	handleConnection(client: any, ...args: any[]) {
		console.log('Usuario: conexion de cliente', client.id, args);
	}
	handleDisconnect(client: any) {
		console.log('disconnect', client.id);
	}














	@WebSocketServer() server;

	socket = io('http://localhost:3002');





















	@SubscribeMessage('events')
	findAll(client, data): Observable<WsResponse<number>> {
		client.broadcast.emit('events',data) // los sockets que escuchan 'events'
		console.log(client.client);

		return from([ 1, 2, 3 ]).pipe(map((item) => ({ event: 'events', data: item }))); // socket q te hizo
		// la peticion
	}

	@SubscribeMessage('identity')
	async identity(client, data: number): Promise<number> {
		return data;
	}

	@SubscribeMessage('chat')
	chat(client, data): Observable<WsResponse<number>> {
		client.broadcast.emit('chat',data) // los sockets que escuchan 'events'
		return data;
		// la peticion
	}
	




















}
