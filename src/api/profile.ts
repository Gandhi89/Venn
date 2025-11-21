import { API_BASE_URL } from './config';

export type ProfileDetailsPayload = {
  firstName: string;
  lastName: string;
  corporationNumber: string;
  phone: string;
};

export const submitProfileDetails = async (payload: ProfileDetailsPayload) => {
  const response = await fetch(`${API_BASE_URL}/profile-details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.message ?? 'Unable to submit form. Please try again.';
    throw new Error(message);
  }
};

