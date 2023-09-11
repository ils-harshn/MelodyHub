import ProviderType from "./Provider.type";
import BaseQueryProvider from "./apis";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MusicPlayerProvider } from "./hooks/MusicPlayerHooks";
import { SearchBoxProvider } from "./hooks/SearchBoxHooks";
import { TokenProvider } from "./hooks/TokenHooks";
import { getThemeFromStorage } from "./utils/helpers/themekeeper";

const Provider: React.FC<ProviderType> = ({ children }) => {
  return (
    <TokenProvider>
      <SearchBoxProvider>
        <MusicPlayerProvider>
          <BaseQueryProvider>
            <ThemeProvider currentTheme={getThemeFromStorage()}>
              {children}
            </ThemeProvider>
          </BaseQueryProvider>
        </MusicPlayerProvider>
      </SearchBoxProvider>
    </TokenProvider>
  );
};

export default Provider;
