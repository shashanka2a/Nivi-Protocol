import { prisma } from './prisma';
import { cookies } from 'next/headers';

export interface SessionUser {
  id: string;
  email: string | null;
  walletAddress: string | null;
  name: string | null;
  avatar: string | null;
  type: 'CREATOR' | 'BRAND';
  verified: boolean;
}

/**
 * Get current user from session
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      return null;
    }

    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            walletAddress: true,
            name: true,
            avatar: true,
            type: true,
            verified: true,
          },
        },
      },
    });

    if (!session || session.expiresAt < new Date()) {
      return null;
    }

    return session.user as SessionUser;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Create a new session for a user
 */
export async function createSession(
  userId: string,
  walletAddress?: string
): Promise<string> {
  // Generate a secure session token
  const token = crypto.randomUUID();

  // Set expiration to 30 days
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await prisma.session.create({
    data: {
      userId,
      token,
      walletAddress,
      expiresAt,
    },
  });

  return token;
}

/**
 * Delete a session (logout)
 */
export async function deleteSession(token: string): Promise<void> {
  await prisma.session.delete({
    where: { token },
  });
}

/**
 * Find or create user by wallet address (Photon authentication)
 */
export async function findOrCreateUserByWallet(
  walletAddress: string,
  email?: string,
  name?: string
) {
  // Try to find existing user
  let user = await prisma.user.findUnique({
    where: { walletAddress },
  });

  // Create user if doesn't exist
  if (!user) {
    user = await prisma.user.create({
      data: {
        walletAddress,
        email: email || null,
        name: name || null,
        type: 'CREATOR', // Default to creator, can be changed later
      },
    });
  } else {
    // Update user info if provided
    if (email || name) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          ...(email && { email }),
          ...(name && { name }),
        },
      });
    }
  }

  return user;
}

/**
 * Verify user session token
 */
export async function verifySession(token: string): Promise<SessionUser | null> {
  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            walletAddress: true,
            name: true,
            avatar: true,
            type: true,
            verified: true,
          },
        },
      },
    });

    if (!session || session.expiresAt < new Date()) {
      return null;
    }

    return session.user as SessionUser;
  } catch (error) {
    console.error('Error verifying session:', error);
    return null;
  }
}

