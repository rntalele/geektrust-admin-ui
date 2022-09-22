

const Pagination = ({numberOfPages,pageClickHanlder,previousPageHandler,nextPageHandler,firstPageHandler,lastPageHandler,currPage,togglePreviousButtons,toggleNextButtons})=>{
    
    return(
        <div className='d-flex flex-grow-1 justify-content-around'>
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={firstPageHandler} 
                    style={togglePreviousButtons?{background:'lightgray',border:'none',pointerEvents:'none'}:{}}
                    >
                        <i className="bi bi-chevron-double-left"></i>
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={previousPageHandler}
                    style={togglePreviousButtons?{background:'lightgray',border:'none',pointerEvents:'none'}:{}}
                    >
                        <i className="bi bi-chevron-left"></i>
                </button>
                
                {
                    new Array(numberOfPages).fill(undefined).map((value,index)=>{
                        return (
                            <button type="button" className="btn btn-primary" style={currPage===index+1 ? {background:'white',color:'#0d6efd'}:{}} key={index+1} onClick={()=>pageClickHanlder(index+1)}>{index+1}</button>
                        )
                })
                }
            
                

                <button
                    type="button" 
                    className="btn btn-primary" 
                    onClick={nextPageHandler}
                    style={toggleNextButtons?{background:'lightgray',border:'none',pointerEvents:'none'}:{}}
                    >
                        <i className="bi bi-chevron-right"></i>
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={lastPageHandler}
                    style={toggleNextButtons?{background:'lightgray',border:'none',pointerEvents:'none'}:{}}
                    >
                        <i className="bi bi-chevron-double-right"></i>
                </button>
        </div>   
    )

}

export default Pagination