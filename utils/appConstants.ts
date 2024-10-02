export const NEXT_PUBLIC_COOKIE_TOKEN_NAME: string | undefined = process.env.NEXT_PUBLIC_COOKIE_TOKEN_NAME;
export const projectEnvName: string | undefined = process.env.NEXT_PUBLIC_PROJECT_NAME;
export const nodeEnv: string | undefined = process.env.NODE_ENV;
export const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

let backendApiUrl: string | undefined;
let frontendUrl: string | undefined;

switch (nodeEnv) {
  case 'development':
    backendApiUrl = process.env.NEXT_PUBLIC_DEV_BASE_URL_BE;
    frontendUrl = process.env.NEXT_PUBLIC_DEV_BASE_URL_FE;
    break;

  case 'production':
    backendApiUrl = process.env.NEXT_PUBLIC_PROD_BASE_URL_BE;
    frontendUrl = process.env.NEXT_PUBLIC_PROD_BASE_URL_FE;
    break;

  default:
    backendApiUrl = process.env.NEXT_PUBLIC_PROD_BASE_URL_BE;
    frontendUrl = process.env.NEXT_PUBLIC_PROD_BASE_URL_FE;
    break;
}

export { backendApiUrl, frontendUrl };
