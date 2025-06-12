import { renderHook, act, render } from '@testing-library/react'
import { useApiState } from '../hooks/useApiState'

describe('useApiState', () => {
    test('clearError should remove error from state', () => {

        const { result } = renderHook(() => useApiState());

        act(() => {
            result.current.setError('Something went wrong');
        });

        expect(result.current.error).toBe('Something went wrong');

        act(() => {
            result.current.clearError();
        });

        act(() => {
            result.current.clearError();
        });

        expect(result.current.error).toBe(null);
    });

    test('loading initial state is false', () => {
        const { result } = renderHook(() => useApiState());

        expect(result.current.loading).toBe(false);
    })

    test('error initial state is null', () => {
        const { result } = renderHook(() => useApiState());

        expect(result.current.error).toBe(null);
    })

    test('setLoading should clear errors', () => {

        const { result } = renderHook(() => useApiState());

        act(() => {
            result.current.setError('Something went wrong');
        });

        expect(result.current.error).toBe('Something went wrong');

        act(() => {
            result.current.setLoading(true);
        });

        expect(result.current.error).toBe(null);
    });

    test('setError should stop loading', () => {

        const { result } = renderHook(() => useApiState());

        act(() => {
            result.current.setLoading(true);
        });

        expect(result.current.loading).toBe(true);

        act(() => {
            result.current.setError('Something went wrong');
        });

        expect(result.current.loading).toBe(false);
    });

    test('should replace previous error with new error', () => {
        const { result } = renderHook(() => useApiState());

        act(() => {
            result.current.setError('First error');
        });

        expect(result.current.error).toBe('First error');

        act(() => {
            result.current.setError('Second error');
        });

        expect(result.current.error).toBe('Second error');
    });

    test('should handle multiple setLoading calls gracefully', () => {
        const { result } = renderHook(() => useApiState());

        act(() => {
            result.current.setLoading(true);
        });

        act(() => {
            result.current.setLoading(true);
        });

        expect(result.current.loading).toBe(true);
    });

    test('last setLoading call wins', () => {
        const { result } = renderHook(() => useApiState());

        act(() => {
            result.current.setLoading(true);
        });

        act(() => {
            result.current.setLoading(false);
        });

        expect(result.current.loading).toBe(false);
    });
})