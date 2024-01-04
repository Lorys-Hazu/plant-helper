import { Input, Modal, Select, Typography } from "antd";
import { usePost } from "../../hooks/usePost";
import { useEffect, useState } from "react";
import { Plant } from "../../types";
import { plantStatusesOptions } from "../../data/plantStatuses";

const AddPlantModal = ({open, setOpen}: {open: boolean, setOpen: (a: boolean) => void}) => {
  const plantRequestUrl = `http://localhost:3000/users/1/plants`;
  const [plantData, setPlantData] = useState<Partial<Plant & {newStatus: string}>>({})

  const handleSelectChange = (value: string) => {
    setPlantData({...plantData, newStatus: value});
  }
  
  const {data, error, postData} = usePost();

  const addPlant = () => {
    postData(plantRequestUrl, plantData);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlantData({...plantData, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if (data) {
      setOpen(false);
    }
  }, [data, setOpen]);

  return (
  <Modal
    title="Add a plant"
    open={open}
    centered
    onOk={addPlant}
    onCancel={() => setOpen(false)}
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
      defaultValue="HEALTHY"
      onChange={handleSelectChange}
      options={plantStatusesOptions}
      style={{ width: "100%" }}
      />
    {Boolean(error) && <p>An error has occured</p>}
  </Modal>
  );
};

export default AddPlantModal;