import React, { useState, useEffect } from 'react';
import './css/taskmodal.css'

function TaskModal({ onClose, onAddTask, task, }) {
  const [taskData, setTaskData] = useState({
    taskName: '',
    taskDuration: { hours: 0, minutes: 0, seconds: 0 },
    dueDate: '',
    priority: 'Low',
  });

  useEffect(() => {
    if (task) {
        // console.log(`Task entering modal window: ${task}`);
        setTaskData({
            taskName: task.task_name,
            taskDuration: parseDuration(task.task_duration), // Assuming task.duration is a string like "1:30:0"
            dueDate: task.due_date.split('T')[0],
            priority: task.priority,
        });
    }
}, [task]);

const parseDuration = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return { hours, minutes, seconds };
};

  // const handleChange = (e) => {
  //   setTaskData({ ...taskData, [e.target.name]: e.target.value });
  // };


  const handleChange = (e) => { /*better understand this code*/
    const { name, value } = e.target;
    if (name.startsWith('duration')) {
      const [_, unit] = name.split('_');
      setTaskData((prevData) => ({
        ...prevData,
        taskDuration: {
          ...prevData.duration,
          [unit]: value
        }
      }));
    } else {
      setTaskData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };


  const handleSubmit = (e) => { /*understand this too*/
    e.preventDefault();
    const { hours=0, minutes=0, seconds=0 } = taskData.taskDuration;

    // console.log(minutes)
    const durationString = `${hours}:${minutes}:${seconds}`;
    const formattedTaskData = { ...taskData, taskDuration: durationString };
    onAddTask(formattedTaskData);
    
  };


  return (
    <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Task</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="taskName">Task Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="taskName"
                  name="taskName"
                  value={taskData.taskName}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="duration">Duration:</label>
                <div className='duration-inputs'>
                  <input
                    type="number"
                    className="form-control"
                    id="duration_hours"
                    name="duration_hours"
                    value={taskData.taskDuration.hours}
                    onChange={handleChange}
                    placeholder='H'
                    min="0"
                  />
                  <input
                    type="number"
                    className="form-control"
                    id="duration_minutes"
                    name="duration_minutes"
                    value={taskData.taskDuration.minutes}
                    onChange={handleChange}
                    placeholder='M'
                    min="0"
                    max="59"
                  />
                  <input
                    type="number"
                    className="form-control"
                    id="duration_seconds"
                    name="duration_seconds"
                    value={taskData.taskDuration.seconds}
                    onChange={handleChange}
                    placeholder='S'
                    min="0"
                    max="59"
                  />
                </div>
                
              </div>
              {/* {task?<p>Task was sent</p>:<p>Task wasnt sent</p>} */}
              <div className="form-group">
                <label htmlFor="dueDate">Due Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  name="dueDate"
                  value={taskData.dueDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority:</label>
                <select
                  className="form-control"
                  id="priority"
                  name="priority"
                  value={taskData.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
  // return (

  //   <div >
  //     <div >
  //       <span className="close" onClick={onClose}>&times;</span>
  //       <h2>Add Task</h2>
  //       <form onSubmit={handleSubmit}>
  //         <label htmlFor='taskName'>Task Name:</label>
  //         <input type="text" id='taskName' name="name" value={taskData.name} onChange={handleChange} required autoComplete='off' />
          
  //         <label htmlFor='description'>Description:</label>
  //         <textarea name="description" id='description' value={taskData.description} onChange={handleChange}></textarea>
          
  //         <label htmlFor='dueDate'>Due Date:</label>
  //         <input type="date" id='dueDate' name="dueDate" value={taskData.dueDate} onChange={handleChange} />
          
  //         <label htmlFor='priority'>Priority:</label>
  //         <select name="priority" id='priority' value={taskData.priority} onChange={handleChange}>
  //           <option value="Low">Low</option>
  //           <option value="Medium">Medium</option>
  //           <option value="High">High</option>
  //         </select>
          
  //         <button type="submit">Add Task</button>
  //       </form>
  //     </div>
  //   </div>
  // );
}

export default TaskModal;


