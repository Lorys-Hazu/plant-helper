import { Empty, Flex } from "antd";
import { Task } from "../types";
import { useGet } from "../hooks/useGet";
import TaskCard from "../components/TaskCard";

const Tasks : React.FC = () => {
  const tasksUrl = 'http://localhost:3000/users/1/tasks';
  const { data: tasks, error, loading, refetch } = useGet<Task[]>(tasksUrl);

  if (loading) {
    return <p>Loading...</p>
  }

  if (!tasks) {
    return <Empty description="No tasks to do" />
  }

  return (
    <Flex
      vertical
      style={{ padding: '2rem' }}
      gap="middle"
    >
      {Boolean(error) && <p>An error has occurred</p>}
      {loading && <p>Loading...</p>}
      {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} reload={refetch}/>)}
    </Flex>
  )
}

export default Tasks