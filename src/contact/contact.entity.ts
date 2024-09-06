import { ObjectId, ObjectIdColumn, Column, Entity } from 'typeorm';

@Entity('contacts')
export class ContactEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column(type => ObjectId)
  contacts: ObjectId[];
}
