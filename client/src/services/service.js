// SIGNUP A NEW USER
export const createUser = async (email,password,name)=>{
    const response = await fetch('/users', {
       method: 'POST',
       body: JSON.stringify({email,password,name}),
       headers: { 
           'Content-Type': 'application/json',
       }
     });

     return  response.json();
     
   }


// LOGIN A USER
 export  const loginUser = async (email,password)=>{
    const response =  await fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({email,password}),
      headers: { 
          'Content-Type': 'application/json',
      }
    });
    return response.json();
   }
// FETCH USER DETAILS AFTER LOGIN
export const getUser = async (token)=>{
    const user =  await fetch('/users/me',{
         method:'GET',
         headers:{
         'Content-Type': 'application/json',
         'Authorization':token
     }
     });
     return user.json();
 }
// GET USER TASKS
export const getTasks = async (token)=>{
  const tasks = await fetch('/tasks',{
        method:'GET',
        headers:{
        'Content-Type': 'application/json',
        'Authorization':token
    }
    })
  
    return tasks.json();
}


// CREATE NEW TASKS
export const createTask =async (newTask,token)=>{
    await fetch('/tasks',{
        method:'POST',
        body:JSON.stringify({description:newTask}),
        headers:{
            'Authorization': token,
            'Content-Type':'application/json'
     }
     }); 
     
 }

//  UPDATE AN EXISTING TASK
export const updateTask =async(id,newTask,token)=>{
  await fetch(`/tasks/${id}`,{
      method:'PATCH',
      body:JSON.stringify({description:newTask}),
      headers:{
      'Content-Type':'application/json',
      'Authorization':token  
   }
  });
}

// DELETE A TASK
export const deleteTask = async(id,token)=>{
    await fetch(`/tasks/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'Authorization':token  
         }
    })
}

// LOGOUT A USER
 export const logoutUser = async (token)=>{
    await fetch('/users/logoutAll', {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    });
}   
  