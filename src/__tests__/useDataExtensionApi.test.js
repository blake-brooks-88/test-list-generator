import { renderHook, act, render, waitFor } from '@testing-library/react'
import { useDataExtensionApi } from '../hooks/useDataExtensionApi'

describe('useDataExtensionApi', () => {
    const originalEnv = process.env.NODE_ENV;

    beforeAll(() => {
        process.env.NODE_ENV = 'development';
    });

    afterAll(() => {
        process.env.NODE_ENV = originalEnv;
    });

    test('Should have initial state', () => {
        const { result } = renderHook(() => useDataExtensionApi());

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
        expect(result.current.prodDataExtension).toBe(null);
        expect(typeof result.current.fetchDe).toBe('function');
    })

    test('Should handle invalid external key', async () => {
        const { result } = renderHook(() => useDataExtensionApi());

        await act(async () => {
            await result.current.fetchDe('NOT_FOUND');
        })

        expect(result.current.error).toBe("Data Extension Customer Key 'NOT_FOUND' was not provided in the URL.");
    })

    test('Should handle missing external key error', async () => {
        const { result } = renderHook(() => useDataExtensionApi());

        await act(async () => {
            await result.current.fetchDe();
        })

        expect(result.current.error).toBe("Data Extension Customer Key (deExternalKey) was not provided in the URL.");
    })

    test('Should handle server error', async () => {
        const { result } = renderHook(() => useDataExtensionApi());

        await act(async () => {
            await result.current.fetchDe('SERVER_ERROR');
        })

        expect(result.current.error).toBe('HTTP error! Status: 500');
    })

    test('Error should result in loading set to false', async () => {
        const { result } = renderHook(() => useDataExtensionApi());

        await act(async () => {
            await result.current.fetchDe('SERVER_ERROR');
        })

        expect(result.current.error).toBe('HTTP error! Status: 500');

        expect(result.current.loading).toBe(false);
    })

    test('Should handle valid DE return', async () => {
        const { result } = renderHook(() => useDataExtensionApi());

        await act(async () => {
            await result.current.fetchDe('46F82D8F-B4AA-4BD4-8151-F751448C6608');
        });

        const expectedData = {
            name: "Transactional_Journey_API_Entry",
            externalKey: "46F82D8F-B4AA-4BD4-8151-F751448C6608",
            sendableDeField: "SubscriberKey",
            sendableSubscriberField: "_SubscriberKey",
            fields: [
                {
                    Name: "SubscriberKey",
                    FieldType: "Text",
                    MaxLength: 50,
                    IsRequired: true
                },
                {
                    Name: "eventInstanceId",
                    FieldType: "Text",
                    MaxLength: 50,
                    IsRequired: true
                },
                {
                    Name: "Email",
                    FieldType: "EmailAddress",
                    MaxLength: 254,
                    IsRequired: false
                },
                {
                    Name: "ContactKey",
                    FieldType: "Text",
                    MaxLength: 50,
                    IsRequired: true
                },
                {
                    Name: "Last_Name",
                    FieldType: "Text",
                    MaxLength: 150,
                    IsRequired: false
                },
                {
                    Name: "First_Name",
                    FieldType: "Text",
                    MaxLength: 150,
                    IsRequired: false
                }
            ]
        };

        expect(result.current.prodDataExtension).toEqual(expectedData);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);

        expect(result.current.prodDataExtension.name).toBe("Transactional_Journey_API_Entry");
        expect(result.current.prodDataExtension.externalKey).toBe("46F82D8F-B4AA-4BD4-8151-F751448C6608");
        expect(result.current.prodDataExtension.fields).toHaveLength(6);

        result.current.prodDataExtension.fields.forEach(field => {
            expect(field).toHaveProperty('Name');
            expect(field).toHaveProperty('FieldType');
            expect(field).toHaveProperty('MaxLength');
            expect(field).toHaveProperty('IsRequired');
            expect(typeof field.Name).toBe('string');
            expect(typeof field.FieldType).toBe('string');
            expect(typeof field.IsRequired).toBe('boolean');
            expect(field.MaxLength === null || typeof field.MaxLength === 'number').toBe(true);
        });

        const fieldNames = result.current.prodDataExtension.fields.map(f => f.Name);
        expect(fieldNames).toContain('SubscriberKey');
        expect(fieldNames).toContain('eventInstanceId');
        expect(fieldNames).toContain('Email');
        expect(fieldNames).toContain('ContactKey');
        expect(fieldNames).toContain('Last_Name');
        expect(fieldNames).toContain('First_Name');

        const subscriberKeyField = result.current.prodDataExtension.fields.find(f => f.Name === 'SubscriberKey');
        expect(subscriberKeyField.FieldType).toBe('Text');
        expect(subscriberKeyField.MaxLength).toBe(50);
        expect(subscriberKeyField.IsRequired).toBe(true);

        const emailField = result.current.prodDataExtension.fields.find(f => f.Name === 'Email');
        expect(emailField.FieldType).toBe('EmailAddress');
        expect(emailField.MaxLength).toBe(254);
        expect(emailField.IsRequired).toBe(false);

    })
})