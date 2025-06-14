import Logo from "./components/common/Logo";
import AppContainer from "./components/layout/AppContainer";
import AppFooter from "./components/layout/AppFooter";
import AppHeader from "./components/layout/AppHeader";
import MainContent from "./components/layout/MainContent";
import ProgressIndicator from "./components/layout/ProgressIndicator";
import SideBar from "./components/layout/SideBar";
import SidebarSummary from "./components/layout/SidebarSummary";
import StepLayout from "./components/layout/StepLayout";

function App() {
  return (
    <AppContainer>
      <SideBar>
        <Logo />
        <ProgressIndicator />
        <SidebarSummary />
      </SideBar>
      <MainContent>
        <AppHeader />
        <StepLayout />
        <AppFooter />
      </MainContent>
    </AppContainer>
  );
}

export default App;
