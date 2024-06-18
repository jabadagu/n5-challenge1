import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

const TestComponent = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div>
      <span data-testid="theme">{isDarkMode ? "dark" : "light"}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe("ThemeContext", () => {
  afterEach(() => {
    localStorage.clear();
  });

  test("should initialize with light mode by default", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme").textContent).toBe("light");
  });

  test("should toggle theme from light to dark", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText("Toggle Theme"));
    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });

  test("should persist theme state in localStorage", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText("Toggle Theme"));
    expect(localStorage.getItem("isDarkMode")).toBe("true");
  });

  test("should initialize with dark mode if saved in localStorage", () => {
    localStorage.setItem("isDarkMode", JSON.stringify(true));
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });
});
