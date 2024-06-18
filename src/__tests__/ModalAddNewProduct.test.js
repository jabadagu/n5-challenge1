import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AddProductModal from "../components/modals/ModalAddNewProduct";
import { ThemeProvider } from "../context/ThemeContext";
import { BrowserRouter } from "react-router-dom";

describe("AddProductModal component", () => {
  const handleClose = jest.fn();
  const onAddProduct = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    global.URL.createObjectURL = jest.fn(() => "https://dummyurl.com/test.png");
  });

  test("renders modal and form elements", () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <AddProductModal
            show={true}
            handleClose={handleClose}
            onAddProduct={onAddProduct}
          />
        </BrowserRouter>
      </ThemeProvider>
    );

    const modalTitle = screen.getByText("Agregar Producto");
    expect(modalTitle).toBeInTheDocument();

    const productNameLabel = screen.getByLabelText("Nombre");
    const productAmountLabel = screen.getByLabelText("Cantidad");
    const productPriceLabel = screen.getByLabelText("Precio");
    const productImageLabel = screen.getByLabelText("Imagen");

    expect(productNameLabel).toBeInTheDocument();
    expect(productAmountLabel).toBeInTheDocument();
    expect(productPriceLabel).toBeInTheDocument();
    expect(productImageLabel).toBeInTheDocument();
  });

  test("calls handleClose and onAddProduct when form is submitted with valid data", async () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <AddProductModal
            show={true}
            handleClose={handleClose}
            onAddProduct={onAddProduct}
          />
        </BrowserRouter>
      </ThemeProvider>
    );

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Producto de prueba" },
    });
    fireEvent.change(screen.getByLabelText("Cantidad"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText("Precio"), {
      target: { value: "25.50" },
    });

    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    fireEvent.change(screen.getByLabelText("Imagen"), {
      target: { files: [file] },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Guardar" }));

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(onAddProduct).toHaveBeenCalledTimes(1);
    });
  });

  test("updates productImage state when file is selected", () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <AddProductModal
            show={true}
            handleClose={handleClose}
            onAddProduct={onAddProduct}
          />
        </BrowserRouter>
      </ThemeProvider>
    );

    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    fireEvent.change(screen.getByLabelText("Imagen"), {
      target: { files: [file] },
    });

    expect(screen.getByLabelText("Imagen").files[0]).toEqual(file);
  });
});

