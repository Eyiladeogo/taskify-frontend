import Navbar from "./Navbar"
import TaskModal from "./TaskModal"
import TaskDetail from "./TaskDetail"
import { useEffect, useState } from "react"
import './css/taskdetail.css'
import api from "./utils/api"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode';

const staticTasks = [
    {
        "task_id": 2,
        "user_id": 3,
        "task_name": "Just vibe",
        "task_progress": "in progress",
        "task_description": "Ez",
        "due_date": "2024-05-31T23:00:00.000Z",
        "priority": "low",
        "created_at": "2024-04-04T06:35:59.000Z",
        "updated_at": "2024-04-04T06:35:59.000Z"
    },

    {
        "task_id": 2,
        "user_id": 3,
        "task_name": "Just vibe",
        "due_date": "2024-05-31T23:00:00.000Z",
        "priority": "low",
        "created_at": "2024-04-04T06:35:59.000Z",
        "updated_at": "2024-04-04T06:35:59.000Z",
        "task_duration": "00:00:00",
        "time_spent": "00:00:00",
        "start_time": null
    },

    {
        "task_id": 4,
        "user_id": 3,
        "task_name": "Wash shoes and slides",
        "due_date": "2024-05-30T23:00:00.000Z",
        "priority": "medium",
        "created_at": "2024-05-24T23:34:25.000Z",
        "updated_at": "2024-05-24T23:46:33.000Z",
        "task_duration": "00:40:00",
        "time_spent": "00:02:11",
        "start_time": null
    }
]




function Tasks(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState()
    const [shouldFetchTasks, setShouldFetchTasks] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false)
    const [currentTask, setCurrentTask] = useState()

    const navigate = useNavigate()

useEffect(() => {
  // Check if token exists in local storage
  const token = localStorage.getItem('token');
  if (token) {
    // Decode the token to get expiration date
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

    // Check if token is expired
    if (decodedToken.exp < currentTime) {
      // Token is expired, clear token from local storage and redirect to sign-in page
      localStorage.removeItem('token');
      navigate('/');
    }
  } else {
    // Token doesn't exist, redirect to sign-in page
    navigate('/');
  }
}, [navigate]);


    async function fetchTasks(endpoint){
        
        try {
            const response = await api.get(endpoint);
        // const data = await response.json();
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
        
    }

    useEffect(() => {
        async function getTasks (){
            
                if (!showCompleted){
                    fetchTasks('/tasks')
                }
                else{
                    fetchTasks('/tasks/completed')
                }
                // const data = await response.json();
            
        }
    
        getTasks()
        setShouldFetchTasks(false)
    }, [shouldFetchTasks, showCompleted])


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setCurrentTask(null)
    };

    const handleAddTask = async (taskData) => {
        try {
            if (currentTask){
                await api.put(`/tasks/${currentTask.task_id}`, taskData)
            }
            else{
                await api.post('/tasks', taskData);
            }
            
            setShouldFetchTasks(true); // Trigger re-fetching tasks
            setIsModalOpen(false);
                
                
        } catch (error) {
            console.error('Error adding task:', error);
        }

        console.log(`${taskData.taskName}\n${taskData.taskDuration.hours}H, ${taskData.taskDuration.minutes}M, ${taskData.taskDuration.seconds}\n${taskData.dueDate}\n${taskData.priority}`);
        // setIsModalOpen(false);

    }

    async function handleDeleteTask(id){
        const isConfirmed = window.confirm('Are you sure you want to delete this task?');
        if (!isConfirmed) {
        // If user cancels deletion, return early
        return;
    }
        try {
            console.log(id);
            const response = await api.delete(`/tasks/${id}`)
            if (response.status === 200) {
                setShouldFetchTasks(true); // Trigger re-fetching tasks
            }
                else {
                    console.error('Failed to delete');
                    alert('Failed to delete');
                }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
        
    }

    // async function handleUpdateTask(){

    // }

    async function handleCompleteTask(id){
        try {
            const response = await api.patch(`/tasks/${id}/complete`);
            if (response.status === 200) {
                setShouldFetchTasks(true);
            } else {
                console.error('Failed to mark task as completed');
                alert('Failed to mark task as completed');
            }
        } catch (error) {
            console.error('Error marking task as completed:', error);
        }
    }


    return (
        <>
            <Navbar></Navbar>  
            
            
            {isModalOpen &&(
                    <TaskModal onClose={toggleModal} onAddTask={handleAddTask} task={currentTask}></TaskModal>
            )}
            {!showCompleted?<button className="add-task" onClick={toggleModal} style={{ transform: "translateX(65%)",bottom: "20px",zIndex: 1000} }>Add Task</button>:null}
            <div className="task-switcher">
            
                    <button className={showCompleted?'completed':'pending'} onClick={() => setShowCompleted(!showCompleted)}>
                    {showCompleted ? 'Show Pending Tasks' : 'Show Completed Tasks'}
                     </button>
                </div>
            {tasks?.length > 0 ? <>
                
            <div className="tasks-list">
            
            
                {tasks.map((task)=><TaskDetail key={task.task_id} task={task} onDelete={handleDeleteTask} onEdit={toggleModal} onComplete={handleCompleteTask} onFetchTask={fetchTasks} setCurrentTask={setCurrentTask} showCompleted={showCompleted}/> )}
            </div>
            </>: <p style={{fontSize:"3.5em", textAlign:"center",color:"#ff6347", marginTop:"20%"}}>Add a New Task</p>}
            
        </>
    )
}

export default Tasks