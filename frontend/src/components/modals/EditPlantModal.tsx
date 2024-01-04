import { Input, Modal, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { Plant } from "../../types";
import { plantStatusesOptions } from "../../data/plantStatuses";
import { usePatch } from "../../hooks/usePatch";

type EditPlantModalProps = {
  open: boolean, 
  closeModal: () => void, 
  plant: Plant, 
}

const EditPlantModal = ({open, closeModal, plant}: EditPlantModalProps) => {
  const patchPlantUrl = `http://localhost:3000/plants/${plant.id}`;
  const [plantData, setPlantData] = useState<Plant & {newStatus: string}>({...plant, newStatus: plant.currentStatus.status})

  const handleSelectChange = (value: string) => {
    setPlantData({...plantData, newStatus: value});
  }
  
  const {data, error, patchData} = usePatch();

  const editPlant = () => {
    patchData(patchPlantUrl, plantData);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlantData({...plantData, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if (data) {
      closeModal();
    }
  }, [data, closeModal]);

  return (
  <Modal
    title="Change plant details"
    open={open}
    centered
    onOk={editPlant}
    onCancel={closeModal}
    okText="Add"
  >
    <Typography.Text>Fill the form below to add a plant</Typography.Text>
    <br/>
    <br/>
    <Typography.Text>Name</Typography.Text>
    <Input placeholder="Plant Name" onChange={handleChange} name="name" value={plantData.name}/>
    <Typography.Text>Species</Typography.Text>
    <Input placeholder="Plant Species" onChange={handleChange} name="species" value={plantData.species}/>
    <Typography.Text>Status</Typography.Text>
    <Select
      value={plantData.newStatus}
      onChange={handleSelectChange}
      options={plantStatusesOptions}
      style={{ width: "100%" }}
      />
    {Boolean(error) && <p>An error has occured</p>}
  </Modal>
  );
};

export default EditPlantModal;