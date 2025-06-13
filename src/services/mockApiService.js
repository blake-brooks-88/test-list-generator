import { config } from '../config';

export const mockApiService = {
    /**
     * Retrieves the fields for a specific Data Extension.
     * @param {string} deExternalKey - The external key of the Data Extension.
     */
    getDataExtension: (deExternalKey) => {

        if (!deExternalKey || deExternalKey.trim() === '') {
            return Promise.reject(new Error("Data Extension Customer Key (deExternalKey) was not provided in the URL."));
        }

        if (deExternalKey === 'NOT_FOUND' || deExternalKey === 'invalid-key') {
            return Promise.reject(new Error(`Data Extension Customer Key '${deExternalKey}' was not provided in the URL.`));
        }

        if (deExternalKey === 'SERVER_ERROR') {
            return Promise.reject(new Error('HTTP error! Status: 500'));
        }

        let mockDataExtension;

        if (deExternalKey === '46F82D8F-B4AA-4BD4-8151-F751448C6608') {
            mockDataExtension = {
                name: "Transactional_Journey_API_Entry",
                externalKey: deExternalKey,
                sendableDeField: "SubscriberKey",
                sendableSubscriberField: "_SubscriberKey",
                fields: [
                    {
                        "Name": "SubscriberKey",
                        "FieldType": "Text",
                        "MaxLength": 50,
                        "IsRequired": true
                    },
                    {
                        "Name": "eventInstanceId",
                        "FieldType": "Text",
                        "MaxLength": 50,
                        "IsRequired": true
                    },
                    {
                        "Name": "Email",
                        "FieldType": "EmailAddress",
                        "MaxLength": 254,
                        "IsRequired": false
                    },
                    {
                        "Name": "ContactKey",
                        "FieldType": "Text",
                        "MaxLength": 50,
                        "IsRequired": true
                    },
                    {
                        "Name": "Last_Name",
                        "FieldType": "Text",
                        "MaxLength": 150,
                        "IsRequired": false
                    },
                    {
                        "Name": "First_Name",
                        "FieldType": "Text",
                        "MaxLength": 150,
                        "IsRequired": false
                    }
                ]
            };
        } else {

            mockDataExtension = {
                name: "Test DE",
                externalKey: deExternalKey,
                fields: [
                    {
                        "Name": "SubscriberKey",
                        "FieldType": "Text",
                        "MaxLength": 50,
                        "IsRequired": false
                    },
                    {
                        "Name": "Email",
                        "FieldType": "EmailAddress",
                        "MaxLength": 254,
                        "IsRequired": true
                    },
                    {
                        "Name": "FirstName",
                        "FieldType": "Text",
                        "MaxLength": 100,
                        "IsRequired": false
                    }
                ]
            };
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ dataExtension: mockDataExtension });
            }, 100);
        });
    }
};