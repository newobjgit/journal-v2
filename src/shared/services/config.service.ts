import * as dotenv from 'dotenv';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export class ConfigService {
    constructor() {
        const nodeEnv = this.nodeEnv;
        dotenv.config({
            path: `.${nodeEnv}.env`,
        });
    }

    get isDevelopment(): boolean {
        return this.nodeEnv === 'development';
    }

    get isProduction(): boolean {
        return this.nodeEnv === 'production';
    }

    public get(key: string): string {
        return process.env[key];
    }

    public getNumber(key: string): number {
        return Number(this.get(key));
    }

    get nodeEnv(): string {
        return this.get('NODE_ENV') || 'development';
    }

    get throttlerConfig(): ThrottlerModuleOptions {
        return {
            ttl: this.getNumber('API_RATE_LIMIT_TTL'),
            limit: this.getNumber('API_RATE_LIMIT_LIMIT'),
        }
    }

    get mongoMainConfig(): MongooseModuleOptions {
        return {
            uri: this.get('MONGO_MAIN'),
        }
    }
}
