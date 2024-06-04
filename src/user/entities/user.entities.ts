import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  //delete id when using mongodb
  id: number;

  @Prop()
  name: string;

  @Prop({ index: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ name: 1, type: -1 });
