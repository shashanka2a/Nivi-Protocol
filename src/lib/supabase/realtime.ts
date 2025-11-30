import { supabase } from './client';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface RealtimeCallbacks {
  onProfileUpdate?: (payload: any) => void;
  onVideoUpdate?: (payload: any) => void;
  onLicenseUpdate?: (payload: any) => void;
  onTransactionUpdate?: (payload: any) => void;
}

/**
 * Real-time service for Supabase subscriptions
 */
export const realtimeService = {
  /**
   * Subscribe to user profile updates
   */
  subscribeToUserProfile(userId: string, callback: (payload: any) => void): RealtimeChannel {
    return supabase
      .channel(`user:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },

  /**
   * Subscribe to video updates
   */
  subscribeToVideo(videoId: string, callback: (payload: any) => void): RealtimeChannel {
    return supabase
      .channel(`video:${videoId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'videos',
          filter: `id=eq.${videoId}`,
        },
        callback
      )
      .subscribe();
  },

  /**
   * Subscribe to license updates for a user
   */
  subscribeToUserLicenses(userId: string, callback: (payload: any) => void): RealtimeChannel {
    return supabase
      .channel(`licenses:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'licenses',
          filter: `subscriber_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },

  /**
   * Subscribe to transaction updates
   */
  subscribeToTransactions(userId: string, callback: (payload: any) => void): RealtimeChannel {
    return supabase
      .channel(`transactions:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },

  /**
   * Subscribe to user dashboard (multiple tables)
   */
  subscribeToUserDashboard(userId: string, callbacks: RealtimeCallbacks): RealtimeChannel[] {
    const channels: RealtimeChannel[] = [];

    if (callbacks.onProfileUpdate) {
      channels.push(this.subscribeToUserProfile(userId, callbacks.onProfileUpdate));
    }

    if (callbacks.onLicenseUpdate) {
      channels.push(this.subscribeToUserLicenses(userId, callbacks.onLicenseUpdate));
    }

    if (callbacks.onTransactionUpdate) {
      channels.push(this.subscribeToTransactions(userId, callbacks.onTransactionUpdate));
    }

    return channels;
  },

  /**
   * Unsubscribe from a channel
   */
  unsubscribe(channel: RealtimeChannel) {
    supabase.removeChannel(channel);
  },

  /**
   * Unsubscribe from multiple channels
   */
  unsubscribeAll(channels: RealtimeChannel[]) {
    channels.forEach(channel => supabase.removeChannel(channel));
  },
};

