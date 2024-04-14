const intelligentServicePort: number | undefined = process.env
  .INTELLIGENT_SERVICE_PORT
  ? parseInt(process.env.INTELLIGENT_SERVICE_PORT)
  : undefined;

export const intelligentServiceBaseURL = `http://${process.env.INTELLIGENT_SERVICE_HOST}${intelligentServicePort && ':' + intelligentServicePort}`;
export const intelligentServiceApiURL = `${intelligentServiceBaseURL}/api/v1`;
export const intelligentServiceRecommendationsURL = `${intelligentServiceApiURL}/predictions`;
