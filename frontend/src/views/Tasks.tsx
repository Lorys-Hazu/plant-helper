import { Flex } from "antd";
import { Task } from "../types";
import { useApi } from "../hooks/useApi";
import TaskCard from "../components/TaskCard";

const Tasks : React.FC = () => {
  const tasksUrl = 'http://localhost:3000/users/1/tasks';
  const { data: tasks, error, loading } = useApi<Task[]>(tasksUrl);

  return (
    <Flex
      vertical
      style={{ padding: '2rem' }}
      gap="middle"
    >
      {Boolean(error) && <p>An error has occurred</p>}
      {loading && <p>Loading...</p>}
      {tasks?.map((task: Task) => <TaskCard task={task} />)}
    </Flex>
  )
}

export default Tasks