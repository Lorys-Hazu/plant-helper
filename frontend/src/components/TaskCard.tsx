import React from 'react'
import { Task } from '../types'
import { Badge, Button, Card } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

const TaskCard = ({ task }: { task: Task }) => {
  const completeTaskUrl = `http://localhost:3000/tasks/${task.id}/complete`;
  const handleCompleteTask = async () => {
    const res = await fetch(completeTaskUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        }
      });
    console.log(res);
  }
  return (
    <Card size="small" title={task.type} extra={<Badge count={new Date(task.dueDate).toLocaleDateString("fr-FR")}/>}>
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