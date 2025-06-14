import { renderHook, act, render } from "@testing-library/react";
import { STEPS_ARRAY } from "../constants/constants";
import { useProgress, ProgressProvider } from "../hooks/useProgress";

const renderUseProgress = () => {
  const wrapper = ({ children }) => (
    <ProgressProvider>{children}</ProgressProvider>
  );
  return renderHook(() => useProgress(), { wrapper });
};

describe("useProgress", () => {
  test("initial state", () => {
    const { result } = renderUseProgress();

    expect(result.current.currentStep).toBe(1);
    expect(result.current.maxSteps).toBe(STEPS_ARRAY.length);
    expect(result.current.canProceedToNextStep).toBe(false);
  });

  test("setCanProceedToNextStep updates to true", () => {
    const { result } = renderUseProgress();

    act(() => {
      result.current.setCanProceedToNextStep(true);
    });

    expect(result.current.canProceedToNextStep).toBe(true);
  });

  test("nextStep increments currentStep from 1 to 2", () => {
    const { result } = renderUseProgress();

    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(2);
  });

  test("nextStep doesnt increment beyond max step", () => {
    const { result } = renderUseProgress();

    expect(result.current.currentStep).toBe(1);

    act(() => {
      for (let i = 1; i < result.current.maxSteps; i++) {
        result.current.nextStep();
      }
    });

    expect(result.current.currentStep).toBe(result.current.maxSteps);

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(result.current.maxSteps);
  });

  test("previousStep decrements currentStep from 4 to 3", () => {
    const { result } = renderUseProgress();

    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.nextStep();
      result.current.nextStep();
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(4);

    act(() => {
      result.current.previousStep();
    });

    expect(result.current.currentStep).toBe(3);
  });

  test("previousStep doesnt decrement currentStep when current step is = 1", () => {
    const { result } = renderUseProgress();

    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.previousStep();
    });

    expect(result.current.currentStep).toBe(1);
  });

  test("goToStep goes to specified step", () => {
    const { result } = renderUseProgress();

    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.nextStep();
      result.current.nextStep();
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(4);

    act(() => {
      result.current.goToStep(2);
    });

    expect(result.current.currentStep).toBe(2);
  });

  test("goToStep cannot go forward a step", () => {
    const { result } = renderUseProgress();

    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.goToStep(2);
    });

    expect(result.current.currentStep).toBe(1);
  });

  test("goToStep cannot go below 0", () => {
    const { result } = renderUseProgress();

    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.goToStep(-1);
    });

    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.goToStep(0);
    });

    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.goToStep(-999);
    });

    expect(result.current.currentStep).toBe(1);
  });

  test("goToStep only accepts integers", () => {
    const { result } = renderUseProgress();

    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.goToStep(2.5);
    });

    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.goToStep("testing testing");
    });

    expect(result.current.currentStep).toBe(1);
  });
});
