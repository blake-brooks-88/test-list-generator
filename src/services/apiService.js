import { config } from "../config";

/**
 * A generic helper function to handle fetch requests to the SSJS backend.
 * @param {string} endpoint - The query string for the CloudPage proxy (e.g., '?action=getDeFields')
 * @returns {Promise<any>}
 */
async function request(endpoint, method = "GET", data = null) {
  const url = `${config.API_BASE_URL}${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data && method === "POST") {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Service Error:", error);
    throw error;
  }
}

export const apiService = {
  getDataExtension: (deExternalKey) => {
    return request(
      `?action=getDataExtension&deExternalKey=${encodeURIComponent(
        deExternalKey
      )}`
    );
  },

  createDataExtension: (deDetails) => {
    return request("?action=createDataExtension", "POST", deDetails);
  },

  overWriteDataExtension: (data) => {
    return request("?action=overWriteDataExtension", "POST", data);
  },

  createSampleList: (sampleListConfig) => {
    return request("?action=createSampleList", "POST", sampleListConfig);
  },
};
