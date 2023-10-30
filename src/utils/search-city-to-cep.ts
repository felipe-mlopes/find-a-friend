export async function searchCityToCep(cep: string) {
  const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
    })

  const city = data.localidade

  return city
}
