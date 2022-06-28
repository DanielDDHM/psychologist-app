import mongoose from 'mongoose';

export namespace DBConfig {
  export const connection = async () => await mongoose.connect(
    String(process.env.DATABASE_URL));
}