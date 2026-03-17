import path from 'path';
import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Database => {
  // نحدد العميل بناءً على البيئة، إذا كنا أونلاين نستخدم postgres
  const client = env('DATABASE_CLIENT', 'postgres');

  const connections = {
    postgres: {
      connection: {
        // Render يوفر رابط كامل في متغير DATABASE_URL
        connectionString: env('DATABASE_URL'),
        // تفعيل SSL ضروري جداً لـ Render
        ssl: {
          rejectUnauthorized: false,
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { 
        min: env.int('DATABASE_POOL_MIN', 2), 
        max: env.int('DATABASE_POOL_MAX', 10) 
      },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
    // حذفنا MySQL لتقليل التعقيد بما أنك تستخدم Postgres
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};

export default config;