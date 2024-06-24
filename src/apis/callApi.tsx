interface Headers {
  [key: string]: string;
}

interface ApiParams {
  params: string;
  headers?: Headers;
  body?: any;
}

const callApi = async (
  method: string,
  { params, headers, body }: ApiParams
) => {
  try {
    const response = await fetch(`/api${params}`, {
      credentials: 'include',
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error Status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const get = ({ params, headers }: ApiParams) =>
  callApi('GET', { params, headers });

export const post = ({ params, headers, body }: ApiParams) =>
  callApi('POST', { params, headers, body });

export const put = ({ params, headers, body }: ApiParams) =>
  callApi('PUT', { params, headers, body });

export const del = ({ params, headers }: ApiParams) =>
  callApi('DELETE', { params, headers });
