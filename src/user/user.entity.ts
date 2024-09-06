import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ContactEntity } from 'src/contact/contact.entity';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: 'free' })
  subscription: string;

  // @Column({ nullable: true })
  // verificationToken: string;

  @Column({ default: false })
  verify: boolean;

  @OneToMany((type) => ContactEntity, (post) => post.user)
  contacts: ContactEntity[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
