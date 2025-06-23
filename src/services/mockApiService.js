export const mockApiService = {
  /**
   * Retrieves the fields for a specific Data Extension.
   * @param {string} deExternalKey - The external key of the Data Extension.
   */
  getDataExtension: (deExternalKey) => {
    if (!deExternalKey || deExternalKey.trim() === "") {
      return Promise.reject(
        new Error(
          "Data Extension Customer Key (deExternalKey) was not provided in the URL."
        )
      );
    }

    if (deExternalKey === "NOT_FOUND" || deExternalKey === "invalid-key") {
      return Promise.reject(
        new Error(
          `Data Extension Customer Key '${deExternalKey}' was not provided in the URL.`
        )
      );
    }

    if (deExternalKey === "SERVER_ERROR") {
      return Promise.reject(new Error("HTTP error! Status: 500"));
    }

    let mockDataExtension;

    if (deExternalKey === "46F82D8F-B4AA-4BD4-8151-F751448C6608") {
      mockDataExtension = {
        name: "Transactional_Journey_API_Entry",
        externalKey: deExternalKey,
        isSendable: true,
        folderId: 1806863,
        sendableDeField: "SubscriberKey",
        sendableSubscriberField: "Subscriber Key",
        fields: [
          {
            Name: "SubscriberKey",
            FieldType: "Text",
            MaxLength: 50,
            IsRequired: true,
          },
          {
            Name: "eventInstanceId",
            FieldType: "Text",
            MaxLength: 50,
            IsRequired: true,
          },
          {
            Name: "Email",
            FieldType: "EmailAddress",
            MaxLength: 254,
            IsRequired: false,
          },
          {
            Name: "ContactKey",
            FieldType: "Text",
            MaxLength: 50,
            IsRequired: true,
          },
          {
            Name: "Last_Name",
            FieldType: "Text",
            MaxLength: 150,
            IsRequired: false,
          },
          {
            Name: "First_Name",
            FieldType: "Text",
            MaxLength: 150,
            IsRequired: false,
          },
        ],
      };
    } else {
      mockDataExtension = {
        name: "Test DE",
        externalKey: deExternalKey,
        isSendable: false,
        folderId: 1234567,
        sendableDeField: null,
        sendableSubscriberField: null,
        fields: [
          {
            Name: "SubscriberKey",
            FieldType: "Text",
            MaxLength: 50,
            IsRequired: false,
          },
          {
            Name: "Email",
            FieldType: "EmailAddress",
            MaxLength: 254,
            IsRequired: true,
          },
          {
            Name: "FirstName",
            FieldType: "Text",
            MaxLength: 100,
            IsRequired: false,
          },
        ],
      };
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ dataExtension: mockDataExtension });
      }, 100);
    });
  },

  /**
   * Creates a new Data Extension.
   * @param {Object} deDetails - The Data Extension configuration object.
   */
  createDataExtension: (deDetails) => {
    if (!deDetails) {
      return Promise.reject(
        new Error("Data Extension details (deDetails) were not provided.")
      );
    }

    if (
      !deDetails.CustomerKey ||
      !deDetails.Name ||
      !deDetails.CategoryID ||
      !deDetails.Fields
    ) {
      return Promise.reject(
        new Error(
          "Missing required fields: CustomerKey, Name, CategoryID, and Fields are required."
        )
      );
    }

    if (deDetails.CustomerKey === "DUPLICATE_KEY") {
      return Promise.reject(
        new Error("A Data Extension with this CustomerKey already exists.")
      );
    }

    if (deDetails.CustomerKey === "INVALID_CATEGORY") {
      return Promise.reject(
        new Error(
          "The specified CategoryID does not exist or is not accessible."
        )
      );
    }

    if (deDetails.CustomerKey === "SERVER_ERROR") {
      return Promise.reject(new Error("HTTP error! Status: 500"));
    }

    const mockResult = {
      result: {
        Status: "OK",
        StatusCode: "OK",
        StatusMessage: "DataExtension created.",
        Results: [
          {
            StatusCode: "OK",
            StatusMessage: "DataExtension created.",
            OrdinalID: 0,
            ErrorCode: 0,
            Object: {
              CustomerKey: deDetails.CustomerKey,
              Name: deDetails.Name,
              CategoryID: deDetails.CategoryID,
              IsSendable: deDetails.SendableInfo ? true : false,
              IsTestable: deDetails.IsTestable || false,
              CreatedDate: new Date().toISOString(),
              ModifiedDate: new Date().toISOString(),
              ObjectID: Math.random().toString(36).substr(2, 9).toUpperCase(),
            },
            NewID: 0,
            NewObjectID: Math.random().toString(36).substr(2, 9).toUpperCase(),
          },
        ],
        RequestID: Math.random().toString(36).substr(2, 9).toUpperCase(),
        OverallStatusCode: "OK",
      },
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockResult);
      }, 200);
    });
  },
};
