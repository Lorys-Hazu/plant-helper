import { Link, useParams } from "react-router-dom";
import { Plant } from "../types";
import { useGet } from "../hooks/useGet";
import { Button, Divider, Empty, Flex, FloatButton, Typography } from "antd";
import StatusHistorySlider from "../components/StatusHistorySlider";
import TaskCard from "../components/TaskCard";
import { EditOutlined, LeftOutlined } from "@ant-design/icons";
import EditPlantModal from "../components/modals/EditPlantModal";
import { useModal } from "../hooks/useModals";

const PlantDetails = () => {
    const { plantId } = useParams();
    const { data: plant, loading, error, refetch } = useGet<Plant>(`http://localhost:3000/plants/${plantId}`);
    const { addModal, closeModal } = useModal();

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

    const handleEditModalClose = () => {
      closeModal();
      refetch();
    }

    const handleEditModalOpen = () => {
      addModal(EditPlantModal, {open: true, closeModal: handleEditModalClose, plant});
    }

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
          <StatusHistorySlider history={plant.statusHistory} />
          <Typography.Title level={5}>Todo Tasks</Typography.Title>
          <Flex vertical>
            {currentTasks.length === 0 && <Empty description="No tasks to do" />}
            {currentTasks.map((task) => (
              <TaskCard key={task.id} task={task} reload={refetch} plant={plant}/>
            ))}
          </Flex>
          <FloatButton onClick={handleEditModalOpen} icon={<EditOutlined />} />
        </Flex>
    )
}

export default PlantDetails;