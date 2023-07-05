import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode, updateSystemTheme } from "../../redux/slices/themeSlice";

function ThemeOptions() {
  const themeMode = useSelector((state) => state.theme.mode);
  const systemPreferenceSelected = useSelector(
    (state) => state.theme.systemPreferenceSelected
  );
  const dispatch = useDispatch();

  function handleThemeSelectionClick(event) {
    event.stopPropagation();
    const selectedTheme = event.target.getAttribute("data-value");
    if (selectedTheme === "system") {
      dispatch(updateSystemTheme());
    } else {
      dispatch(setThemeMode(selectedTheme));
    }
  }

  return (
    <div>
      <p className="py-2 px-3 text-xs text-darkerGray dark:text-darkGray">
        Theme Preferences
      </p>
      <div
        className={`py-2 px-3 flex items-center gap-1 cursor-pointer hover:bg-transparentBlack2 dark:hover:bg-transparentWhite ${
          systemPreferenceSelected ? "text-aqua" : ""
        }`}
        data-value="system"
        onClick={handleThemeSelectionClick}
      >
        System Preferences
      </div>
      <div
        className={`py-2 px-3 flex items-center gap-1 cursor-pointer hover:bg-transparentBlack2 dark:hover:bg-transparentWhite ${
          themeMode === "light" && !systemPreferenceSelected ? "text-aqua" : ""
        }`}
        data-value="light"
        onClick={handleThemeSelectionClick}
      >
        Light Mode
      </div>
      <div
        className={`py-2 px-3 flex items-center gap-1 cursor-pointer hover:bg-transparentBlack2 dark:hover:bg-transparentWhite ${
          themeMode === "dark" && !systemPreferenceSelected ? "text-aqua" : ""
        }`}
        data-value="dark"
        onClick={handleThemeSelectionClick}
      >
        Dark Mode
      </div>
    </div>
  );
}

export default ThemeOptions;
