import { render, fireEvent } from "@testing-library/react";
import { SetKeyValue } from "../SetKeyValue";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateKeyValue } from "../../api";

jest.mock("@tanstack/react-query", () => ({
  useQueryClient: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock("../../api");

describe("SetKeyValue", () => {
  const mockMutate = jest.fn();
  const mockInvalidateQueries = jest.fn();

  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
    });
    (useQueryClient as jest.Mock).mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
    });
    (updateKeyValue as jest.Mock).mockResolvedValue({});
  });

  it("renders without crashing", () => {
    render(<SetKeyValue />);
  });

  it("sets key and value inputs", () => {
    const { getByPlaceholderText } = render(<SetKeyValue />);

    const keyInput = getByPlaceholderText("key") as HTMLInputElement;
    const valueInput = getByPlaceholderText("value") as HTMLInputElement;

    fireEvent.change(keyInput, { target: { value: "testKey" } });
    fireEvent.change(valueInput, { target: { value: "testValue" } });

    expect(keyInput.value).toEqual("testKey");
    expect(valueInput.value).toEqual("testValue");
  });

  it("submits the form with correct values", async () => {
    const { getByPlaceholderText, getByText } = render(<SetKeyValue />);

    const keyInput = getByPlaceholderText("key") as HTMLInputElement;
    const valueInput = getByPlaceholderText("value") as HTMLInputElement;

    fireEvent.change(keyInput, { target: { value: "testKey" } });
    fireEvent.change(valueInput, { target: { value: "testValue" } });
    fireEvent.click(getByText("Set key and value"));

    expect(mockMutate).toHaveBeenCalledWith({
      key: "testKey",
      value: "testValue",
    });
  });

  it("shows error message when API call fails", async () => {
    const errorMessage = "Something went wrong";
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: { message: errorMessage },
    });
    const { getByText } = render(<SetKeyValue />);

    fireEvent.click(getByText("Set key and value"));

    expect(getByText(errorMessage)).toBeTruthy();
  });
});
