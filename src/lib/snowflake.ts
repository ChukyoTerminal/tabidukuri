import { Snowflake } from 'nodejs-snowflake';

const globalForPrisma = globalThis as unknown as { snowflake: Snowflake };

export const snowflake =
  globalForPrisma.snowflake ||
  new Snowflake({ custom_epoch: 1_745_483_195_221, instance_id: 0 }); // epochはサークルのDiscordサーバーが作成された時間

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.snowflake = snowflake;
}
