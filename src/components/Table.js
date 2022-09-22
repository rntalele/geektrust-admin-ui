import {useEffect, useState} from 'react';
import Pagination from './Pagination';

const Table = ({data,handleSingleDelete,handleMultipleDelete,handleEdit})=>{
    
    const [currPage,setCurrPage] = useState(1);
    const [range,setRange] = useState([currPage*10-10,currPage*10]);
    const [selectAll,setSelectAll] = useState(false);
    const [selectedEntryArray,setSelectedEntryArray] = useState(new Array(10).fill(false));
    const [selectedIdArray,setSelectedIdArray] = useState([]);

    useEffect(()=>{

        setRange([currPage*10-10,currPage*10])
        
        if(selectAll){
            setSelectedEntryArray(new Array(10).fill(true))

            let arr = data.slice(range[0],range[1]).map((entry)=>entry.id)
            setSelectedIdArray(arr);
            console.log(arr)
        }
        else{
            if(selectedEntryArray.includes(true)){
                console.log(selectedEntryArray)
                setSelectedEntryArray(new Array(10).fill(false))
                setSelectedIdArray([])
            }
            
        }
    },[selectAll,data])

    const onCheckHandler = (entryNumber,id)=>{
        let newArray = selectedEntryArray.map((value,index)=>{
            return entryNumber===index ? !value : value
        })
        setSelectAll(false)
        setSelectedEntryArray(newArray)
        if(selectedIdArray.indexOf(id) > -1){
            setSelectedIdArray(selectedIdArray.filter((value)=>id!==value));
        }
        else{
            setSelectedIdArray([...selectedIdArray,id])
        }
    }

    const onSelectAll = ()=>{
        setSelectAll(!selectAll)  
        
    }

   

    const getTotalNumberOfPages = ()=>{
        if(data) return Math.ceil((data.length)/10);
    }

    const pageClickHandler = (pageNumber)=>{
        setRange([pageNumber*10-10,pageNumber*10]);
        setCurrPage(pageNumber)
        setSelectedEntryArray(new Array(10).fill(false))
        setSelectAll(false);
        setSelectedIdArray([]);
    }

    const previousPageHandler = ()=>{
        if(currPage-1 > 0){
            setRange([range[0]-10,range[1]-10])
            setCurrPage(currPage-1)
            setSelectedEntryArray(new Array(10).fill(false))
            setSelectAll(false);
        } 
    }

    const nextPageHandler = ()=>{
        
        if(currPage+1 <= getTotalNumberOfPages()){
            setRange([range[0]+10,range[1]+10])
            setCurrPage(currPage+1)
            setSelectedEntryArray(new Array(10).fill(false))
            setSelectAll(false);
        } 
    }
    
    const firstPageHandler = ()=>{
        setRange([0,10]);
        setCurrPage(1);
        setSelectedEntryArray(new Array(10).fill(false))
        setSelectAll(false);
    }

    const lastPageHandler = ()=>{
        let lastPage = getTotalNumberOfPages();
        setRange([lastPage*10-10,lastPage*10])
        setCurrPage(lastPage)
        setSelectedEntryArray(new Array(10).fill(false))
        setSelectAll(false);

    }

    
  
    
    return(
        <>
        <table className="table mt-2">
             <thead>
                <tr>
                <th scope='col'>
                    <input key={Math.random()} className="form-check-input" type="checkbox" defaultChecked={selectAll} onChange={onSelectAll}/>
                </th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data.slice(range[0],range[1]).map((entry,index)=>{
                        
                        return(
                            <tr key={entry.id} style={{background:selectedEntryArray[index] ? 'lightgray':''}}>
                                <td>
                                    <input 
                                        key={Math.random()}
                                        className="form-check-input" 
                                        type="checkbox" 
                                        defaultChecked={selectedEntryArray[index]}
                                        onChange={()=>onCheckHandler(index,entry.id)}
                                        />
                                </td>
                                <td>{entry.name}</td>
                                <td>{entry.email}</td>
                                <td>{entry.role}</td>
                                <td>
                                    <i className="bi bi-pencil-square" style={{cursor:'pointer'}} onClick={()=>handleEdit(entry.id)}></i>
                                    <i className="bi bi-archive px-3" style={{color:'red',cursor:'pointer'}} onClick={()=>handleSingleDelete(entry.id,{currPage,setCurrPage,setSelectAll})}></i>
                                </td>
                            </tr>
                        )
                        
                    })
                }
            </tbody>
        </table>
        <div className='d-flex'>
            <button 
                type="button" 
                className="btn btn-danger" 
                onClick={()=>handleMultipleDelete(selectedIdArray,{setSelectedEntryArray,currPage,setCurrPage,setSelectAll})}
                >
                    Delete Selected
            </button>
            <Pagination 
                numberOfPages={data ? getTotalNumberOfPages() :0} 
                pageClickHanlder={pageClickHandler} 
                previousPageHandler={previousPageHandler}
                nextPageHandler={nextPageHandler}
                firstPageHandler={firstPageHandler}
                lastPageHandler={lastPageHandler}
                currPage={currPage}
                togglePreviousButtons={currPage===1? true:false}
                toggleNextButtons={currPage===getTotalNumberOfPages() ? true :false}
                />
        </div>
        </>
    )
}

export default Table;