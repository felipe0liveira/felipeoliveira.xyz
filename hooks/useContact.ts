'use client';

import { useState } from 'react';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface UseContactReturn {
  sendContact: (data: ContactFormData) => Promise<void>;
  loading: boolean;
  error: Error | null;
  success: boolean;
  resetStatus: () => void;
}

export function useContact(): UseContactReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const sendContact = async (data: ContactFormData): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetStatus = () => {
    setError(null);
    setSuccess(false);
  };

  return { sendContact, loading, error, success, resetStatus };
}
