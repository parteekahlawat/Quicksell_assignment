import React, { useEffect, useState } from "react";
import "./priority.css";
import TaskCard from "./card";
import axios from "axios";

const UserColumn = ({sort}) => {
    const [todo, setToDo] = useState([]);
    const [pending, setPending] = useState([]);
    const [cancelled, setCancelled] = useState([]);
    const [backlog, setBacklog] = useState([]);
    const [done, setDone] = useState([]);
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
                const result = response.data;
                setData(result.tickets);
            } catch (err) {
                setData(err.message);
            }
        };
        console.log("Data ", data)
        fetchData();
    }, []);
    useEffect(() => {

        if (data && data.length > 0) {
            const todoItems = data.filter(item => item.status === 'Todo');
            const pendingItems = data.filter(item => item.status === 'In progress');
            const cancelledItems = data.filter(item => item.status === 'Cancelled');
            const backlogItems = data.filter(item => item.status === 'Backlog');
            const doneItems = data.filter(item => item.status === 'Done');

            const sortFunction = (a, b) => {
                if (sort === "Title") {
                    return a.title.localeCompare(b.title); // Sort by title
                }
                if (sort === "Priority") {
                    return b.priority - a.priority; // Sort by priority (descending)
                }
                // Add more sorting conditions as needed
                return 0; // Default case if no sorting applied
            };

            // Sort each category of items
            setToDo(todoItems.sort(sortFunction));
            setPending(pendingItems.sort(sortFunction));
            setCancelled(cancelledItems.sort(sortFunction));
            setBacklog(backlogItems.sort(sortFunction));
            setDone(doneItems.sort(sortFunction));
        }

        // console.log(todo, " next ", pending)
    }, [data, sort]);
    useEffect(()=>{
        if(sort==="Priority"){
            const sortedData = data.sort((a, b) => b.priority - a.priority);
            setData(sortedData);
        }
        if( sort==="title"){
            const sortedData = [...data].sort((a, b) => (a.title > b.title ? 1 : -1));
            setData(sortedData);
        }
        console.log("sortingggg")
    }, [sort])
    return (


        <div className="user-column">
            <div className="heading">
                <div className="user-header">
                    <div className="left-side-icon">
                        <img src="./img/Backlog.svg" className="avatar" />
                        <span className="title">Backlog</span>
                        <span className="task-count">{backlog.length}</span>
                    </div>

                    <div className="right-side-icon">
                        <img src="./img/add.svg" className="title-icons" />
                        <img src="./img/3 dot menu.svg" className="title-icons" />
                    </div>
                </div>
                <div className="card-list">
                    {
                        backlog.map(item => {
                            return <TaskCard id={item.id} description={item.title} type={item.tag} priority={item.priority} prio={1}/>
                        })
                    }
                </div>

            </div>


            <div className="heading">
                <div className="user-header">
                    <div className="left-side-icon">
                        <img src="./img/To-do.svg" className="avatar" />
                        <span className="title">To Do</span>
                        <span className="task-count">{todo.length}</span>
                    </div>

                    <div className="right-side-icon">
                        <img src="./img/add.svg" className="title-icons" />
                        <img src="./img/3 dot menu.svg" className="title-icons" />
                    </div>

                </div>

                <div className="card-list">
                    {
                        todo.map(item => {
                            return <TaskCard id={item.id} description={item.title} type={item.tag} priority={item.priority} prio={1}/>
                        })
                    }
                </div>
            </div>

            <div className="heading">
                <div className="user-header">
                    <div className="left-side-icon">
                        <img src="./img/in-progress.svg" className="avatar" />
                        <span className="title">Pending</span>
                        <span className="task-count">{pending.length}</span>
                    </div>

                    <div className="right-side-icon">
                        <img src="./img/add.svg" className="title-icons" />
                        <img src="./img/3 dot menu.svg" className="title-icons" />
                    </div>

                </div>

                <div className="card-list">
                    {
                        pending.map(item => {
                            return <TaskCard id={item.id} description={item.title} type={item.tag} priority={item.priority} prio={1}/>
                        })
                    }
                </div>
            </div>

            <div className="heading">
                <div className="user-header">
                    <div className="left-side-icon">
                        <img src="./img/Done.svg" className="avatar" />
                        <span className="title">Done</span>
                        <span className="task-count">{done.length}</span>
                    </div>

                    <div className="right-side-icon">
                        <img src="./img/add.svg" className="title-icons" />
                        <img src="./img/3 dot menu.svg" className="title-icons" />
                    </div>

                </div>

                <div className="card-list">
                    {
                        done.map(item => {
                            return <TaskCard id={item.id} description={item.title} type={item.tag} priority={item.priority} prio={1}/>
                        })
                    }
                </div>
            </div>

            <div className="heading">
                <div className="user-header">
                    <div className="left-side-icon">
                        <img src="./img/Cancelled.svg" className="avatar" />
                        <span className="title">Cancelled</span>
                        <span className="task-count">{cancelled.length}</span>
                    </div>

                    <div className="right-side-icon">
                        <img src="./img/add.svg" className="title-icons" />
                        <img src="./img/3 dot menu.svg" className="title-icons" />
                    </div>

                </div>

                <div className="card-list">
                    {
                        cancelled.map(item => {
                            return <TaskCard id={item.id} description={item.title} type={item.tag} priority={item.priority} prio={1}/>
                        })
                    }
                </div>
            </div>

        </div>
    );
};

export default UserColumn;