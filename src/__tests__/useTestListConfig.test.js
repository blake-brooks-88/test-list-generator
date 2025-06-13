import { renderHook, act } from '@testing-library/react'
import { useTestListConfig, TestListConfigProvider } from '../hooks/useTestListConfig'

const renderUseProgress = () => {
    const wrapper = ({ children }) => (
        <TestListConfigProvider>
            {children}
        </TestListConfigProvider>
    );
    return renderHook(() => useTestListConfig(), { wrapper });
};

function testVariantFieldBehavior(result) {
    const getFields = () => result.current.variantFields;
    const select = (field) => act(() => result.current.selectVariantField(field));
    const unselect = (field) => act(() => result.current.unselectVariantField(field));
    const clear = () => act(() => result.current.clearVariantFields());
    const isSelected = (field) => result.current.isVariantFieldSelected(field);
    return { getFields, select, unselect, clear, isSelected };
}

function testTestDataFieldBehavior(result) {
    const getFields = () => result.current.testDataFields;
    const select = (field) => act(() => result.current.selectTestDataField(field));
    const unselect = (field) => act(() => result.current.unselectTestDataField(field));
    const clear = () => act(() => result.current.clearTestDataFields());
    const isSelected = (field) => result.current.isTestDataFieldSelected(field);
    return { getFields, select, unselect, clear, isSelected };
}

