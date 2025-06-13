import { config } from '../config';

/**
 * A generic helper function to handle fetch requests to the SSJS backend.
 * @param {string} endpoint - The query string for the CloudPage proxy (e.g., '?action=getDeFields')
 * @returns {Promise<any>}
 */
async function request(endpoint) {
    const url = `${config.API_BASE_URL}${endpoint}`;
    try {
        const response = await fetch(url);
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
    /**
     * Retrieves the fields for a specific Data Extension.
     * @param {string} deExternalKey - The name of the Data Extension.
     */
    getDataExtension: (deExternalKey) => {

        return request(`?action=getDataExtension&deExternalKey=${encodeURIComponent(deExternalKey)}`);
    }

    // getFolders: () => request('?action=getFolders'),
};