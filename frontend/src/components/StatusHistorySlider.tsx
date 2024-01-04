import { Flex } from "antd";
import { StatusHistory } from "../types";
import {Steps} from "antd";
import { getStatusIcon } from "../data/plantStatuses";

const StatusHistorySlider = ({ history }: ({history: StatusHistory[]})) => {
  const items = history
    .sort((a,b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime())
    .map((statusUpdate) => {
      return {
        title: statusUpdate.newStatus.subStatus || statusUpdate.newStatus.status,
        description: new Date(statusUpdate.changedAt).toLocaleDateString(),
        icon: getStatusIcon(statusUpdate.newStatus.status)
      }
    });

  return (
    <Flex style={{maxHeight: "200px", overflowX: "auto"}}>
      <Steps
        direction="vertical"
        current={0}
        items={items}
        size="small"
        />
    </Flex>
  );
}

export default StatusHistorySlider;