import AppTheme from "ui/themes";

type PaperThemeType = typeof AppTheme;

declare module "@emotion/react" {
  export interface Theme extends PaperThemeType {}
}
