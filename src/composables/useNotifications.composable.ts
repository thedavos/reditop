import Vue from "vue";

export function useNotifications() {
  const showSuccess = (title: string, text: string) => {
    Vue.notify({
      title,
      text,
      group: "success",
    });
  };

  const showError = (title: string, text: string) => {
    Vue.notify({
      title,
      text,
      group: "error",
    });
  };

  const showInfo = (title: string, text: string) => {
    Vue.notify({
      title,
      text,
      group: "info",
    });
  };

  const showWarning = (title: string, text: string) => {
    Vue.notify({
      title,
      text,
      group: "warn",
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
}
