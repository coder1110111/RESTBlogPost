var cnt=0;
function UpdateCNT(){
    const blogcnt=document.getElementById("blogcount");
    blogcnt.innerHTML=`Total Blog: ${cnt}`;
}

window.addEventListener("DOMContentLoaded",function(){
    axios.get("https://crudcrud.com/api/dbb7c73a79b04052a3a3656785fa8d8b/BlogData")
    .then((res)=>{
        cnt=res.data.length;
        UpdateCNT();
        for(let i=0;i<res.data.length;i++){
            showBlogs(res.data[i]);
        }
    })
})
function showBlogs(obj){
    const BlogList=document.querySelector("ul");
    const newBlog=document.createElement("li");
    newBlog.id=obj._id;
    newBlog.className="countBlogs";
    
    const title=document.createElement("h1");
    title.innerHTML=`${obj.title}`;
    newBlog.appendChild(title);
    
    const img=document.createElement("img");
    img.src=obj.imgadd;
    newBlog.appendChild(img);

    const desc=document.createElement("p");
    desc.innerHTML=`${obj.description}`;
    newBlog.appendChild(desc);

    const deletebtn=document.createElement("button");
    deletebtn.type="button";
    deletebtn.appendChild(document.createTextNode("Delete"));
    deletebtn.addEventListener("click",function(eve){
        const BlogID=eve.target.parentElement.id;
        axios
        .delete(`https://crudcrud.com/api/dbb7c73a79b04052a3a3656785fa8d8b/BlogData/${BlogID}`)
        .then((res)=>{
            BlogList.removeChild(eve.target.parentElement);
            cnt=cnt-1;
            UpdateCNT();
        })
        .catch(err=>console.log(err));
    })
    newBlog.appendChild(deletebtn);

    const editbtn=document.createElement("button");
    editbtn.type="button";
    editbtn.appendChild(document.createTextNode("Edit"));
    editbtn.addEventListener("click",function(eve){
        const form=document.getElementById("form");
        const BlogObj=obj;
        const BlogID=eve.target.parentElement.id;
        axios.delete(`https://crudcrud.com/api/dbb7c73a79b04052a3a3656785fa8d8b/BlogData/${BlogID}`)
        .then(()=>{
            document.getElementById("url").value=obj.imgadd;
            document.getElementById("title").value=obj.title;
            document.getElementById("description").value=obj.description;
            BlogList.removeChild(eve.target.parentElement);
        })
        .catch(err=>console.log(err));

        document.getElementById("form").addEventListener("click",function(e){
            e.preventDefault();
            const UpdateDet={
                imgadd:document.getElementById("url").value,
                title:document.getElementById("title").value,
                description:document.getElementById("description").value
            };
            axios.post("https://crudcrud.com/api/dbb7c73a79b04052a3a3656785fa8d8b/BlogData",UpdateDet)
            .then((res)=>{
                showBlogs(res.data);
            })
            .catch(err=>console.log(err));
        })

    })
    newBlog.appendChild(editbtn);
    BlogList.appendChild(newBlog);

}
function handleFormSubmit(event){
    event.preventDefault();
    const BlogDetails={
        imgadd:event.target.url.value,
        title:event.target.title.value,
        description:event.target.description.value
    };
    axios.post("https://crudcrud.com/api/dbb7c73a79b04052a3a3656785fa8d8b/BlogData",BlogDetails)
    .then(res=>{showBlogs(res.data)
        event.target.url.value="";
        event.target.title.value="";
        event.target.description.value="";
    })
    .catch(err=>console.log(err));
    cnt=cnt+1;
    UpdateCNT();


}