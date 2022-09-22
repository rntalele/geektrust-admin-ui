import { useState,useEffect,useRef } from "react"
import Table from "./Table";
import axios from 'axios';
import Modal from "./Modal";
import Navbar from "./Navbar";
const HomePage = ()=>{

    const [data,setData] = useState();
    const [showModal,setShowModal] = useState(false);
    const [currObj,setCurrObj] = useState();
    const [filteredData,setFilteredData] = useState();

    const searchInput = useRef();

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async ()=>{
            let res = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
            setData(res.data);
            setFilteredData(res.data)
    }

    const handleSingleDelete = (id,states)=>{
        const {currPage,setCurrPage,setSelectAll} = states;
        let res = window.confirm('Are you sure you want to delete this item?');
        if(res){
            let newData = data.filter((entry)=>entry.id!==id);
            setData(newData)
            setFilteredData(newData);
            if(newData.slice(currPage*10-10,currPage*10).length === 0 && currPage > 1){
                setCurrPage(currPage-1)   
            }
            setSelectAll(false)
        }
        
    }

    const handleMultipleDelete = (idArray,states)=>{
        const {setSelectedEntryArray,currPage,setCurrPage,setSelectAll} = states;
        let res = window.confirm('Are you sure you want to delete all the selected items?');
        if(res){
            let newData = data.filter((entry)=>!idArray.includes(entry.id))
            setData(newData)
            setFilteredData(newData)
            setSelectedEntryArray(new Array(10).fill(false))
            if(newData.slice(currPage*10-10,currPage*10).length === 0 && currPage > 1){
                setCurrPage(currPage-1)
            }
            setSelectAll(false)
        }
    }

    const handleEdit = (id)=>{
        setShowModal(true)
        let obj = data.find((entry)=>entry.id===id)
        setCurrObj(obj)
    }

    const handleCancel = ()=>{
        setShowModal(false)
    }

    const handleSave = (name,email,role)=>{
        let index = data.findIndex(entry=>entry.id===currObj.id)
        data[index].name = name;
        data[index].email = email;
        data[index].role = role;
        setFilteredData([...data]);
        setShowModal(false)
    }

    const searchHandler = (e)=>{

        let searchQuery = searchInput.current.value.toLowerCase();
        
        if(searchQuery ==='') setFilteredData(data)
           
        let newData = data.filter((entry)=>{
            
            if(entry.name.toLowerCase().includes(searchQuery) || entry.email.toLowerCase().includes(searchQuery) || entry.role.toLowerCase().includes(searchQuery)){
                return true;
            }
            return false;
        })
        
        setFilteredData([...newData])
    }

    return(
    <>
        <Navbar/>
        <div className="container">
            
            <input type="text" className="form-control mt-2" placeholder="Search by name,email or role" onChange={searchHandler} ref={searchInput}></input>
            <Table data={filteredData} handleSingleDelete={handleSingleDelete} handleMultipleDelete={handleMultipleDelete} handleEdit={handleEdit}/>
            {
                showModal &&
                <Modal handleCancel={handleCancel} currObj={currObj} handleSave={handleSave}/>
            }
            
        </div>
    </>
    )
}

export default HomePage