import { Empty, Flex } from "antd";
import { Task } from "../types";
import { useGet } from "../hooks/useGet";
import TaskCard from "../components/TaskCard";
import { useMemo } from "react";
import Loading from "../components/Loading";

const Tasks : React.FC = () => {
  const tasksUrl = 'http://localhost:3000/users/2/tasks?completed=false';
  const { data: tasks, error, loading, refetch } = useGet<Task[]>(tasksUrl);

  const ordererTasks: Task[] = useMemo(() => tasks?.sort(
    (a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  ) || [], [tasks]);

  if (loading) {
    return <Loading />
  }

  if (tasks?.length === 0) {
    return <Flex vertical justify="center" align="center" style={{height: "100%"}}><Empty description="No tasks to do" /></Flex>
  }

  return (
    <Flex
      vertical
      style={{ padding: '2rem' }}
      gap="middle"
    >
      {Boolean(error) && <p>An error has occurred</p>}
      {ordererTasks
        .map((task: Task) => <TaskCard key={task.id} task={task} reload={refetch} plant={task.plant} />)
      }
    </Flex>
  )
}

export default Tasks