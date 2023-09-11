import ProviderType from "./Provider.type";
import BaseQueryProvider from "./apis";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MusicPlayerProvider } from "./hooks/MusicPlayerHooks";
import { SearchBoxProvider } from "./hooks/SearchBoxHooks";
import { getThemeFromStorage } from "./utils/helpers/themekeeper";

const Provider: React.FC<ProviderType> = ({ children }) => {
  return (
    <SearchBoxProvider>
      <MusicPlayerProvider>
        <BaseQueryProvider>
          <ThemeProvider currentTheme={getThemeFromStorage()}>
            {children}
          </ThemeProvider>
        </BaseQueryProvider>
      </MusicPlayerProvider>
    </SearchBoxProvider>
  );
};

export default Provider;
