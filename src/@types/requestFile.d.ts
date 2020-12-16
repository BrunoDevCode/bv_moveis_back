import { Request } from 'express';

export default interface RequestFile extends Request {
  body: {
    itemID: string;
  }

  file: {
    originalname: string;
    name: string;
    key: string;
    location: string;
    size: number;
  }
};
