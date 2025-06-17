const API_BASE_URL = window.sfmcAppConfig?.apiUrl || "";

export const config = {
  API_BASE_URL,
};

if (!API_BASE_URL) {
  console.warn(
    "MCE App Config Warning: API_BASE_URL is not defined. " +
      "Ensure the host CloudPage is injecting the configuration correctly " +
      "and that you have replaced the sample CloudPage ID."
  );
}
