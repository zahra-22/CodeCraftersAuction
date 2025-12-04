import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { MemoryRouter } from "react-router-dom";

// Mock the axiosClient to prevent actual API calls
import { vi } from "vitest";
vi.mock("../utils/axiosClient", () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
  },
}));

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

test("renders page title", async () => {
  renderWithRouter(<Home />);
  expect(await screen.findByText(/all auction items/i)).toBeInTheDocument();
});
