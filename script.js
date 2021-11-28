const tableKey = 'xads-table';
let xadsTable;
let xadsTableDemo = {};

document.getElementById('SortButton').addEventListener('click', () => {
    const sortedKeys = Object.keys(xadsTable).sort();
    const tempTable = {};
    sortedKeys.forEach(key => tempTable[key] = xadsTable[key]);
    xadsTable = tempTable;
    refreshTable();
});

let enableDisableNameInput = (option) => {
    let newPersonName = document.getElementById('newPersonName');
    if(option === 'enable')
        newPersonName.disabled = false;
    else if (option === 'disable')
        newPersonName.disabled = true;
}

let refreshTable = () => {
    let xadsTableKeys = Object.keys(xadsTable);
    let tableContaier = document.getElementById('xadsTableContainer');
    let oldTableBody = document.getElementById('tableBody');
    tableContaier.removeChild(oldTableBody);
    let newTableBody = document.createElement('span');
    newTableBody.id = 'tableBody';
    tableContaier.appendChild(newTableBody);


    for(let i = 0; i < xadsTableKeys.length;i++){
        let currentRow = document.createElement('div');
        let currentNameCol = document.createElement('div');
        let currentPhoneCol = document.createElement('div');
        let currentBirthdayCol = document.createElement('div');
        let currentAddressCol = document.createElement('div');
        let currentEditBtn = document.createElement('div');
        let currentDeleteBtn = document.createElement('div');


        currentRow.className = 'xad-table-row';
        currentNameCol.className = 'xad-table-column xad-name';
        currentPhoneCol.className = 'xad-table-column xad-phone';
        currentBirthdayCol.className = 'xad-table-column xad-birthday';
        currentAddressCol.className = 'xad-table-column xad-address';
        currentEditBtn.className = 'xad-table-column xad-edit';
        currentDeleteBtn.className = 'xad-table-column xad-delete';

        currentNameCol.innerHTML = xadsTableKeys[i];
        currentPhoneCol.innerHTML = xadsTable[xadsTableKeys[i]].phone;
        currentBirthdayCol.innerHTML = xadsTable[xadsTableKeys[i]].birthday;
        currentAddressCol.innerHTML = xadsTable[xadsTableKeys[i]].address;

        currentDeleteBtn.innerHTML = '<i class="fas fa-dumpster"></i>';
        currentEditBtn.innerHTML = '<i class="fas fa-user-edit"></i>';

        currentRow.appendChild(currentNameCol);
        currentRow.appendChild(currentPhoneCol);
        currentRow.appendChild(currentBirthdayCol);
        currentRow.appendChild(currentAddressCol);
        currentRow.appendChild(currentEditBtn);
        currentRow.appendChild(currentDeleteBtn);
        newTableBody.appendChild(currentRow);
    }

    let enableDisableNewUserModal = (option) => {
        let newPersonName = document.getElementById('newPersonName');
        let newPersonPhone = document.getElementById('newPersonPhone');
        let newPersonBirthday = document.getElementById('newPersonBirthday');
        let newPersonAddress = document.getElementById('newPersonAddress');
        newPersonName.value = '';
        newPersonPhone.value = '';
        newPersonBirthday.value = '';
        newPersonAddress.value = '';

        let newPersonModal = document.getElementById('newPersonModal');
        let backdrop = document.getElementById('backdrop');

        newPersonModal.className = `${option}-modal`;
        backdrop.className = `${option}-modal`;
    }
    let addNewEntryBtn = document.getElementById('xadAddNewEntry');
    let editBtns = document.getElementsByClassName('xad-edit');
    let deleteBtns = document.getElementsByClassName('xad-delete');

    let newPersonSubmitBtn = document.getElementById('newPersonSubmitButton');
    let newPersonCancelBtn = document.getElementById('newCancelButton');

    newPersonSubmitBtn.addEventListener('click', () => {
        let newPersonName = document.getElementById('newPersonName').value.trim();
        let newPersonAddress = document.getElementById('newPersonAddress').value.trim();
        let newPersonPhone = document.getElementById('newPersonPhone').value.trim();
        let newPersonBirthday = document.getElementById('newPersonBirthday').value.trim();
        if(newPersonName === '')
            document.getElementById('newPersonName').className = 'input-err';
        else
            document.getElementById('newPersonName').className = '';

        if(newPersonPhone === '')
            document.getElementById('newPersonPhone').className = 'input-err';
        else
            document.getElementById('newPersonPhone').className = '';

        if(newPersonBirthday === '')
            document.getElementById('newPersonBirthday').className = 'input-err';
        else
            document.getElementById('newPersonBirthday').className = '';

        if(newPersonAddress === '')
            document.getElementById('newPersonAddress').className = 'input-err';
        else
            document.getElementById('newPersonAddress').className = '';

        if(newPersonName !== '' && newPersonAddress !== '' && newPersonPhone !== ''){
            xadsTable[newPersonName] = {
                'phone': newPersonPhone,
                'birthday': newPersonBirthday,
                'address': newPersonAddress
            }
            localStorage.setItem(tableKey,JSON.stringify(xadsTable));
            enableDisableNewUserModal('disable');
            refreshTable();
        }
    });
    newPersonCancelBtn.addEventListener('click', () =>{
        enableDisableNewUserModal('disable');
    });
    addNewEntryBtn.addEventListener('click', () => {
        enableDisableNewUserModal('enable');
    });

    for(let i = 0; i < editBtns.length; i++){
        editBtns[i].addEventListener('click', ($event) => {
            let nameToEdit = $event.target.parentElement.children[0].innerText;
            let personToEdit = xadsTable[nameToEdit];
            enableDisableNameInput('enable');
            enableDisableNewUserModal('enable');
            let newPersonName = document.getElementById('newPersonName');
            let newPersonPhone = document.getElementById('newPersonPhone');
            let newPersonBirthday = document.getElementById('newPersonBirthday');
            let newPersonAddress = document.getElementById('newPersonAddress');
            newPersonName.value = nameToEdit;
            newPersonPhone.value = personToEdit.phone;
            newPersonBirthday.value = personToEdit.birthday;
            newPersonAddress.value = personToEdit.address;
            enableDisableNameInput('disable');
        })
    }
    for(let i = 0; i < deleteBtns.length; i++){
        deleteBtns[i].addEventListener('click', ($event) => {
            let nameToDelete = $event.target.parentElement.children[0].innerText;
            let isSure = window.confirm('Are you sure you want to delete ' + nameToDelete + '?');
            if(isSure)
                // delete user from table
                deleteUserFromTable(nameToDelete);
        })
    }

}

let deleteUserFromTable = (userName) => {
    let tempTable = {};
    let xadsTableKeys = Object.keys(xadsTable);
    for(let i = 0; i < xadsTableKeys.length; i++){
        if(userName !== xadsTableKeys[i]){
            tempTable[xadsTableKeys[i]] = xadsTable[xadsTableKeys[i]];
        }
    }
    xadsTable = tempTable;
    localStorage.setItem(tableKey,JSON.stringify(xadsTable));
    refreshTable();
}
let init = () => {
    if(localStorage.getItem(tableKey)){
        xadsTable = JSON.parse(localStorage.getItem(tableKey));
    } else {
        xadsTable = xadsTableDemo;
        localStorage.setItem(tableKey,JSON.stringify(xadsTable));
    }
    refreshTable();
}
init();









