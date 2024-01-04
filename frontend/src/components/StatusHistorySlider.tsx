import { Flex } from "antd";
import { StatusHistory } from "../types";

const StatusHistorySlider = ({ history }: ({history: StatusHistory[]})) => {

  return (
    <Flex>
      {history.map((statusUpdate) => (
        <div key={statusUpdate.id}>
          <p>{statusUpdate.newStatus.subStatus || statusUpdate.newStatus.status}</p>
          <p>{new Date(statusUpdate.changedAt).toLocaleDateString("fr")}</p>
        </div>
      ))}
    </Flex>
  );
}

export default StatusHistorySlider;