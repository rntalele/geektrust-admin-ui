import '../css/Modal.css';
import { useState } from 'react';
const Modal = ({handleCancel,handleSave,currObj})=>{
    const [name,setName] = useState(currObj.name);
    const [email,setEmail] = useState(currObj.email);
    const [role,setRole] = useState(currObj.role);


    return(
            <div className="edit-modal">
                    <div className="edit-modal-content">
                        <div className='edit-modal-title'>
                            <h3>Edit Details</h3>
                        </div>
                        <div className='edit-modal-body'>
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control mt-2 mb-2" id='name' value={name} onChange={(e)=>setName(e.target.value)}></input>
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control mt-2 mb-2" id='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                            <label htmlFor="exampleInputEmail1">Role</label>
                            <input type="text" className="form-control mt-2 mb-2" id='role' value={role} onChange={(e)=>setRole(e.target.value)}></input>
                        </div>
                        <div className='edit-modal-actions'>
                            <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>Cancel</button>
                            <button type='button' className='btn btn-primary' onClick={()=>handleSave(name,email,role)}>Save</button>
                        </div>
                    </div>
            </div>
        
    )
}

export default Modal;