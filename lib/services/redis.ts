import { Redis } from '@upstash/redis';

/**
 * Redis Service for ZUMI-CASH
 * Manages state, sessions, and caching
 */

export interface PrivacySession {
  sessionId: string;
  walletAddress: string;
  type: 'shield' | 'unshield' | 'transfer' | 'mixer' | 'bridge';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  amount: number;
  proofHash?: string;
  txSignature?: string;
  createdAt: number;
  updatedAt: number;
  expiresAt: number;
}

export class RedisService {
  private redis: Redis;
  private readonly SESSION_TTL = 3600; // 1 hour
  private readonly CACHE_TTL = 300; // 5 minutes

  constructor() {
    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_URL || '',
      token: process.env.UPSTASH_REDIS_TOKEN || ''
    });
  }

  /**
   * Create new privacy session
   */
  async createSession(session: Omit<PrivacySession, 'createdAt' | 'updatedAt'>): Promise<void> {
    const fullSession: PrivacySession = {
      ...session,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    await this.redis.setex(
      `session:${session.sessionId}`,
      this.SESSION_TTL,
      JSON.stringify(fullSession)
    );
  }

  /**
   * Get session by ID
   */
  async getSession(sessionId: string): Promise<PrivacySession | null> {
    const data = await this.redis.get(`session:${sessionId}`);
    if (!data) return null;
    return typeof data === 'string' ? JSON.parse(data) : data;
  }

  /**
   * Update session status
   */
  async updateSession(
    sessionId: string,
    updates: Partial<PrivacySession>
  ): Promise<void> {
    const session = await this.getSession(sessionId);
    if (!session) throw new Error('Session not found');

    const updated: PrivacySession = {
      ...session,
      ...updates,
      updatedAt: Date.now()
    };

    await this.redis.setex(
      `session:${sessionId}`,
      this.SESSION_TTL,
      JSON.stringify(updated)
    );
  }

  /**
   * Get all sessions for wallet
   */
  async getWalletSessions(walletAddress: string): Promise<PrivacySession[]> {
    const keys = await this.redis.keys('session:*');
    const sessions: PrivacySession[] = [];

    for (const key of keys) {
      const session = await this.redis.get(key);
      if (session) {
        const parsed = typeof session === 'string' ? JSON.parse(session) : session;
        if (parsed.walletAddress === walletAddress) {
          sessions.push(parsed);
        }
      }
    }

    return sessions.sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Cache balance data
   */
  async cacheBalance(
    address: string,
    publicBalance: number,
    shieldedBalance: number
  ): Promise<void> {
    await this.redis.setex(
      `balance:${address}`,
      this.CACHE_TTL,
      JSON.stringify({ publicBalance, shieldedBalance, timestamp: Date.now() })
    );
  }

  /**
   * Get cached balance
   */
  async getCachedBalance(address: string): Promise<any | null> {
    const data = await this.redis.get(`balance:${address}`);
    if (!data) return null;
    return typeof data === 'string' ? JSON.parse(data) : data;
  }

  /**
   * Store proof temporarily
   */
  async storeProof(proofHash: string, proofData: any): Promise<void> {
    await this.redis.setex(
      `proof:${proofHash}`,
      this.SESSION_TTL,
      JSON.stringify(proofData)
    );
  }

  /**
   * Get stored proof
   */
  async getProof(proofHash: string): Promise<any | null> {
    const data = await this.redis.get(`proof:${proofHash}`);
    if (!data) return null;
    return typeof data === 'string' ? JSON.parse(data) : data;
  }

  /**
   * Increment counter (for analytics)
   */
  async incrementCounter(key: string): Promise<number> {
    return await this.redis.incr(`counter:${key}`);
  }

  /**
   * Get counter value
   */
  async getCounter(key: string): Promise<number> {
    const value = await this.redis.get(`counter:${key}`);
    return value ? Number(value) : 0;
  }

  /**
   * Store webhook data
   */
  async storeWebhookData(sessionId: string, data: any): Promise<void> {
    await this.redis.setex(
      `webhook:${sessionId}`,
      this.SESSION_TTL,
      JSON.stringify(data)
    );
  }

  /**
   * Clean up expired sessions (maintenance)
   */
  async cleanupExpiredSessions(): Promise<number> {
    const keys = await this.redis.keys('session:*');
    let cleaned = 0;

    for (const key of keys) {
      const session = await this.redis.get(key);
      if (session) {
        const parsed = typeof session === 'string' ? JSON.parse(session) : session;
        if (parsed.expiresAt < Date.now()) {
          await this.redis.del(key);
          cleaned++;
        }
      }
    }

    return cleaned;
  }
}

// Singleton instance
let redisService: RedisService | null = null;

export function getRedisService(): RedisService {
  if (!redisService) {
    redisService = new RedisService();
  }
  return redisService;
}
