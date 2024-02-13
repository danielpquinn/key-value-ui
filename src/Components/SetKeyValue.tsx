import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Form, FormGroup, FormInput, Message } from "semantic-ui-react";
import { updateKeyValue } from "../api";

export function SetKeyValue() {
  const queryClient = useQueryClient();
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateKeyValue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keyValues"] });
    },
  });

  return (
    <>
      <Message attached header="Edit key value pairs" />
      <Form
        className="attached fluid segment"
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ key, value });
        }}
        error={!!error}
      >
        <FormGroup widths="equal">
          <FormInput
            disabled={isPending}
            required
            fluid
            placeholder="key"
            value={key}
            label="Key"
            onChange={(e) => setKey(e.target.value)}
          />
          <FormInput
            disabled={isPending}
            required
            fluid
            placeholder="value"
            value={value}
            label="Value"
            onChange={(e) => setValue(e.target.value)}
          />
        </FormGroup>
        {error ? <Message error>{error.message}</Message> : null}
        <Button disabled={isPending} type="submit">Set key and value</Button>
      </Form>
    </>
  );
}
