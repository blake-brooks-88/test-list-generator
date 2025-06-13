import { renderHook, act, render } from '@testing-library/react'
import { useTestListConfig, TestListConfigProvider } from '../hooks/useTestListConfig'

const renderUseProgress = () => {
    const wrapper = ({ children }) => (
        <TestListConfigProvider>
            {children}
        </TestListConfigProvider>
    )
    return renderHook(() => useTestListConfig(), { wrapper });
}


describe('useTestListConfig', () => {
    test('should have initial state', () => {

        const { result } = renderUseProgress()

        expect(result.current.selectedDe).toBe(null);
        expect(result.current.variantFields).toEqual([]);
        expect(typeof result.current.selectField).toBe('function');
        expect(typeof result.current.unselectField).toBe('function');
        expect(typeof result.current.clearVariantFields).toBe('function');
        expect(typeof result.current.setSelectedDe).toBe('function');
        expect(typeof result.current.isFieldSelected).toBe('function');
        expect(typeof result.current.clearAll).toBe('function');
    });

    test('select field adds field to selected fields', () => {

        const { result } = renderUseProgress()

        expect(result.current.variantFields).toEqual([]);

        act(() => {
            result.current.selectField("FirstName");
        });

        expect(result.current.variantFields).toHaveLength(1);
        expect(result.current.variantFields[0]).toBe("FirstName");
    });

    test('select field only adds field once', () => {

        const { result } = renderUseProgress()

        expect(result.current.variantFields).toEqual([]);

        act(() => {
            result.current.selectField("FirstName");
        });

        expect(result.current.variantFields).toHaveLength(1);
        expect(result.current.variantFields[0]).toBe("FirstName");

        act(() => {
            result.current.selectField("FirstName");
        });

        expect(result.current.variantFields).toHaveLength(1);
        expect(result.current.variantFields[0]).toBe("FirstName");
    });

    test('unselect field removes selected field', () => {

        const { result } = renderUseProgress()

        expect(result.current.variantFields).toEqual([]);

        act(() => {
            result.current.selectField("FirstName");
        });

        expect(result.current.variantFields).toHaveLength(1);
        expect(result.current.variantFields[0]).toBe("FirstName");

        act(() => {
            result.current.unselectField("FirstName");
        });

        expect(result.current.variantFields).toHaveLength(0);
        expect(result.current.variantFields[0]).toBe(undefined);
    });

    test('clearVariantFields clears all selected fields', () => {

        const { result } = renderUseProgress()

        expect(result.current.variantFields).toEqual([]);

        act(() => {
            result.current.selectField("FirstName");
        });

        act(() => {
            result.current.selectField("LastName");
        });

        act(() => {
            result.current.selectField("State");
        });

        expect(result.current.variantFields).toHaveLength(3);
        expect(result.current.variantFields[0]).toBe("FirstName");
        expect(result.current.variantFields[1]).toBe("LastName");
        expect(result.current.variantFields[2]).toBe("State");

        act(() => {
            result.current.clearVariantFields();
        });

        expect(result.current.variantFields).toHaveLength(0);
        expect(result.current.variantFields[0]).toBe(undefined);
    });

    test('setSelectedDE stores DE data correctly', () => {

        const { result } = renderUseProgress()

        const exampleDE = {
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

        act(() => {
            result.current.setSelectedDe(exampleDE);
        });

        expect(result.current.selectedDe).toEqual(exampleDE);
    });

    test('isFieldSelected returns true for selected field', () => {
        const { result } = renderUseProgress();

        expect(result.current.isFieldSelected("FirstName")).toBe(false);

        act(() => {
            result.current.selectField("FirstName");
        });

        expect(result.current.isFieldSelected("FirstName")).toBe(true);
        expect(result.current.isFieldSelected("LastName")).toBe(false);
    });

    test('isFieldSelected returns false for non-selected field', () => {
        const { result } = renderUseProgress();

        act(() => {
            result.current.selectField("FirstName");
            result.current.selectField("Email");
        });

        expect(result.current.isFieldSelected("FirstName")).toBe(true);
        expect(result.current.isFieldSelected("Email")).toBe(true);
        expect(result.current.isFieldSelected("LastName")).toBe(false);
        expect(result.current.isFieldSelected("NonExistentField")).toBe(false);
    });

    test('clearAll resets both selectedDE and variantFields', () => {
        const { result } = renderUseProgress();

        const exampleDE = {
            name: "Test DE",
            externalKey: "test-key",
            fields: []
        };

        act(() => {
            result.current.setSelectedDe(exampleDE);
            result.current.selectField("FirstName");
            result.current.selectField("Email");
        });

        expect(result.current.selectedDe).toEqual(exampleDE);
        expect(result.current.variantFields).toHaveLength(2);

        act(() => {
            result.current.clearAll();
        });

        expect(result.current.selectedDe).toBe(null);
        expect(result.current.variantFields).toEqual([]);
    });

    test('setSelectedDE clears selected fields when setting new DE', () => {
        const { result } = renderUseProgress();

        const firstDE = {
            name: "First DE",
            externalKey: "first-key",
            fields: []
        };

        const secondDE = {
            name: "Second DE",
            externalKey: "second-key",
            fields: []
        };

        act(() => {
            result.current.setSelectedDe(firstDE);
            result.current.selectField("FirstName");
            result.current.selectField("Email");
        });

        expect(result.current.selectedDe).toEqual(firstDE);
        expect(result.current.variantFields).toHaveLength(2);

        act(() => {
            result.current.setSelectedDe(secondDE);
        });

        expect(result.current.selectedDe).toEqual(secondDE);
        expect(result.current.variantFields).toEqual([]);
    });

    test('setSelectedDE handles null value', () => {
        const { result } = renderUseProgress();

        const exampleDE = {
            name: "Test DE",
            externalKey: "test-key",
            fields: []
        };

        act(() => {
            result.current.setSelectedDe(exampleDE);
            result.current.selectField("FirstName");
        });

        expect(result.current.selectedDe).toEqual(exampleDE);
        expect(result.current.variantFields).toHaveLength(1);

        act(() => {
            result.current.setSelectedDe(null);
        });

        expect(result.current.selectedDe).toBe(null);
        expect(result.current.variantFields).toEqual([]);
    });

    test('multiple field operations work correctly', () => {
        const { result } = renderUseProgress();

        act(() => {
            result.current.selectField("FirstName");
            result.current.selectField("LastName");
            result.current.selectField("Email");
        });

        expect(result.current.variantFields).toHaveLength(3);
        expect(result.current.isFieldSelected("FirstName")).toBe(true);
        expect(result.current.isFieldSelected("LastName")).toBe(true);
        expect(result.current.isFieldSelected("Email")).toBe(true);

        act(() => {
            result.current.unselectField("LastName");
        });

        expect(result.current.variantFields).toHaveLength(2);
        expect(result.current.isFieldSelected("FirstName")).toBe(true);
        expect(result.current.isFieldSelected("LastName")).toBe(false);
        expect(result.current.isFieldSelected("Email")).toBe(true);
    });

    test('unselectField handles non-existent field gracefully', () => {
        const { result } = renderUseProgress();

        act(() => {
            result.current.unselectField("NonExistentField");
        });

        expect(result.current.variantFields).toEqual([]);
    });

    test('field operations with empty strings and special characters', () => {
        const { result } = renderUseProgress();

        act(() => {
            result.current.selectField("");
            result.current.selectField("Field With Spaces");
            result.current.selectField("Field_With_Underscores");
        });

        expect(result.current.variantFields).toHaveLength(3);
        expect(result.current.isFieldSelected("")).toBe(true);
    });

})