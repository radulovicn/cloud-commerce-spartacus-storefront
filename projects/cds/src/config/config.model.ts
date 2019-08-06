export abstract class CdsConfig {
  cds: {
    baseUrl?: string;
    tenantId?: string;
    clientId?: string;
    allowInsecureCookies?: boolean;
    httpHeaderName: {
      id: string;
    };
    /** provides a URL to the profile tag JS file  */
    profileTagScriptUrl?: string;

    /** provides a URL to the profile track endpoint  */
    profileTagTrackUrl?: string;
  };
}
