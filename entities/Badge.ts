export type BADGETYPE = {
  _id: string;
  type: string;
  title: string;
  imageURL: string;
  description: string;
  requirements: {
    meter: number | string;
    reading: number | string;
  };
  wasShown: boolean;
  isEarned?: boolean;
};
