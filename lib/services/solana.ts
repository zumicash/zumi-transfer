import { Connection, PublicKey, Transaction, Keypair } from '@solana/web3.js';

/**
 * Solana Service for ZUMI-CASH
 * Handles all Solana blockchain interactions
 */

export class SolanaService {
  private connection: Connection;
  private network: string;

  constructor() {
    const rpcEndpoint = process.env.SOLANA_RPC_ENDPOINT || 'https://api.mainnet-beta.solana.com';
    this.network = process.env.SOLANA_NETWORK || 'mainnet-beta';
    this.connection = new Connection(rpcEndpoint, 'confirmed');
  }

  /**
   * Get connection instance
   */
  getConnection(): Connection {
    return this.connection;
  }

  /**
   * Validate Solana address
   */
  async validateAddress(address: string): Promise<boolean> {
    try {
      const publicKey = new PublicKey(address);
      return PublicKey.isOnCurve(publicKey.toBytes());
    } catch (error) {
      return false;
    }
  }

  /**
   * Get wallet balance
   */
  async getBalance(address: string): Promise<number> {
    try {
      const publicKey = new PublicKey(address);
      const balance = await this.connection.getBalance(publicKey);
      return balance / 1e9; // Convert lamports to SOL
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw new Error('Failed to fetch balance');
    }
  }

  /**
   * Get recent blockhash for transaction
   */
  async getRecentBlockhash(): Promise<string> {
    const { blockhash } = await this.connection.getLatestBlockhash();
    return blockhash;
  }

  /**
   * Send transaction to Solana network
   */
  async sendTransaction(
    transaction: Transaction,
    signers: Keypair[]
  ): Promise<string> {
    try {
      const signature = await this.connection.sendTransaction(
        transaction,
        signers,
        { skipPreflight: false, preflightCommitment: 'confirmed' }
      );
      
      // Wait for confirmation
      await this.connection.confirmTransaction(signature, 'confirmed');
      
      return signature;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw new Error('Transaction submission failed');
    }
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(signature: string): Promise<any> {
    try {
      const status = await this.connection.getSignatureStatus(signature);
      return status.value;
    } catch (error) {
      console.error('Error fetching transaction status:', error);
      throw new Error('Failed to fetch transaction status');
    }
  }

  /**
   * Create shielded address (placeholder - needs Light Protocol integration)
   */
  async createShieldedAddress(ownerAddress: string): Promise<string> {
    // TODO: Integrate with Light Protocol for actual shielded addresses
    // This is a placeholder implementation
    const keypair = Keypair.generate();
    return keypair.publicKey.toBase58();
  }

  /**
   * Get network info
   */
  getNetworkInfo() {
    return {
      network: this.network,
      endpoint: this.connection.rpcEndpoint
    };
  }
}

// Singleton instance
let solanaService: SolanaService | null = null;

export function getSolanaService(): SolanaService {
  if (!solanaService) {
    solanaService = new SolanaService();
  }
  return solanaService;
}
