import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { User } from "./user";
import { Thread } from "./thread";

@Entity({ name: "replies" })
export class Replie {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@Column({ nullable: true })
	image: string;

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	created_at: Date;

	@ManyToOne(() => User, (user) => user.replie, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "user_id" })
	selecteduser: User;

	@ManyToOne(() => Thread, (thread) => thread.Reply, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "thread_id" })
	ReplyToThread: Thread;
}