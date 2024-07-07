import { useAuth } from '../App';

interface Headers {
  [key: string]: string;
}

interface ApiParams {
  params: string;
  headers?: Headers;
  body?: any;
}

const useApi = () => {
  const { accessToken, refreshAccessToken } = useAuth();

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
          Authorization: `Bearer ${accessToken}`,
          ...headers,
        },
        body,
      });

      if (!response.ok) {
        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          const retryResponse = await fetch(`/api${params}`, {
            credentials: 'include',
            method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newAccessToken}`,
              ...headers,
            },
            body: JSON.stringify(body),
          });

          if (!retryResponse.ok) {
            throw new Error(`HTTP Error Status ${retryResponse.status}`);
          }

          const retryData = await retryResponse.json();
          return retryData;
        } else {
          throw new Error(`HTTP Error Status ${response.status}`);
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    get: ({ params, headers }: ApiParams) =>
      callApi('GET', { params, headers }),
    post: ({ params, headers, body }: ApiParams) =>
      callApi('POST', { params, headers, body }),
    put: ({ params, headers, body }: ApiParams) =>
      callApi('PUT', { params, headers, body }),
    del: ({ params, headers }: ApiParams) =>
      callApi('DELETE', { params, headers }),
  };
};

export default useApi;
