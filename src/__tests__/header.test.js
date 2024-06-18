import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import Header from "../sections/header";

describe("Header component", () => {
  test("renders Header component correctly", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByAltText("logo ed")).toBeInTheDocument();
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Productos")).toBeInTheDocument();
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
  });

  test("toggles theme correctly", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>
    );

    const toggleButton = screen.getByText("Dark Mode");
    fireEvent.click(toggleButton);

    expect(screen.getByText("Light Mode")).toBeInTheDocument();
  });

  test("navigation links work correctly", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>
    );

    const homeLink = screen.getByRole("link", { name: /Inicio/i });
    const productsLink = screen.getByRole("link", { name: /Productos/i });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(productsLink).toHaveAttribute("href", "/products");
  });
});


