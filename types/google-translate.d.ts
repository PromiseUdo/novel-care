// types/google-translate.d.ts
export {};

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages?: string;
              layout?: string | number;
              autoDisplay?: boolean;
            },
            elementId: string
          ): void;
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
    googleTranslateElementInit: () => void;
  }
}
