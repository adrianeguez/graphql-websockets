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



@WebSocketGateway(3002, { namespace: '/usuarios' })
export class UsuariosGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

	usuarios: UsuarioSocketInterface[] = [];

	afterInit(server: any) {
		console.log('Init Usuarios');
	}
	handleConnection(client: any, ...args: any[]) {
		console.log('Usuario: conexion de cliente', client.id, args);
	}
	handleDisconnect(client: any) {
		console.log('disconnect', client.id);
	}

	@SubscribeMessage('solicitarSaludoATodos')
	solicitarSaludoATodos(socketCliente, datos) {
		console.log('Entro a solicitar saludo a todos');
		socketCliente.broadcast.emit('saludoATodos', datos) // los sockets que escuchan 'events'
		return datos
	}

	@SubscribeMessage('solicitarLogin')
	solicitarLogin(socketCliente, datos) {
		const usuario = this.usuarios.find((u) => u.idSocket === socketCliente.id)
		if (usuario) {
			const indiceUsuario = this.usuarios.indexOf(usuario);
			this.usuarios[indiceUsuario].nombreUsuario = datos.nombre;
			socketCliente.broadcast.emit('usuarioCambioNombre', datos);
			return datos;
		} else {
			this.usuarios.push({
				idSocket: socketCliente.id,
				nombreUsuario: datos.nombre
			})
			socketCliente.broadcast.emit('usuarioInicioSesion', datos);
			return datos;
		}
	}





	/*












@WebSocketServer() server;

socket;





















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

@SubscribeMessage('holados')
holaDos(client, data): Observable<WsResponse<number>> {
	console.log('Entro a holados');
	client.broadcast.emit('holados',data) // los sockets que escuchan 'events'
	return data;
	// la peticion
}
	

@SubscribeMessage('noticias')
noticias(client, data): Observable<WsResponse<number>> {
	console.log('Entro a holados');
	client.broadcast.emit('noticias',data) // los sockets que escuchan 'events'
	return data;
	// la peticion
}


*/

















}


interface UsuarioSocketInterface {
	idSocket: string;
	nombreUsuario: string;
}