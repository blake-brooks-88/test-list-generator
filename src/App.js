import AppContainer from "./components/layout/AppContainer";
import AppHeader from "./components/layout/AppHeader";
import ProgressIndicator from "./components/layout/ProgressIndicator";
import StepLayout from "./components/layout/StepLayout";
import { ProgressProvider } from "./hooks/useProgress";

function App() {
  return (
    <AppContainer>
      <AppHeader
        headerText="Test Data Generator"
        subheaderText="A powerful tool to create comprehensive test data for your Marketing Cloud Engagement campaigns."
      />
      <ProgressProvider>
        <ProgressIndicator />
        <StepLayout />
      </ProgressProvider>
    </AppContainer>
  );
}

export default App;