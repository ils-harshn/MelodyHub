import type { Preview } from "@storybook/react";
import "../src/index.css";
import "../src/App.css";
import { themeChanger } from "./decorators";
import { themes } from "../src/contexts/Context.types"; 

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        // The label to show for this toolbar item
        title: 'Theme',
        icon: 'circlehollow',
        // Array of plain string values or MenuItem shape (see below)
        items: themes,
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },

  decorators: [themeChanger]
};

export default preview;