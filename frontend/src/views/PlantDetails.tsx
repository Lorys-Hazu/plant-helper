import { useParams } from "react-router-dom";
import { Plant } from "../types";
import { useApi } from "../hooks/useApi";

const PlantDetails = () => {
    const { plantId } = useParams();
    const { data: plant, loading, error } = useApi<Plant>(`http://localhost:3000/plants/${plantId}`);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {Boolean(error) && <p>An error has occured</p>}
            {plant && <p>{plant.name}</p>}
        </div>
    )
}

export default PlantDetails;