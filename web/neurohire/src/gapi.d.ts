export {};

declare global {
  interface Window {
    gapi: any;
  }
}

export {};

declare global {
  interface Window {
    google: typeof google;
  }

  // You can also define the `google` namespace here if needed
  namespace google {
    namespace accounts.id {
      interface PromptMomentNotification {
        isDisplayMoment(): boolean;
        isNotDisplayed(): boolean;
        getNotDisplayedReason(): string;
        isSkippedMoment(): boolean;
        getSkippedReason(): string;
        isDismissedMoment(): boolean;
        getDismissedReason(): string;
      }

      function initialize(config: { client_id: string; callback: (response: any) => void }): void;

      function renderButton(
        parent: HTMLElement,
        options: {
          theme: "outline" | "filled_blue" | "filled_black";
          size: "small" | "medium" | "large";
        }
      ): void;

      function prompt(callback?: (notification: PromptMomentNotification) => void): void;
    }

    namespace accounts.oauth2 {
      function initTokenClient(config: {
        client_id: string;
        scope: string;
        callback: (response: { access_token: string }) => void;
      }): {
        requestAccessToken: () => void;
      };
    }
  }
}
