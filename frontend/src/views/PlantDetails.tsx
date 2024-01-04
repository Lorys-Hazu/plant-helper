import { Link, useParams } from "react-router-dom";
import { Plant } from "../types";
import { useGet } from "../hooks/useGet";
import { Button, Divider, Empty, Flex, Typography } from "antd";
import TaskCard from "../components/TaskCard";
import { LeftOutlined } from "@ant-design/icons";

const PlantDetails = () => {
    const { plantId } = useParams();
    const { data: plant, loading, error, refetch } = useGet<Plant>(`http://localhost:3000/plants/${plantId}`);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>An error has occured</p>
    }

    if (!plant) {
        return <p>Plant not found</p>
    }

    const currentTasks = plant.tasks.filter((task) => !task.completed);

    return (
      <Flex vertical style={{marginTop: "8px"}}>
          <Link to="/plants">
            <Button type="text">
              <LeftOutlined /> Go Back
            </Button>
            </Link>
          <Typography.Title level={2}>{plant.name}</Typography.Title>
          <Typography.Text>Specie: {plant.species}</Typography.Text>
          <Divider orientation="left">
            <Typography.Title level={4}>Current Status: {plant.currentStatus.subStatus || plant.currentStatus.status}</Typography.Title>
          </Divider>
          <Typography.Title level={5}>History</Typography.Title>
          {/* HISTORY SLIDER */}
          <Typography.Title level={5}>Todo Tasks</Typography.Title>
          <Flex vertical>
            {currentTasks.length === 0 && <Empty description="No tasks to do" />}
            {currentTasks.map((task) => (
              <TaskCard key={task.id} task={task} reload={refetch}/>
            ))}
          </Flex>

        </Flex>
    )
}

export default PlantDetails;