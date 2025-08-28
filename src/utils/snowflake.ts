import { snowflake } from '@/lib/snowflake';


/**
 * Snowflake IDを生成する。
 *
 * @returns Snowflake ID
 */
export function getSnowflake(): bigint {
  return snowflake.getUniqueID() as bigint;
}
