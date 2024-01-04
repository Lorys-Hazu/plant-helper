import React, {useState} from 'react'
import { Button, Empty, Flex, FloatButton, Typography } from "antd";
import PlantCard from "../components/PlantCard";
import AddPlantModal from "../components/modals/AddPlantModal";
import { useGet } from "../hooks/useGet"
import { Plant } from "../types"
import { PlusCircleOutlined } from '@ant-design/icons';

const Plants = () => {
  const plantRequestUrl = `http://localhost:3000/users/1/plants`;
  const { data: plants, loading, error } = useGet<Plant[]>(plantRequestUrl);

  const [isAddPlantModalOpen, setIsAddPlantModalOpen] = useState(false);

  if (loading) {
    return <p>Loading...</p>
  }

  if (!plants) {
    return ( 
      <>
        <Empty 
          description={
            <Flex vertical>
              <Typography.Paragraph>You have no plant for now</Typography.Paragraph>
              <Typography.Paragraph>You can <Button type="link" style={{margin: 0, padding: 0}} onClick={() => setIsAddPlantModalOpen(true)}>add one here</Button></Typography.Paragraph>
            </Flex>
          }
        />
        <AddPlantModal open={isAddPlantModalOpen} setOpen={setIsAddPlantModalOpen} />
      </>
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
      <FloatButton onClick={() => setIsAddPlantModalOpen(true)} icon={<PlusCircleOutlined/>} />
      <AddPlantModal open={isAddPlantModalOpen} setOpen={setIsAddPlantModalOpen} />
    </Flex>
  )
}

export default Plants