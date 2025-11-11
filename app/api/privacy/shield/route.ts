import { NextRequest, NextResponse } from 'next/server';
import { getSolanaService } from '@/lib/services/solana';
import { getZUMIProofService } from '@/lib/services/ZUMIproof';
import { getRedisService } from '@/lib/services/redis';
import crypto from 'crypto';

/**
 * Shield API Route
 * POST /api/privacy/shield
 * Shield public tokens to private balance
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, amount, tokenMint } = body;

    // Validation
    if (!walletAddress || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: walletAddress, amount' },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    const solanaService = getSolanaService();
    const ZUMIProofService = getZUMIProofService();
    const redisService = getRedisService();

    // Validate wallet address
    const isValidAddress = await solanaService.validateAddress(walletAddress);
    if (!isValidAddress) {
      return NextResponse.json(
        { error: 'Invalid Solana address' },
        { status: 400 }
      );
    }

    // Generate shielded address
    const shieldedAddress = await solanaService.createShieldedAddress(walletAddress);

    // Generate ZUMI proof
    const proof = await ZUMIProofService.generateShieldProof(
      walletAddress,
      amount,
      shieldedAddress
    );

    // Create session
    const sessionId = `SHIELD_${crypto.randomBytes(8).toString('hex').toUpperCase()}`;
    
    await redisService.createSession({
      sessionId,
      walletAddress,
      type: 'shield',
      status: 'pending',
      amount,
      proofHash: proof.proofHash,
      expiresAt: Date.now() + 3600000 // 1 hour
    });

    // Store proof
    await redisService.storeProof(proof.proofHash, proof);

    // Increment shield counter
    await redisService.incrementCounter('total_shields');

    return NextResponse.json({
      success: true,
      sessionId,
      shieldedAddress,
      amount,
      proof: {
        hash: proof.proofHash,
        commitment: proof.commitment
      },
      status: 'pending',
      message: 'Shield transaction created. Waiting for confirmation.',
      expiresIn: 3600
    });

  } catch (error: any) {
    console.error('Shield API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Get shield transaction status
 * GET /api/privacy/shield?sessionId=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId parameter' },
        { status: 400 }
      );
    }

    const redisService = getRedisService();
    const session = await redisService.getSession(sessionId);

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      session: {
        sessionId: session.sessionId,
        status: session.status,
        amount: session.amount,
        proofHash: session.proofHash,
        txSignature: session.txSignature,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt
      }
    });

  } catch (error: any) {
    console.error('Shield status API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
