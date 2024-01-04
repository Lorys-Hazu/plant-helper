import React, { useEffect } from 'react'
import { Task } from '../types'
import { Badge, Button, Card } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { usePatch } from '../hooks/usePatch';

const TaskCard = ({ task, reload }: { task: Task, reload: () => void }) => {
  const completeTaskUrl = `http://localhost:3000/tasks/${task.id}/complete`;
  const { patchData, data } = usePatch();
  
  const handleCompleteTask = async () => {
    patchData(completeTaskUrl, {});
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
        style={{width: "75%", boxShadow: "none"}} 
        hoverable={false}
        >
        <p>{task.description}</p>
      </Card.Grid>
      <Card.Grid 
        style={{width: "25%", boxShadow: "none", display: "flex", justifyContent: "center", alignItems: "center"}} 
        hoverable={false}
      >
        <Button
          type="primary"
          shape="circle"
          icon={<CheckCircleFilled />} 
          onClick={handleCompleteTask}
          disabled={task.completed}
        />
      </Card.Grid>
    </Card>
  )
}

export default TaskCard;