const KEYS = {
    members: 'members',
    employeeId: 'employeeId'
}

export const getDepartmentCollection = () => ([
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
])

export function insertEmployee(data) {
    let members = getAllEmployees();
    data['id'] = generateEmployeeId()
    members.push(data)
    localStorage.setItem(KEYS.members, JSON.stringify(members))
}

export function updateEmployee(data) {
    let members = getAllEmployees();
    let recordIndex = members.findIndex(x => x.id === data.id);
    members[recordIndex] = { ...data }
    localStorage.setItem(KEYS.members, JSON.stringify(members));
}

export function deleteEmployee(id) {
    let members = getAllEmployees();
    members = members.filter(x => x.id !== id)
    localStorage.setItem(KEYS.members, JSON.stringify(members));
 
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeId))
    localStorage.setItem(KEYS.employeeId, (++id).toString())
    return id;
}

export function getAllEmployees() {
    if (localStorage.getItem(KEYS.members) == null)
        localStorage.setItem(KEYS.members, JSON.stringify([]))
    let members = JSON.parse(localStorage.getItem(KEYS.members));
    //map departmentID to department title
    let departments = getDepartmentCollection();
    // alert("haha")
    return members.map(x => ({
        ...x,
        // department: departments[x.departmentId - 1].title
    }))
}

export  function empty() {
    // empty local storage
    localStorage.setItem(KEYS.members, JSON.stringify([]))
}