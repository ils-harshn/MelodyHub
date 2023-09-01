import ProviderType from "./Provider.type";
import BaseQueryProvider from "./apis";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MusicPlayerProvider } from "./hooks/MusicPlayerHooks";
import { SearchBoxProvider } from "./hooks/SearchBoxHooks";

const Provider: React.FC<ProviderType> = ({ children }) => {
  return (
    <SearchBoxProvider>
      <MusicPlayerProvider>
        <BaseQueryProvider>
          <ThemeProvider currentTheme="dark">{children}</ThemeProvider>
        </BaseQueryProvider>
      </MusicPlayerProvider>
    </SearchBoxProvider>
  );
};

export default Provider;
