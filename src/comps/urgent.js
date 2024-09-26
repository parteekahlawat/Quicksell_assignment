import React, { useEffect, useState } from "react";
import "./priority.css";
import TaskCard from "./card";
import axios from "axios";

const Urgent = ({sort}) => {
    const [noPriority, setnoPriority] = useState([]);
    const [urgent, seturgent] = useState([]);
    const [high, sethigh] = useState([]);
    const [low, setlow] = useState([]);
    const [medium, setmedium] = useState([]);
    const [data, setData] = useState([]);
    useEffect(()=>{
        if(sort==="Priority"){
            const sortedData = [...data].sort((a, b) => b.priority - a.priority);
            setData(sortedData);
        }
        if( sort==="title"){
            const sortedData = [...data].sort((a, b) => {
                if (a.title < b.title) return -1; // a comes before b
                if (a.title > b.title) return 1;  // a comes after b
                return 0;
            });
            setData(sortedData);
        }
        console.log("sortingggg")
    }, [sort])

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
            const noPriorityItems = data.filter(item => item.priority === 0);
            const urgentItems = data.filter(item => item.priority === 4);
            const highItems = data.filter(item => item.priority === 3);
            const lowItems = data.filter(item => item.priority === 2);
            const mediumItems = data.filter(item => item.priority === 1);

            const sortFunction = (a, b) => {
                if (sort === "Title") {
                    return a.title.localeCompare(b.title); // Sort by title
                }
                if (sort === "Priority") {
                    return b.priority - a.priority; // Sort by priority (descending)
                }
                // Default case if no sorting applied
                return 0; 
            };

            // Sort each category of items
            setnoPriority(noPriorityItems.sort(sortFunction));
            seturgent(urgentItems.sort(sortFunction));
            sethigh(highItems.sort(sortFunction));
            setmedium(mediumItems.sort(sortFunction));
            setlow(lowItems.sort(sortFunction));
        }

        // console.log(noPriority, " next ", urgent)
    }, [data, sort]);
    return (


        <div className="user-column">
            <div className="heading">
                <div className="user-header">
                    <div className="left-side-icon">
                        <img src="./img/No-priority.svg" className="avatar" />
                        <span className="title">No priority</span>
                        <span className="task-count">{noPriority.length}</span>
                    </div>

                    <div className="right-side-icon">
                        <img src="./img/add.svg" className="title-icons" />
                        <img src="./img/3 dot menu.svg" className="title-icons" />
                    </div>
                </div>
                <div className="card-list">
                    {
                        noPriority.map(item => {
                            return <TaskCard id={item.id} description={item.title} type={item.tag} status={item.status} />
                        })
                    }
                </div>

            </div>


            <div className="heading">
                <div className="user-header">
                    <div className="left-side-icon">
                        <img src="./img/SVG - Urgent Priority colour.svg" className="avatar" />
                        <span className="title">Urgent</span>
                        <span className="task-count">{urgent.length}</span>
                    </div>

                    <div className="right-side-icon">
                        <img src="./img/add.svg" className="title-icons" />
                        <img src="./img/3 dot menu.svg" className="title-icons" />
                    </div>

                </div>

                <div className="card-list">
                    {
                        urgent.map(item => {
                            return <TaskCard id={item.id} description={item.title} type={item.tag} status={item.status}/>
                        })
                    }
                </div>
            </div>

            <div className="heading">
                <div className="user-header">
                    <div className="left-side-icon">
                        <img src="./img/Img - High Priority.svg" className="avatar" />
                        <span className="title">High</span>
                        <span className="task-count">{high.length}</span>
                    </div>

                    <div className="right-side-icon">
                        <img src="./img/add.svg" className="title-icons" />
                        <img src="./img/3 dot menu.svg" className="title-icons" />
                    </div>

                </div>

                <div className="card-list">
                    {
                        high.map(item => {
                            return <TaskCard id={item.id} description={item.title} type={item.tag} status={item.status}/>
                        })
                    }
                </div>
            </div>

            <div className="heading">
                <div className="user-header">
                    <div className="left-side-icon">
                        <img src="./img/Img - Medium Priority.svg" className="avatar" />
                        <span className="title">Medium</span>
                        <span className="task-count">{medium.length}</span>
                    </div>

                    <div className="right-side-icon">
                        <img src="./img/add.svg" className="title-icons" />
                        <img src="./img/3 dot menu.svg" className="title-icons" />
                    </div>

                </div>

                <div className="card-list">
                    {
                        medium.map(item => {
                            return <TaskCard id={item.id} description={item.title} type={item.tag} status={item.status}/>
                        })
                    }
                </div>
            </div>

            <div className="heading">
                <div className="user-header">
                    <div className="left-side-icon">
                        <img src="./img/Img - Low Priority.svg" className="avatar" />
                        <span className="title">Low</span>
                        <span className="task-count">{low.length}</span>
                    </div>

                    <div className="right-side-icon">
                        <img src="./img/add.svg" className="title-icons" />
                        <img src="./img/3 dot menu.svg" className="title-icons" />
                    </div>

                </div>

                <div className="card-list">
                    {
                        low.map(item => {
                            return <TaskCard id={item.id} description={item.title} type={item.tag} status={item.status}/>
                        })
                    }
                </div>
            </div>

            {/* <div className="task-list">
        </div> */}
        </div>
    );
};

export default Urgent;