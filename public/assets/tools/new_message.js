function multiFile(){
    var tableRows = document.getElementById('fileContent');
    var countRows = tableRows.rows.length;
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute('style','padding-left:25px;');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var numberText = document.createTextNode(countRows);

    var fileInputs = document.createElement('input');
    fileInputs.setAttribute('type','file');
    fileInputs.setAttribute('name','fileInputs[]');
    fileInputs.setAttribute('style','display:none');
    fileInputs.setAttribute('onchange','detailsFile(this)');
    fileInputs.setAttribute('value','');
    td1.appendChild(numberText);

    td2.appendChild(fileInputs);
    var aDelete = document.createElement('a');
    aDelete.setAttribute('class','btn btn-block btn-danger btn-xs');
    aDelete.setAttribute('onclick','deleteTableRow(this,\'fileContent\')');
    var aText = document.createTextNode('Delete');
    aDelete.appendChild(aText);
    td4.appendChild(aDelete);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tableRows.appendChild(tr);
    //Click
    var inputFiles = document.getElementById('filesContent').elements['fileInputs[]'];
    if(countRows==1){
        inputFiles.click();
    }else{
        inputFiles[countRows-1].click();
    }
}
    function detailsFile(el){
    var fileName = document.createTextNode(el.files.item(0).name);
    var fileSize = document.createTextNode(el.files.item(0).size+" bayt");
    var matches = el.parentElement.parentElement;
    matches.getElementsByTagName('td')[1].appendChild(fileName);
    matches.getElementsByTagName('td')[2].appendChild(fileSize);
    //           ajax file upload
    //file
    var inputFiles = document.getElementById('filesContent').elements['fileInputs[]'];
    if(inputFiles.length>1){
    inputFiles = inputFiles[inputFiles.length-1].files[0];
}else{
    inputFiles = inputFiles.files[0];
}
    var form_data = new FormData();
    form_data.append("file",inputFiles);
    fileUpload(form_data);
}
// this function auto create images
