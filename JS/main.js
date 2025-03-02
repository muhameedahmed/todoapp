var taskinput= document.getElementById('taskinput')
var btntask=document.getElementById('btntask')
var tasks=document.getElementById('tasks')

alltodos();
btntask.addEventListener('click',function(){
    var todo={
        "title":taskinput.value,
        "apiKey":"677fcc6260a208ee1fdef0ca"
    }
    add(todo);  
    taskinput.value='';  
})

async function add(task){
    var data= await fetch('https://todos.routemisr.com/api/v1/todos',
        {
            method:'post',
            body:JSON.stringify(task),
            headers:{
                'content-type':'application/json' 
            }
        }
    );
    var result=await data.json();
  
    if(result.message=='success'){
        alltodos();
    }
}
async function alltodos(){
    var data= await fetch('https://todos.routemisr.com/api/v1/todos/677fcc6260a208ee1fdef0ca');
    var result=await data.json();
    var cartona=``;
    for( var i=0 ;i<result.todos.length; i++){
        console.log(result.todos[i].completed);
        cartona +=` <div class="task px-3 py-2 my-1 d-flex flex-row justify-content-between align-items-center ps-4 pe-4 rounded shadow m-auto ">
        <p class="tasktext m-0 p-0 ${result.todos[i].completed? 'text-decoration-line-through':''}">${result.todos[i].title}</p>
        <div class="icons">
            <i onclick=" markcomplete('${result.todos[i]._id}')"  class="fa-regular fa-circle-check ${result.todos[i].completed? 'd-none':''}"></i>
            <i onclick=" deletetodo('${result.todos[i]._id}')" class="fa-solid fa-trash-can"></i>
        </div>
    </div> `
    }
    tasks.innerHTML=cartona;
  
}

async function deletetodo(id){
    var data= await fetch('https://todos.routemisr.com/api/v1/todos',
        {
            method:'DELETE',
            body :JSON.stringify({todoId: id}),
            headers:{
                'content-type':'application/json'
            }
        }
    );
    var result=await data.json();
    if(result.message=='success'){
        alltodos();
    }
    
}
async function markcomplete(id){
    var data= await fetch('https://todos.routemisr.com/api/v1/todos',
        {
            method:'PUT',
            body :JSON.stringify({todoId: id}),
            headers:{
                'content-type':'application/json'
            }
        }
    );
    var result=await data.json();
    if(result.message=='success'){
        alltodos();
    }
}