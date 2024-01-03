import { Badge, Button, Card, Typography } from "antd";
import { Plant } from "../types";
import { CheckCircleFilled, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const PlantCard = ({ plant }: ({plant: Plant})) => {
  return (
    <Card size="small" title={`${plant.name} (${plant.species})`} extra={<Badge count={plant.tasks.length} size="small">Tasks <CheckCircleFilled /></Badge>}>
    <Card.Grid 
      style={{width: "75%", boxShadow: "none"}} 
      hoverable={false}
      >
        <Typography.Title
          level={5}
         >
          {plant.currentStatus?.status}
        </Typography.Title>
        <Typography.Text>
          {plant.currentStatus?.description}
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