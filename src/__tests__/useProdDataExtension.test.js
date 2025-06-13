import { renderHook, act, render } from '@testing-library/react'
import { useProdDataExtension, ProdDataExtensionProvider } from '../hooks/useProdDataExtension'

const renderUseProgress = () => {
    const wrapper = ({ children }) => (
        <ProdDataExtensionProvider>
            {children}
        </ProdDataExtensionProvider>
    )
    return renderHook(() => useProdDataExtension(), { wrapper });
}

test('should have initial state', () => {
    const wrapper = ({ children }) => (
        <ProdDataExtensionProvider>{children}</ProdDataExtensionProvider>
    );

    const { result } = renderHook(() => useProdDataExtension(), { wrapper });

    expect(result.current.selectedDE).toBe(null);
    expect(result.current.selectedFields).toEqual([]);
    expect(typeof result.current.selectField).toBe('function');
    expect(typeof result.current.unselectField).toBe('function');
    expect(typeof result.current.clearSelectedFields).toBe('function');
    expect(typeof result.current.setSelectedDE).toBe('function');
    expect(typeof result.current.isFieldSelected).toBe('function');
    expect(typeof result.current.clearAll).toBe('function');
});