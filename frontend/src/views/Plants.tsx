import PlantCard from "../components/PlantCard";
import { useApi } from "../hooks/useApi"
import { Plant } from "../types"

const Plants = () => {
  const plantRequestUrl = `http://localhost:3000/users/1/plants`;
  const { data: plants, loading, error, refetch } = useApi<Plant[]>(plantRequestUrl);

  return (
    <div> 
      <button onClick={refetch}>Refetch</button>
      {loading && <p>Loading...</p>}
      {Boolean(error) && <p>An error has occured</p>}
      {plants && plants.map((plant) => <PlantCard key={plant.id} plant={plant} />)}
    </div>
  )
}

export default Plants