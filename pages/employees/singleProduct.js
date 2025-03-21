const urlParamas=new URLSearchParams(window.location.search);
const productId=urlParamas.get('id');
const getSingleProduct=()=>{
    fetch(`http://localhost:3000/employees/${productId}`)
    .then(res => res.json())
    .then(data =>{
        document.getElementById('title').innerHTML=data.title;
        document.getElementById('imageId').src=data.image
        document.getElementById('description').innerText=data.description
    })
}

getSingleProduct();