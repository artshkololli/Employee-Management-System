const urlParamas=new URLSearchParams(window.location.search);
const productId=urlParamas.get('id');
const getSingleProduct=()=>{
    fetch(`http://localhost:3000/employees/${productId}`)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        document.getElementById('title').innerHTML=data.id;
    })
}

getSingleProduct();