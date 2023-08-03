import { Context, Next } from '@nocobase/actions';
import { Model } from '@nocobase/database';
import { Registry } from '@nocobase/utils';
import { Auth, AuthExtend } from './auth';
import { JwtOptions, JwtService } from './base/jwt-service';
import { ITokenBlacklistService } from './base/token-blacklist-service';

type Storer = {
  get: (name: string) => Promise<Model>;
};

type AuthManagerOptions = {
  authKey: string;
  default?: string;
  jwt?: JwtOptions;
};

type AuthConfig = {
  auth: AuthExtend<Auth>; // The authentication class.
};

export class AuthManager {
  protected options: AuthManagerOptions;
  protected authTypes: Registry<AuthConfig> = new Registry();
  // authenticators collection manager.
  protected storer: Storer;
  jwt: JwtService;

  constructor(options: AuthManagerOptions) {
    this.options = options;
    this.jwt = new JwtService(options.jwt);
  }

  setStorer(storer: Storer) {
    this.storer = storer;
  }

  setTokenBlacklistService(service: ITokenBlacklistService) {
    this.jwt.blacklist = service;
  }

  /**
   * registerTypes
   * @description Add a new authenticate type and the corresponding authenticator.
   * The types will show in the authenticators list of the admin panel.
   *
   * @param {string} authType - The type of the authenticator. It is required to be unique.
   * @param {AuthConfig} authConfig - Configurations of the kind of authenticator.
   */
  registerTypes(authType: string, authConfig: AuthConfig) {
    this.authTypes.register(authType, authConfig);
  }

  listTypes() {
    return Array.from(this.authTypes.getKeys());
  }

  getAuthConfig(authType: string) {
    return this.authTypes.get(authType);
  }

  /**
   * get
   * @description Get authenticator instance by name.
   * @param {string} name - The name of the authenticator.
   * @return {Promise<Auth>} authenticator instance.
   */
  async get(name: string, ctx: Context) {
    if (!this.storer) {
      throw new Error('AuthManager.storer is not set.');
    }
    const authenticator = await this.storer.get(name);
    if (!authenticator) {
      throw new Error(`Authenticator [${name}] is not found.`);
    }
    const { auth } = this.authTypes.get(authenticator.authType);
    if (!auth) {
      throw new Error(`AuthType [${name}] is not found.`);
    }
    return new auth({ authenticator, options: authenticator.options, ctx });
  }

  /**
   * middleware
   * @description Auth middleware, used to check the authentication status.
   */
  middleware() {
    return async (ctx: Context & { auth: Auth }, next: Next) => {
      const token = ctx.getBearerToken();
      if (token && (await ctx.app.authManager.jwt.blacklist.has(token))) {
        return ctx.throw(401, ctx.t('token is not available'));
      }

      const name = ctx.get(this.options.authKey) || this.options.default;
      let authenticator: Auth;
      try {
        authenticator = await ctx.app.authManager.get(name, ctx);
        ctx.auth = authenticator;
      } catch (err) {
        ctx.auth = {} as Auth;
        ctx.app.logger.warn(`auth, ${err.message}, ${err.stack}`);
        return next();
      }
      if (authenticator) {
        const user = await ctx.auth.check();
        console.log('====================================');
        console.log('user-manager', user);
        console.log('====================================');
        if (user) {
          ctx.auth.user = user;
        }
      }
      await next();
    };
  }
}
