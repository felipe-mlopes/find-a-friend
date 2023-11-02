interface CepResponse {
  localidade: string
}

export async function searchCityToCep(cep: string): Promise<string> {
  const data: CepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json())
    .catch((err) => console.error(err.message))

  return data.localidade
}
