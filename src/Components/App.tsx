import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SetKeyValue } from "./SetKeyValue";
import { KeyValues } from "./KeyValues";
import { Container, Divider } from "semantic-ui-react";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container text textAlign="center">
        <h1 style={{ margin: "30px 0 30px" }}>Key value pairs</h1>
      </Container>
      <Container text>
        <SetKeyValue />
      </Container>
      <Container text>
        <Divider />
      </Container>
      <Container text>
        <KeyValues />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
