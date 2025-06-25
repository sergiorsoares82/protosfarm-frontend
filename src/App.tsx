import useSWR from "swr";
import "./App.css";

const apiUrl = import.meta.env.VITE_API_URL;

const fetchAPI = async (url: string) => {
  const response = await fetch(url);
  const responseBody = await response.json();
  return responseBody;
};

function App() {
  return (
    <>
      <h1>Informações do Sistema</h1>
      <div className="card">
        <UpdatedAt />
      </div>
    </>
  );
}

const UpdatedAt = () => {
  const { isLoading, data } = useSWR(`${apiUrl}/api/v1/status`, fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <>
      <div>Última atualização: {updatedAtText}</div>
    </>
  );
};

export default App;
