import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

const config = {
  credentials: {
    tenantID: '<tenant-id>',
    clientID: '<client-id>',
    audience: '<audience-id>',
  },
  metadata: {
    authority: 'login.microsoftonline.com',
    discovery: '.well-known/openid-configuration',
    version: 'v2.0',
  },
  settings: {
    validateIssuer: true,
    passReqToCallback: false,
    loggingLevel: 'info',
  },
};
const EXPOSED_SCOPES = ['Files.Read'];//provide a scope of your azure AD

@Injectable()
export class AzureADStrategy extends PassportStrategy(
  BearerStrategy,
  'AzureAD'
) {
  constructor() {
    super({
      identityMetadata: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}/${config.metadata.discovery}`,
      issuer: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}`,
      clientID: config.credentials.clientID,
      audience: config.credentials.audience,
      validateIssuer: config.settings.validateIssuer,
      passReqToCallback: config.settings.passReqToCallback,
      loggingLevel: config.settings.loggingLevel,
      loggingNoPII: false,
    });
  }

  async validate(profile: any): Promise<any> {
    // Implement user validation and extraction of necessary user information from profile
    // Example: Extract and store user details in a session
    return profile;
  }
}

export const AzureADGuard = AuthGuard('AzureAD');