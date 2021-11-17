const basePostConfig: RequestInit = {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const remoteApiPostData = async (
  url = '',
  data = {},
  customConfig: RequestInit = {}
) => {
  const response = await fetch(url, {
    ...basePostConfig,
    ...customConfig,
    body: JSON.stringify(data),
  });

  return response.json();
};
