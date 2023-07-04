import { createSlice } from "@reduxjs/toolkit";

function getInitialMode() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light") {
    return "light";
  } else if (storedTheme === "dark") {
    return "dark";
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  } else {
    return "light";
  }
}

function getSysyemPreferenceMode() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  } else {
    return "light";
  }
}

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: getInitialMode(),
    systemPreferenceSelected: localStorage.getItem("theme") ? false : true,
  },
  reducers: {
    setThemeMode: (state, action) => {
      state.mode = action.payload;
      state.systemPreferenceSelected = false;
      localStorage.setItem("theme", action.payload);
    },
    updateSystemTheme: (state) => {
      localStorage.removeItem("theme");
      state.mode = getSysyemPreferenceMode();
      state.systemPreferenceSelected = true;
    },
  },
});

export const { setThemeMode, updateSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;
