import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Icon,
  Loader,
  Message,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { deleteKeyValue, fetchKeyValues } from "../api";

export function KeyValues() {
  const queryClient = useQueryClient();
  const { isPending, isRefetching, error, data } = useQuery({
    queryKey: ["keyValues"],
    queryFn: fetchKeyValues,
  });

  const { mutate, error: deleteError, isPending: deleteIsPending } = useMutation({
    mutationFn: deleteKeyValue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keyValues"] });
    },
  });

  let tableContent: React.ReactNode = null;

  if (isPending) {
    tableContent = (
      <TableRow>
        <TableCell colSpan="3">
          <Loader active inline="centered"/>
        </TableCell>
      </TableRow>
    );
  } else if (error) {
    tableContent = (
      <TableRow>
        <TableCell colSpan="3">
          <Message error>Error loading key value data: {error.message}</Message>
        </TableCell>
      </TableRow>
    );
  } else {
    const keyValues = Object.values(data);
    if (keyValues.length) {
      tableContent = keyValues.map(({ key, value }) => (
        <TableRow key={key}>
          <TableCell>{key}</TableCell>
          <TableCell>{value}</TableCell>
          <TableCell>
            <p style={{ textAlign: "right" }}>
              <Button
                aria-label="Delete"
                size="tiny"
                icon
                onClick={() => mutate(key)}
                disabled={deleteIsPending || isPending || isRefetching}
              >
                <Icon size="small" name="trash" />
              </Button>
            </p>
          </TableCell>
        </TableRow>
      ));
    } else {
      tableContent = (
        <TableRow>
          <TableCell colSpan="3">
            <Message info>No key value pairs have been set</Message>
          </TableCell>
        </TableRow>
      );
    }
  }

  return (
      <>
      {deleteError ? <Message error>{deleteError.message}</Message> : null}
      <Message attached header="Key value pairs"/>
      <Table compact attached>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Key</TableHeaderCell>
            <TableHeaderCell>Value</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>{tableContent}</TableBody>
      </Table>
      </>
  );
}
