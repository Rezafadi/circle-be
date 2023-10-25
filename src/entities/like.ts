import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { User } from "./user";
import { Thread } from "./thread";

@Entity({ name: "likes" })
export class Like {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	created_at: Date;

	@ManyToOne(() => User, (user) => user.likeToUser, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "user_id" })
	likeToUser: User;

	@ManyToOne(() => Thread, (thread) => thread.likeToThread, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "thread_id" })
	likeToThread: Thread;
}