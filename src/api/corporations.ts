import { API_BASE_URL } from './config';

type CorporationValidationResponse = {
  valid: boolean;
  message?: string;
};

export const validateCorporationNumber = async (corporationNumber: string) => {
  const response = await fetch(
    `${API_BASE_URL}/corporation-number/${corporationNumber}`
  );

  if (!response.ok) {
    throw new Error('Unable to validate corporation number');
  }

  return (await response.json()) as CorporationValidationResponse;
};

