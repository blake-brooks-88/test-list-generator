import { renderHook, act } from "@testing-library/react";
import {
  useDataExtensionApi,
  DataExtensionProvider,
} from "../hooks/useDataExtensionApi";
import { TestListConfigProvider } from "../hooks/useTestListConfig";

const AllProviders = ({ children }) => (
  <TestListConfigProvider>
    <DataExtensionProvider>{children}</DataExtensionProvider>
  </TestListConfigProvider>
);

const renderHookWithProvider = (hook) => {
  return renderHook(hook, { wrapper: AllProviders });
};

describe("useDataExtensionApi", () => {
  const originalEnv = process.env.NODE_ENV;

  beforeAll(() => {
    process.env.NODE_ENV = "development";
  });

  afterAll(() => {
    process.env.NODE_ENV = originalEnv;
  });

  test("Should have initial state", () => {
    const { result } = renderHookWithProvider(() => useDataExtensionApi());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.selectedDe).toBe(null);
    expect(typeof result.current.fetchDe).toBe("function");
  });

  test("Should handle invalid external key", async () => {
    const { result } = renderHookWithProvider(() => useDataExtensionApi());

    await act(async () => {
      await result.current.fetchDe("NOT_FOUND");
    });

    expect(result.current.error).toBe(
      "Data Extension Customer Key 'NOT_FOUND' was not provided in the URL."
    );
  });

  test("Should handle missing external key error", async () => {
    const { result } = renderHookWithProvider(() => useDataExtensionApi());

    await act(async () => {
      await result.current.fetchDe();
    });

    expect(result.current.error).toBe(
      "Data Extension Customer Key (deExternalKey) was not provided in the URL."
    );
  });

  test("Should handle server error", async () => {
    const { result } = renderHookWithProvider(() => useDataExtensionApi());

    await act(async () => {
      await result.current.fetchDe("SERVER_ERROR");
    });

    expect(result.current.error).toBe("HTTP error! Status: 500");
  });

  test("Error should result in loading set to false", async () => {
    const { result } = renderHookWithProvider(() => useDataExtensionApi());

    await act(async () => {
      await result.current.fetchDe("SERVER_ERROR");
    });

    expect(result.current.error).toBe("HTTP error! Status: 500");
    expect(result.current.loading).toBe(false);
  });

  test("Should handle valid DE return", async () => {
    const { result } = renderHookWithProvider(() => useDataExtensionApi());

    await act(async () => {
      await result.current.fetchDe("46F82D8F-B4AA-4BD4-8151-F751448C6608");
    });

    const expectedData = {
      name: "Transactional_Journey_API_Entry",
      externalKey: "46F82D8F-B4AA-4BD4-8151-F751448C6608",
      sendableDeField: "SubscriberKey",
      sendableSubscriberField: "Subscriber Key",
      folderId: 1806863,
      isSendable: true,
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

    expect(result.current.selectedDe).toEqual(expectedData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);

    const fieldNames = result.current.selectedDe.fields.map((f) => f.Name);
    expect(fieldNames).toEqual(
      expect.arrayContaining([
        "SubscriberKey",
        "eventInstanceId",
        "Email",
        "ContactKey",
        "Last_Name",
        "First_Name",
      ])
    );

    const subscriberKeyField = result.current.selectedDe.fields.find(
      (f) => f.Name === "SubscriberKey"
    );
    expect(subscriberKeyField.FieldType).toBe("Text");
    expect(subscriberKeyField.MaxLength).toBe(50);
    expect(subscriberKeyField.IsRequired).toBe(true);

    const emailField = result.current.selectedDe.fields.find(
      (f) => f.Name === "Email"
    );
    expect(emailField.FieldType).toBe("EmailAddress");
    expect(emailField.MaxLength).toBe(254);
    expect(emailField.IsRequired).toBe(false);
  });

  test("Should throw error when used outside provider", () => {
    expect(() => {
      renderHook(() => useDataExtensionApi());
    }).toThrow(
      "useDataExtensionApi must be used within a DataExtensionProvider"
    );
  });
});
