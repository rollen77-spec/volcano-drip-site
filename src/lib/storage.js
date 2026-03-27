// Mock storage service using localStorage since Supabase integration is not yet complete.
// Once Supabase is connected, this can be swapped out for actual Supabase client calls.

export const saveNewsletterSignup = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const existingSignups = JSON.parse(localStorage.getItem('newsletter_signups') || '[]');
        const newSignup = {
          id: crypto.randomUUID(),
          ...data,
          created_at: new Date().toISOString()
        };
        
        localStorage.setItem('newsletter_signups', JSON.stringify([...existingSignups, newSignup]));
        resolve({ success: true, data: newSignup });
      } catch (error) {
        resolve({ success: false, error: 'Failed to save signup data.' });
      }
    }, 800); // Simulate network delay
  });
};