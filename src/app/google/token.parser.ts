import { URLSearchParams, QueryEncoder } from '@angular/http';

import { IUnverifiedToken } from '../token';

export class TokenParser {
  public static parseObject(value: any): IUnverifiedToken {
    if (!value || typeof value !== 'object') {
      throw new Error('Value must be an object');
    }
    if (typeof value.access_token !== 'string') {
      throw new Error('Object does not have \'access_token\' field');
    }
    if (typeof value.token_type !== 'string') {
      throw new Error('Object does not have \'token_type\' field');
    }
    if (typeof value.expires_in !== 'string') {
      throw new Error('Object does not have \'expires\' field');
    }

    const expiresSeconds = parseInt(value.expires_in, 10);
    if (isNaN(expiresSeconds)) {
      throw new Error(`Invalid expires value: ${value.expires}. Unable to convert to integer`);
    }
    const expiresTimestamp = Date.now() + expiresSeconds * 1000;

    return {
      value: value.access_token,
      type: value.token_type,
      expires: expiresTimestamp
    };
  }

  public static parseString(value: string): IUnverifiedToken {
    const queryParams = new URLSearchParams(value, new QueryEncoder());
    return TokenParser.parseObject({
      access_token: queryParams.get('access_token'),
      token_type: queryParams.get('token_type'),
      expires_in: queryParams.get('expires_in')
    });
  }
}