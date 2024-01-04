import React, { useEffect, useMemo } from 'react'
import { Plant, Task } from '../types'
import { Badge, Button, Card, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { usePatch } from '../hooks/usePatch';
import EditPlantModal from './modals/EditPlantModal';
import { useModal } from '../hooks/useModals';
import { Link } from 'react-router-dom';

const TaskCard = ({ task, reload, plant }: { task: Task, reload: () => void, plant?: Plant }) => {
  const completeTaskUrl = `http://localhost:3000/tasks/${task.id}/complete`;
  const { patchData, data } = usePatch();
  const { addModal, closeModal } = useModal();

  const shouldAskForUpdate = useMemo(() => {
    if (!plant) {
      return false;
    }

    const lastStatus = plant?.statusHistory.sort((a,b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime())[0];
    const lastStatusDate = lastStatus.changedAt;
    const today = new Date();
    const lastStatusDatePlusThreeDays = new Date(lastStatusDate).setDate(new Date(lastStatusDate).getDate() + 3);

    return new Date(lastStatusDatePlusThreeDays).getTime() < today.getTime();
  }, [plant]);

  const handleCompleteTask = async () => {
    patchData(completeTaskUrl, {});
    if (shouldAskForUpdate) {
      addModal(EditPlantModal, {open: true, closeModal: closeModal, plant: plant})
    }
  }

  const getBadgeColor = (dueDate: Date, isCompleted: boolean) => {
    if (isCompleted) {
      return "grey";
    }
    const today = new Date();
    const due = new Date(dueDate);
    if (due < today) {
      return "red";
    } else if (due < new Date(today.setDate(today.getDate() + 7))) {
      return "orange";
    } else {
      return "green";
    }
  }

  useEffect(() => {
    if (data) {
      reload();
    }
  }, [data, reload]);

  return (
    <Card 
      size="small" 
      title={task.type} 
      extra={
        <Badge 
          count={new Date(task.dueDate).toLocaleDateString("fr-FR")}
          color={getBadgeColor(task.dueDate, task.completed)}
        />
      }>
      <Card.Grid 
        style={{width: plant ? "33%" : "66%", boxShadow: "none"}} 
        hoverable={false}
        >
        <p>{task.description}</p>
      </Card.Grid>
      {plant && <Card.Grid 
        style={{width: "33%", boxShadow: "none", display: "flex", justifyContent: "center", textAlign: "center"}} 
        hoverable={false}
        >
        <Link to={`/plants/${plant.id}`}>
          <Typography.Title level={5}>{plant.name}</Typography.Title>
          <Button type="text">Go to plant details</Button>
        </Link>
      </Card.Grid>}
      <Card.Grid 
        style={{width: "33%", boxShadow: "none", display: "flex", justifyContent: "center", alignItems: "center"}} 
        hoverable={false}
      >
        <Button
          type="default"
          shape="circle"
          icon={<CheckOutlined />} 
          onClick={handleCompleteTask}
          disabled={task.completed}
        />
      </Card.Grid>
    </Card>
  )
}

export default TaskCard;