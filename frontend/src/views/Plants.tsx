
import { Button, Empty, Flex, FloatButton, Typography } from "antd";
import PlantCard from "../components/PlantCard";
import { useGet } from "../hooks/useGet"
import { Plant } from "../types"
import { PlusCircleOutlined } from '@ant-design/icons';
import { useModal } from '../hooks/useModals';
import AddPlantModal from "../components/modals/AddPlantModal";
import Loading from "../components/Loading";

const Plants = () => {
  const plantRequestUrl = `http://localhost:3000/users/2/plants`;
  const { data: plants, loading, error, refetch } = useGet<Plant[]>(plantRequestUrl);

  const {addModal, closeModal} = useModal();

  const handleOpenModal = () => {
    addModal(AddPlantModal, {open: true, closeModal: onAddPlantModalClose})
  }

  const onAddPlantModalClose = () => {
    closeModal()
    refetch()
  }

  if (loading) {
    return <Loading />
  }

  if (plants?.length === 0 && !error && !loading) {
    return ( 
      <Flex vertical justify="center" align="center" style={{height: "100%"}}>
        <Empty 
          description={
            <Flex vertical>
              <Typography.Paragraph>You have no plant for now</Typography.Paragraph>
              <Typography.Paragraph>You can <Button type="link" style={{margin: 0, padding: 0}} onClick={handleOpenModal}>add one here</Button></Typography.Paragraph>
            </Flex>
          }
        />
      </Flex>
    );
  }

  return (
    <Flex
      vertical
      style={{ padding: '2rem' }}
      gap="middle"
    > 
      {Boolean(error) && <p>An error has occured</p>}
      {plants && plants.map((plant) => <PlantCard key={plant.id} plant={plant} />)}
      <FloatButton onClick={handleOpenModal} icon={<PlusCircleOutlined/>} />
    </Flex>
  )
}

export default Plants