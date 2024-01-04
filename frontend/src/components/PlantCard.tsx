import { Badge, Button, Card, Typography } from "antd";
import { Plant } from "../types";
import { CheckCircleFilled, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getStatusIcon } from "../data/plantStatuses";

const PlantCard = ({ plant }: ({plant: Plant})) => {
  const currentTasks = plant.tasks.filter((task) => !task.completed);
  return (
    <Card size="small" title={`${plant.name} (${plant.species})`} extra={<Badge count={currentTasks.length} size="small">Tasks <CheckCircleFilled /></Badge>}>
    <Card.Grid
      style={{width: "15%", boxShadow: "none", display: "flex", justifyContent: "center", alignItems: "center"}} 
      hoverable={false}
    >
      {getStatusIcon(plant.currentStatus?.status)}
    </Card.Grid>
    <Card.Grid 
      style={{width: "60%", boxShadow: "none"}} 
      hoverable={false}
      >
        <Typography.Title
          level={5}
         >
          {plant.currentStatus?.status}
        </Typography.Title>
        <Typography.Text>
          {plant.currentStatus?.subStatus}
        </Typography.Text>
    </Card.Grid>
    <Card.Grid 
      style={{width: "25%", boxShadow: "none", display: "flex", justifyContent: "center", alignItems: "center"}} 
      hoverable={false}
    >
      <Link to={`/plants/${plant.id}`}>
        <Button
          type="primary"
          shape="circle"
          icon={<RightOutlined />} 
        />
      </Link>
    </Card.Grid>
  </Card>
  )
}

export default PlantCard;