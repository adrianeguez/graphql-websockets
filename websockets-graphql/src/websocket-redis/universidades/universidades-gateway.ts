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

@WebSocketGateway(3002)
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

	@SubscribeMessage('eventos')
	findAll(client, data): Observable<WsResponse<number>> {
		client.broadcast.emit('eventos',data) // los sockets que escuchan 'events'

		return from([ 4,5,6]).pipe(map((item) => ({ event: 'events', data: item })));
	}

	@SubscribeMessage('identity')
	async identity(client, data: number): Promise<number> {
		return data;
	}
}
