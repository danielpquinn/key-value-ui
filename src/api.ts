const apiEndpoint = "http://localhost:8080";

export interface IKeyValue {
  key: string;
  value: string;
}

export interface IKeyValues {
  [key: string]: IKeyValue;
}

const defaultRequestSettings = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchKeyValues = async () => {
  const response = await fetch(`${apiEndpoint}/key-values`, defaultRequestSettings);
  return response.json() as Promise<IKeyValues>;
};

export const updateKeyValue = async (keyValue: IKeyValue) => {
  const response = await fetch(`${apiEndpoint}/key-values`, {
    ...defaultRequestSettings,
    method: "POST",
    body: JSON.stringify(keyValue),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.statusText}: ${text}`);
  }
}

export const deleteKeyValue = async (key: string) => fetch(`${apiEndpoint}/key-values/${key}`, {
  ...defaultRequestSettings,
  method: "DELETE",
});
