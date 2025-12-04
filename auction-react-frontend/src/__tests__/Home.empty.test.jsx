import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import { vi } from "vitest";

vi.mock("../utils/axiosClient", () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
  },
}));

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

test("shows empty state when no items", async () => {
  renderWithRouter(<Home />);
  expect(await screen.findByText(/no auction items found/i)).toBeInTheDocument();
});
