export type MeterType = {
  countryId: string;
  createdAt?: Date;
  description?: string;
  isArchived?: boolean;
  location: string;
  meterNumber: string;
  name: string;
  updatedAt?: Date;
  userId?: string;
  applianceId?: string[];
  categoryId?: string;
  meterId?: string;
  meterData?: Number;
  lastTopUp?: Number;
  townId: string;
};
