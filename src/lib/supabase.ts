export const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  user_metadata: {
    full_name: 'Test User',
  },
};

export const mockSession = {
  access_token: 'fake-access-token',
  user: mockUser,
};

export const supabase = {
  auth: {
    getSession: () => 
      Promise.resolve({ 
        data: { session: mockSession }, 
        error: null 
      }),

    onAuthStateChange: (callback: any) => {
      // Simulate immediate login state
      callback('SIGNED_IN', { session: mockSession });
      return { 
        data: { subscription: { unsubscribe: () => {} } } 
      };
    },

    signUp: (email: string, password: string, options: any) => 
      Promise.resolve({ 
        data: { user: mockUser }, 
        error: null 
      }),

    signInWithPassword: ({ email, password }: any) =>
      Promise.resolve({ 
        data: { user: mockUser }, 
        error: null 
      }),

    signOut: () => 
      Promise.resolve({ error: null }),
  },
};