describe('useTestListConfig', () => {
    test('should have initial state', () => {
        const { result } = renderUseProgress();

        expect(result.current.selectedDe).toBe(null);
        expect(result.current.variantFields).toEqual([]);
        expect(result.current.testDataFields).toEqual([]);
        expect(result.current.mode).toBe(null);
        expect(result.current.testData).toBe('');
        expect(result.current.varianceData).toBe('');

        expect(typeof result.current.selectVariantField).toBe('function');
        expect(typeof result.current.selectTestDataField).toBe('function');
        expect(typeof result.current.unselectVariantField).toBe('function');
        expect(typeof result.current.unselectTestDataField).toBe('function');
        expect(typeof result.current.clearVariantFields).toBe('function');
        expect(typeof result.current.clearTestDataFields).toBe('function');
        expect(typeof result.current.setSelectedDe).toBe('function');
        expect(typeof result.current.isVariantFieldSelected).toBe('function');
        expect(typeof result.current.isTestDataFieldSelected).toBe('function');
        expect(typeof result.current.clearAll).toBe('function');
    });

    describe('variantFields field logic', () => {
        test('select field adds field to selected fields', () => {
            const { result } = renderUseProgress();
            const config = testVariantFieldBehavior(result);

            config.select("FirstName");
            expect(config.getFields()).toContain("FirstName");
        });

        test('select field only adds field once', () => {
            const { result } = renderUseProgress();
            const config = testVariantFieldBehavior(result);

            config.select("FirstName");
            config.select("FirstName");
            expect(config.getFields()).toEqual(["FirstName"]);
        });

        test('unselect field removes selected field', () => {
            const { result } = renderUseProgress();
            const config = testVariantFieldBehavior(result);

            config.select("FirstName");
            config.unselect("FirstName");
            expect(config.getFields()).not.toContain("FirstName");
        });

        test('clearFields clears all selected fields', () => {
            const { result } = renderUseProgress();
            const config = testVariantFieldBehavior(result);

            config.select("FirstName");
            config.select("LastName");
            config.select("Email");

            config.clear();
            expect(config.getFields()).toEqual([]);
        });

        test('isFieldSelected returns correct values', () => {
            const { result } = renderUseProgress();
            const config = testVariantFieldBehavior(result);

            expect(config.isSelected("FirstName")).toBe(false);
            config.select("FirstName");
            expect(config.isSelected("FirstName")).toBe(true);
        });

        test('unselectField handles non-existent field gracefully', () => {
            const { result } = renderUseProgress();
            const config = testVariantFieldBehavior(result);

            config.unselect("DoesNotExist");
            expect(config.getFields()).toEqual([]);
        });

        test('field operations with special characters and edge cases', () => {
            const { result } = renderUseProgress();
            const config = testVariantFieldBehavior(result);

            config.select("");
            config.select("Field With Spaces");
            config.select("!@#SpecialChars123");

            expect(config.getFields()).toEqual(["", "Field With Spaces", "!@#SpecialChars123"]);
        });

        test('field list resets after setting new DE', () => {
            const { result } = renderUseProgress();
            const config = testVariantFieldBehavior(result);

            const firstDE = { name: "DE1", externalKey: "key1", fields: [] };
            const secondDE = { name: "DE2", externalKey: "key2", fields: [] };

            act(() => result.current.setSelectedDe(firstDE));
            config.select("Email");
            config.select("FirstName");
            expect(config.getFields().length).toBe(2);

            act(() => result.current.setSelectedDe(secondDE));
            expect(config.getFields()).toEqual([]);
        });

        test('field list resets when DE is set to null', () => {
            const { result } = renderUseProgress();
            const config = testVariantFieldBehavior(result);

            const exampleDE = { name: "DE1", externalKey: "key1", fields: [] };

            act(() => result.current.setSelectedDe(exampleDE));
            config.select("Email");
            expect(config.getFields()).toHaveLength(1);

            act(() => result.current.setSelectedDe(null));
            expect(config.getFields()).toEqual([]);
        });

        test('clearAll resets selected fields', () => {
            const { result } = renderUseProgress();
            const config = testVariantFieldBehavior(result);

            config.select("A");
            config.select("B");
            expect(config.getFields().length).toBe(2);

            act(() => result.current.clearAll());
            expect(config.getFields()).toEqual([]);
        });
    });

    describe('testDataFields field logic', () => {
        test('select field adds field to selected fields', () => {
            const { result } = renderUseProgress();
            const config = testTestDataFieldBehavior(result);

            config.select("FirstName");
            expect(config.getFields()).toContain("FirstName");
        });

        test('select field only adds field once', () => {
            const { result } = renderUseProgress();
            const config = testTestDataFieldBehavior(result);

            config.select("FirstName");
            config.select("FirstName");
            expect(config.getFields()).toEqual(["FirstName"]);
        });

        test('unselect field removes selected field', () => {
            const { result } = renderUseProgress();
            const config = testTestDataFieldBehavior(result);

            config.select("FirstName");
            config.unselect("FirstName");
            expect(config.getFields()).not.toContain("FirstName");
        });

        test('clearFields clears all selected fields', () => {
            const { result } = renderUseProgress();
            const config = testTestDataFieldBehavior(result);

            config.select("FirstName");
            config.select("LastName");
            config.select("Email");

            config.clear();
            expect(config.getFields()).toEqual([]);
        });

        test('isFieldSelected returns correct values', () => {
            const { result } = renderUseProgress();
            const config = testTestDataFieldBehavior(result);

            expect(config.isSelected("FirstName")).toBe(false);
            config.select("FirstName");
            expect(config.isSelected("FirstName")).toBe(true);
        });

        test('unselectField handles non-existent field gracefully', () => {
            const { result } = renderUseProgress();
            const config = testTestDataFieldBehavior(result);

            config.unselect("DoesNotExist");
            expect(config.getFields()).toEqual([]);
        });

        test('field operations with special characters and edge cases', () => {
            const { result } = renderUseProgress();
            const config = testTestDataFieldBehavior(result);

            config.select("");
            config.select("Field With Spaces");
            config.select("!@#SpecialChars123");

            expect(config.getFields()).toEqual(["", "Field With Spaces", "!@#SpecialChars123"]);
        });

        test('field list resets after setting new DE', () => {
            const { result } = renderUseProgress();
            const config = testTestDataFieldBehavior(result);

            const firstDE = { name: "DE1", externalKey: "key1", fields: [] };
            const secondDE = { name: "DE2", externalKey: "key2", fields: [] };

            act(() => result.current.setSelectedDe(firstDE));
            config.select("Email");
            config.select("FirstName");
            expect(config.getFields().length).toBe(2);

            act(() => result.current.setSelectedDe(secondDE));
            expect(config.getFields()).toEqual([]);
        });

        test('field list resets when DE is set to null', () => {
            const { result } = renderUseProgress();
            const config = testTestDataFieldBehavior(result);

            const exampleDE = { name: "DE1", externalKey: "key1", fields: [] };

            act(() => result.current.setSelectedDe(exampleDE));
            config.select("Email");
            expect(config.getFields()).toHaveLength(1);

            act(() => result.current.setSelectedDe(null));
            expect(config.getFields()).toEqual([]);
        });

        test('clearAll resets selected fields', () => {
            const { result } = renderUseProgress();
            const config = testTestDataFieldBehavior(result);

            config.select("A");
            config.select("B");
            expect(config.getFields().length).toBe(2);

            act(() => result.current.clearAll());
            expect(config.getFields()).toEqual([]);
        });
    });

    test('setSelectedDE stores DE data correctly', () => {
        const { result } = renderUseProgress();

        const exampleDE = {
            name: "Transactional_Journey_API_Entry",
            externalKey: "46F82D8F-B4AA-4BD4-8151-F751448C6608",
            sendableDeField: "SubscriberKey",
            sendableSubscriberField: "_SubscriberKey",
            fields: [
                { Name: "SubscriberKey", FieldType: "Text", MaxLength: 50, IsRequired: true },
                { Name: "eventInstanceId", FieldType: "Text", MaxLength: 50, IsRequired: true },
                { Name: "Email", FieldType: "EmailAddress", MaxLength: 254, IsRequired: false },
                { Name: "ContactKey", FieldType: "Text", MaxLength: 50, IsRequired: true },
                { Name: "Last_Name", FieldType: "Text", MaxLength: 150, IsRequired: false },
                { Name: "First_Name", FieldType: "Text", MaxLength: 150, IsRequired: false }
            ]
        };

        act(() => {
            result.current.setSelectedDe(exampleDE);
        });

        expect(result.current.selectedDe).toEqual(exampleDE);
    });

    test('clearAll resets selectedDE and both field sets', () => {
        const { result } = renderUseProgress();

        const exampleDE = { name: "Test DE", externalKey: "test-key", fields: [] };

        act(() => {
            result.current.setSelectedDe(exampleDE);
            result.current.selectVariantField("FirstName");
            result.current.selectTestDataField("Email");
        });

        expect(result.current.selectedDe).toEqual(exampleDE);
        expect(result.current.variantFields).toHaveLength(1);
        expect(result.current.testDataFields).toHaveLength(1);

        act(() => {
            result.current.clearAll();
        });

        expect(result.current.selectedDe).toBe(null);
        expect(result.current.variantFields).toEqual([]);
        expect(result.current.testDataFields).toEqual([]);
    });

    test('setMode sets the mode', () => {
        const { result } = renderUseProgress();

        act(() => {
            result.current.setMode(prev => "test")
        })

        expect(result.current.mode).toEqual("test");
    })

    test('setVarianceData sets the varianceData', () => {
        const { result } = renderUseProgress();

        act(() => {
            result.current.setVarianceData(prev => "test")
        })

        expect(result.current.varianceData).toEqual("test");
    })

    test('setTestData sets the testData', () => {
        const { result } = renderUseProgress();

        act(() => {
            result.current.setTestData(prev => "test")
        })

        expect(result.current.testData).toEqual("test");
    })

    test('clearAll resets mode to null', () => {
        const { result } = renderUseProgress();

        act(() => {
            result.current.setMode('sample');
        });

        expect(result.current.mode).toBe('sample');

        act(() => {
            result.current.clearAll();
        });

        expect(result.current.mode).toBe(null);
    });

    test('clearAll resets CSV data', () => {
        const { result } = renderUseProgress();

        act(() => {
            result.current.setVarianceData('variance,data\nval1,val2');
            result.current.setTestData('test,data\ntest1,test2');
        });

        expect(result.current.varianceData).toBe('variance,data\nval1,val2');
        expect(result.current.testData).toBe('test,data\ntest1,test2');

        act(() => {
            result.current.clearAll();
        });

        expect(result.current.varianceData).toBe('');
        expect(result.current.testData).toBe('');
    });

    test('setSelectedDE clears CSV data', () => {
        const { result } = renderUseProgress();

        const firstDE = { name: "DE1", externalKey: "key1", fields: [] };
        const secondDE = { name: "DE2", externalKey: "key2", fields: [] };

        act(() => {
            result.current.setSelectedDe(firstDE);
            result.current.setVarianceData('old data');
            result.current.setTestData('old test data');
        });

        act(() => {
            result.current.setSelectedDe(secondDE);
        });

        expect(result.current.varianceData).toBe('');
        expect(result.current.testData).toBe('');
    });


});