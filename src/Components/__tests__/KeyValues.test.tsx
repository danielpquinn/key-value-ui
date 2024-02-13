import { fireEvent, render } from "@testing-library/react";
import { KeyValues } from "../KeyValues";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateKeyValue } from "../../api";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useQueryClient: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock("../../api");

describe("KeyValues", () => {
  const mockMutate = jest.fn();
  const mockInvalidateQueries = jest.fn();

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      isRefetching: false,
      error: undefined,
      data: [{
        key: "testKey",
        value: "testValue",
      }],
    });
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
    const { getByText } = render(<KeyValues />);
    expect(getByText("testKey")).toBeTruthy();
    expect(getByText("testValue")).toBeTruthy();
  });

  it("deletes a key", () => {
    const { getByLabelText } = render(<KeyValues />);
    fireEvent.click(getByLabelText("Delete"))
    expect(mockMutate).toHaveBeenCalledWith("testKey");
  });
});
