import { User } from '@models/spotify';

declare module 'iron-session' {
  interface IronSessionData {
    spotify?: {
      state?: string;
      last_update?: string;
      expires_in?: number;
      access_token?: string;
      refresh_token?: string;
      profile?: User;
    };
  }
}
