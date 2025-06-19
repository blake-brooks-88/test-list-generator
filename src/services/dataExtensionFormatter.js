export const createDataExtensionConfig = (
  name,
  fields,
  folderId = 123,
  sendableField = null
) => {
  let sendableInfo = sendableField
    ? {
        Field: {
          Name: sendableField.Name,
          FieldType: sendableField.FieldType,
        },
        RelatesOn: "Subscriber Key",
      }
    : null;
  const config = {
    CustomerKey: crypto.randomUUID(),
    Name: name,
    CategoryID: folderId,
    SendableInfo: sendableInfo,
    IsTestable: true,
    Fields: fields,
  };

  return config;
};
