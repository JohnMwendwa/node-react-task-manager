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


 export const logoutUser = async (token)=>{
    await fetch('/users/logoutAll', {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    });
}   
  