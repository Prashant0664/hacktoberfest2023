const clear=document.querySelector(".clear");
const dateElement=document.getElementById("date");
const list=document.getElementById("list");
const input=document.getElementById("input");
const mdelete=document.querySelector(".mdelete");
const mdone="checkbox";
const CHECK2="fa-cm-check";
const UNCHECK2="fa-cmn-thin";
const CHECK="fa-check-circle";
const UNCHECK="fa-circle-thin";
const LINE_THROUGH="lineThrough";
let LIST=[], id=0;
let data=localStorage.getItem("TODO");
if(data){
    LIST=JSON.parse(data);
    id=LIST.length;
    loadList(LIST);
}
else{
    LIST=[];
    id=0;
}
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name,item.id,item.done,item.trash,false,false);
    });
}
const options={weekday:"long",month:"short",day:"numeric"};
const today=new Date();
dateElement.innerHTML=today.toLocaleDateString("en-US",options);
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
});
function addToDo(toDo,id,done,trash,deletee,whe){
    if(trash){return;}
    const DONE2=done?CHECK2:UNCHECK2;
    const DONE=done?CHECK:UNCHECK;
    const LINE=done?LINE_THROUGH:"";
    const item=`<li class="item" id=${id}>
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <label>
    <p class="text ${LINE}">${toDo}</p>
    </label>
    <i class="fa ${DONE2} de" job="delete" id="${id}"></i>
    </li>
    `;
    const position="beforeend";
    list.insertAdjacentHTML(position,item);
}
document.addEventListener("keyup",function(event){
    if(event.key=="Enter"){
        const toDo=input.value;
        if(toDo){
            addToDo(toDo,id,false,false,false);
            LIST.push({
                name:toDo,
                id:id,
                done:false,
                trash:false,
                deletee:false,
                whe:false
            });
            localStorage.setItem("TODO",JSON.stringify(LIST));
            id++;
        }
        input.value="";
    }
});
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done=LIST[element.id].done?false:true;
}
function removeToDo(element){
    element.classList.toggle(CHECK2);
    element.classList.toggle(UNCHECK2);
    LIST[element.id].deletee=LIST[element.id].deletee?false:true;
  }
mdelete.addEventListener("click",function(){
    const l=LIST.length;
for(let o=0;o<l;o++){
    if(LIST[o].deletee==true){
        LIST[o].trash=true;
    }
}
for(let o=0;o<l;o++){
    if(LIST[o].trash==true && LIST[o].whe==false ){
        LIST[o].whe=true;
        element=document.getElementById(LIST[o].id);
        element.parentNode.removeChild(element);
    }
}
})
list.addEventListener("click",function(event){
    const element=event.target;
    const elementJob=element.attributes.job.value;
    if(elementJob=="complete"){
        completeToDo(element);
    }else if(elementJob=="delete"){
        removeToDo(element);
    }
localStorage.setItem("TODO",JSON.stringify(LIST));
});