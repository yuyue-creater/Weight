import axios from "axios";

export const createMember = item => {
      
    axios.post("http://localhost:8000/api/insert", {
        memberID: item.memberID,
        name: item.name,
        weight: parseFloat(item.weight),
        height: parseFloat(item.height),
        age: parseInt(item.height),
        gender: item.gender,
    }).then(() => {
        alert("Member inserted into sql");
        
    });
};

export const deleteMember = (id) => {
    alert(`deleting ${id}`)
    axios.delete(`http://localhost:8000/api/delete/${id}`).then((response) => { console.log(response)
    
    })
}

export const updateMember = item => {
    alert(`updating ${item.memberID}`)
    axios.put(`http://localhost:8000/api/update/${item.memberID}`,  {
        memberID: item.memberID,
        name: item.name,
        weight: parseFloat(item.weight),
        height: parseFloat(item.height),
        age: parseInt(item.height),
        gender: item.gender
    }).then((response) => {
        alert("updation complete")
      }
    );
  };