import { Flex } from "antd";
import { Task } from "../types";
import { useApi } from "../hooks/useApi";

const Tasks : React.FC = () => {
  const tasksUrl = 'http://localhost:3000/users/1/tasks';
  const { data: tasks, error, loading } = useApi<Task[]>(tasksUrl);

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      {loading && <p>Loading...</p>}
      {Boolean(error) && <p>An error has occurred</p>}
      {tasks?.map((task: Task) => (
        <div key={task.id}>
          <h1>{task.type}</h1>
          <p>{task.description}</p>
        </div>
      ))}
    </Flex>
  )
}

export default Tasks