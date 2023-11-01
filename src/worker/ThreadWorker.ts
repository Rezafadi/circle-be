// import * as amqp from "amqplib";
import { Repository } from "typeorm";
import { Thread } from "../entities/thread";
import { AppDataSource } from "../data-source";
import { EventEmitter } from "stream";
import cloudinary from "../libs/cloudinary";

export default new (class ThreadWorker {
	private readonly ThreadRepository: Repository<Thread> =
		AppDataSource.getRepository(Thread);
	private emitter = new EventEmitter();

	async create(queueName: string, connection: any) {
		try {
			const channel = await connection.createChannel();
			await channel.assertQueue(queueName);
			await channel.consume(queueName, async (message: any) => {
				try {
					if (message !== null) {
						const payload = JSON.parse(message.content.toString());
						// console.log(message);

						const cloudinaryResponse = payload.image
							? await cloudinary.destination(payload.image)
							: null;

						const thread = this.ThreadRepository.create({
							content: payload.content,
							image: cloudinaryResponse,
							users: {
								id: payload.users,
							},
						});

						const threadResponse = await this.ThreadRepository.save(thread);

						this.emitter.emit("message");
						console.log("(Worker) : Thread is create");

						channel.ack(message);
					}
				} catch (err) {
					console.log("(Worker) : Thread is failed");
				}
			});
		} catch (err) {
			console.log("(Worker) : Error while consume queue from thread");
		}
	}
})();
