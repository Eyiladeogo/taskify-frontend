import React, { useEffect, useState, useRef } from 'react';
import playIcon from './assets/play.svg';
import pauseIcon from './assets/pause.svg';
import api from './utils/api';



function Timer({ task, initialTimeSpent, onFetchTask, isPlaying, setIsPlaying }) {
    const [timeSpent, setTimeSpent] = useState(timeStringToSeconds(initialTimeSpent));
    // const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef(null);


    function timeStringToSeconds(timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }
    
    function secondsToTimeString(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // function calculateProgress(timeSpent, taskDuration) {
    //     const timeSpentInSeconds = timeStringToSeconds(timeSpent);
    //     const taskDurationInSeconds = timeStringToSeconds(taskDuration);
      
    //     if (taskDurationInSeconds === 0) {
    //       return 0; // Avoid division by zero
    //     }
      
    //     const progress = (timeSpentInSeconds / taskDurationInSeconds) * 100;
    //     return progress.toFixed(2); // Return progress as a percentage with 2 decimal places
    //   }

    // useEffect(()=>onChangePercentage(calculateProgress(task.time_spent, task.task_duration)),[percentage, isPlaying, task.time_spent, task.task_duration])

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setTimeSpent(prevTime => prevTime + 1);
            }, 1000);
        } else if (!isPlaying && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isPlaying]);

    async function handlePlay() {
        try {
            const response = await api.post(`/tasks/${task.task_id}/start`);
            if (response.status === 200) {
                setIsPlaying(true);
            } else {
                console.error('Failed to start timer');
            }
        } catch (error) {
            console.error('Error starting timer:', error);
        }
    }

    async function handlePause() {
        try {
            const response = await api.post(`/tasks/${task.task_id}/pause`);
            if (response.status === 200) {
                setIsPlaying(false);
                onFetchTask('/tasks'); // Update the task data
            } else {
                console.error('Failed to pause timer');
            }
        } catch (error) {
            console.error('Error pausing timer:', error);
        }
    }

    return (
        <div className='play-pause' style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <div>{secondsToTimeString(timeSpent)}</div>
            <span>
                <img
                    src={isPlaying ? pauseIcon : playIcon}
                    style={{ height: '20px', width: '20px' }}
                    onClick={isPlaying ? handlePause : handlePlay}
                />
            </span>
        </div>
    );
}

export default Timer;
