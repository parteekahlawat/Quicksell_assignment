import React, { useEffect, useState } from "react";
import "./priority.css";
import TaskCard from "./card";
import axios from "axios";
import { VscAccount } from "react-icons/vsc";
const UserPage = ({sort}) => {
    const [usernames, setUsernames] = useState([]);
    const [data, setData] = useState([]);
    const [showData, setShowData] = useState([]);
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
                setUsernames(result.users);
            } catch (err) {
                setData(err.message);
            }
        };
        console.log("Data ", data)
        fetchData();
    }, []);
    return (


        <div className="user-column">

            {
                usernames.map(user =>{
                    const dataToShow = data.filter(allData => allData.userId === user.id).sort((a, b)=>(a.title > b.title ? 1 : -1));
                    return (
                <div className="heading">
                <div className="user-header">
                    <div className="left-side-icon">
                        <VscAccount className="profile-icon" size={25}/>
                        <span className="title">{user.name}</span>
                        <span className="task-count">{dataToShow.length}</span>
                    </div>

                    <div className="right-side-icon">
                        <img src="./img/add.svg" className="title-icons" />
                        <img src="./img/3 dot menu.svg" className="title-icons" />
                    </div>
                </div>
                <div className="card-list">
                    {
                        dataToShow.map(item => {
                            return <TaskCard id={item.id} description={item.title} type={item.tag} status={item.status} priority={item.priority} prio={1}/>
                        })
                    }
                </div>

            </div>
                    )
                })
            }
            


        </div>
    );
};

export default UserPage;