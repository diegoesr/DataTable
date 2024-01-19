let dataTable;
let dataTableInitialized = false;

const dataTableOptions = {
    lengthMenu: [5,10,15,20,25],
    columnDefs:[
        {className: "centered", targets:[0,1,2,3,4,5,6]}, //columnas centradas
        {orderable:false,targets:[5,6]} //NO ordenamos las ultimas columnas 
        
    ], 
    pageLength:3, //parametro para agrupar los datos en 3
    destroy:true, 
    language:{ //configuracion para cambiar de lenguaje
        lengthMenu: "Mostrar _MENU_ registros por página ",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate:{
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};

const initDataTable = async() => {
    if(dataTableInitialized){
        dataTable.destroy();
    }

    await listUsers();
    dataTable = $("#datatable_users").DataTable(dataTableOptions);
    dataTableInitialized = true;

};
const listUsers = async() => {
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();
        let content=``;
        users.forEach((user,index)=>{ //user hace referencia a cada objeto y index hace referencia a las posiciones
            content+=`
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.address.city}</td>
                <td>${user.company.name}</td>
                <td><i class="fa-solid fa-circle-check" style="color: green;"></i></td>
                <td>
                    <button class="btn btn-sm btn-primary"><i class="fa-solid fa-square-pen"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can-arrow-up"></i></button>


                </td>

            </tr>`;
        });
        tableBody_users.innerHTML = content;
    }catch(ex){
        alert(ex);
    }

};
window.addEventListener("load",async() => {
    await initDataTable();

});