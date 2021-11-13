moving()
function moving(){
    var draggables = document.querySelectorAll('.draggable')
    var containers = document.querySelectorAll('.workPlace')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
        })

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })
    })

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault()
            const afterElement = getDragAfterElement(container, e.clientY)
            const draggable = document.querySelector('.dragging')
            if (afterElement == null) {
                container.appendChild(draggable)
            } else {
                container.insertBefore(draggable, afterElement)
            }
        })
    })
    $('.select2').select2();
}


function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

let DivId = 1;
let SaveId;
let SaveType;
var ajax = {
    ajaxMethod:'POST',
    select:function (id){

        var formData = new FormData()

        formData.append('id', id)

//      ajax method without jquery
        var httpRequest = new XMLHttpRequest()

        httpRequest.open(this.ajaxMethod, '/form-select/')
        httpRequest.send(formData);

        httpRequest.onreadystatechange = function(){
            // Process the server response here.
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {

                        var $return = JSON.parse(httpRequest.responseText)
                        // document.getElementById('infoDetails').innerHTML='Details '+id
                        document.getElementById('details').innerHTML=''
                        // document.getElementById('details').innerHTML=$return[0]

                        $return[1] = $return[1].replace("data-id='id'","data-id='"+id+"-"+DivId+"' id='"+id+"-"+DivId+"-div' data-num='"+DivId+"'")

                    var div = stringToHTML($return[1]).querySelector('div')


                        document.getElementById('workPlace').appendChild(div)
                        let change = div.querySelectorAll('.flexForm>*');


                        if(change.length==2) {change = change[0]}
                        else {change = change[0]}

//                      Change name of => input @ select @ button @ textarea
                        if(change.querySelector('div')){
                            let input = change.querySelector('div')
                                input = input.querySelector("input")
                                input.name = input.name+"_"+DivId
                        }else{
                            let input = change.querySelector("input")
                                if(!input){
                                    input = change
                                }
                            if(input.type!='submit'){
                                input.name = input.name+"_"+DivId
                            }
                        }


                        let type_input
                        if(change.querySelector('input')){
                             type_input = change.querySelector('input').type
                        }else{
                             type_input = false
                        }
                        if(change.querySelector('div')){
                            change = change.querySelector('input')



                            if(change.type=="checkbox"){
                                change.parentNode.parentNode.parentNode.setAttribute('data-number', DivId)
                                change.parentNode.parentNode.parentNode.setAttribute('id', id + "-" + DivId)
                            } else {
                                change.setAttribute('data-number', DivId)
                                change.setAttribute('id', id + "-" + DivId)
                            }
                        }
                        else{
                            if(type_input=="radio"){
                                change.parentNode.parentNode.setAttribute('data-number', DivId)
                                change.parentNode.parentNode.setAttribute('id', id + "-" + DivId)
                            }else{
                                change.setAttribute('data-number', DivId)
                                change.setAttribute('id', id + "-" + DivId)
                            }
                        }

                        SaveId = id+"-"+DivId
                        SaveType = id
                        moving()
                        DivId++
                } else {
                    alert('There was a problem with the request.')
                }
            }
        }
    },
    selectWithoutInsert:function (id,e) {
        var formData = new FormData()

        formData.append('id', id)

//      ajax method without jquery
        var httpRequest = new XMLHttpRequest()

        httpRequest.open(this.ajaxMethod, '/form-select/')
        httpRequest.send(formData);

        httpRequest.onreadystatechange = function(){
            // Process the server response here.
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    var $return = JSON.parse(httpRequest.responseText)
                    document.getElementById('infoDetails').innerHTML='Details '+id
                    document.getElementById('details').innerHTML=''
                    document.getElementById('details').innerHTML=$return[0]
                    let details = document.getElementById('details')
                    SaveType = id
                    setInfoAttribute(details,e)
                    moving()
                } else {
                    alert('There was a problem with the request.')
                }
            }
        }
    },
    saveTODB:function (data){

        var formData = new FormData()

        formData.append('data', data)

//      ajax method without jquery
        var httpRequest = new XMLHttpRequest()

        httpRequest.open(this.ajaxMethod, '/save-form/')
        httpRequest.send(formData);

        httpRequest.onreadystatechange = function(){
            // Process the server response here.
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    var $return = JSON.parse(httpRequest.responseText)
                    console.log($return.formHtml)
                } else {
                    alert('There was a problem with the request.')
                }
            }
        }
    },
    htmlToText:function (data){

    var formData = new FormData()

    formData.append('data', data)

//      ajax method without jquery
    var httpRequest = new XMLHttpRequest()

    httpRequest.open(this.ajaxMethod, '/html-text/')
    httpRequest.send(formData);

    httpRequest.onreadystatechange = function(){
        // Process the server response here.
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                console.log(httpRequest.responseText)
                return httpRequest.responseText
            } else {
                alert('There was a problem with the request.')
            }
        }
    }
},
};
function fileChoise(){
    alert("script")
}
var stringToHTML = function (str) {
    var parser = new DOMParser()
    var doc = parser.parseFromString(str, 'text/html')
    return doc.body
};
let DeleteDiv = ""
function onInfo(e){
    let id = e.getAttribute('data-type');
    let DivId = e.getAttribute('data-id');
    ajax.selectWithoutInsert(id,e)
    DeleteDiv = DivId
    SaveId = DivId

}
function DeleteDivSelect(){
    if(document.getElementById(DeleteDiv+'-div')){
        document.getElementById(DeleteDiv+'-div').remove()
        document.getElementById("details").innerHTML = ""
    }else {
        alert("Please select div")
    }
}
//  new
function propertyInputs(e){
    if(SaveId){
        let tag = document.getElementById(SaveId)
        let div =  document.querySelector('[data-id="'+SaveId+'"]')
        let type = e.getAttribute('data-property')
        let tage_type = e.getAttribute('data-type')

        let tags = div.querySelector(tage_type)
            if(type=='label'){
                let Label = div.querySelector("label")
                Label.innerHTML = e.value
            }
            else if(type=='placeholder'){
                tags.setAttribute('placeholder',e.value)
            }
            else if(type=='data-message'){
                    if(tags.type!='checkbox' || tags.type!='radio')
                        tags.setAttribute('name', e.value)
                    else{
                        let inputs = tags.parentNode.parentNode.parentNode.querySelectorAll("input")
                        inputs.forEach(function (input){
                            input.setAttribute('name', e.value)
                        })
                    }
            }
            else if(type=='required'){

                if(e.checked==true){
                //    //////
                    if(tags.type=='radio' || tags.type=='checkbox'){
                        let inputs = tags.parentNode.parentNode.parentNode.querySelectorAll("input")
                        inputs.forEach(function (input){
                            input.setAttribute('required', e.checked)
                        })
                    }else
                        tags.setAttribute('required', e.checked)

                }else{
                //    ////
                    if(tags.type=='radio' || tags.type=='checkbox'){
                        let inputs = tags.parentNode.parentNode.parentNode.querySelectorAll("input")
                        inputs.forEach(function (input){
                            input.removeAttribute('required')
                        })
                    }else
                        tags.removeAttribute('required')


                }

            }
            else if(type=='multiple'){
                if(e.checked==true){
                    tags.setAttribute('multiple','multiple')
                    tags.setAttribute('data-dropdown-css-class','select2-purple')
                }else{
                    tags.removeAttribute("data-dropdown-css-class")
                    tags.removeAttribute("multiple")
                }
            }
            else if(type=='disabled'){
                if(e.checked==true){
                    if(tags.type=='radio' || tags.type=='checkbox'){
                        let inputs = tags.parentNode.parentNode.parentNode.querySelectorAll("input")
                        inputs.forEach(function (input){
                            input.setAttribute('disabled', e.checked)
                        })
                    }else
                        tags.setAttribute('disabled', e.checked)

                }else{
                    if(tags.type=='radio' || tags.type=='checkbox'){
                        let inputs = tags.parentNode.parentNode.parentNode.querySelectorAll("input")
                        inputs.forEach(function (input){
                            input.removeAttribute('disabled')
                        })
                    }else
                        tags.removeAttribute('disabled')
                }
            }
            else if(type=='option'){
                let id = tags.id
                let options = e.value
                options = options.split("\n")
                document.getElementById(id).innerHTML=""
                let selected_option = document.querySelector("div.flexFormDetails>select")
                    selected_option.innerHTML = ""
                    if(options[0]!="") {
                        let option_set = document.createElement('option')
                        let option_text = document.createTextNode(" ")
                        option_set.setAttribute("value", " ")
                        option_set.appendChild(option_text)
                        selected_option.appendChild(option_set)
                    }

                options.forEach(function (option){
                    var data = {
                        id: option,
                        text: option
                    };
                    var newOption = new Option(data.text, data.id, false, false);
                    $('#'+id).append(newOption).trigger('change')
                    //SELECT2 OPTIONS
                    let option_set = document.createElement('option')
                    let option_text = document.createTextNode(option)
                        option_set.setAttribute("value",option)
                        option_set.appendChild(option_text)
                        selected_option.appendChild(option_set)
                })
            }
            else if(type=='selected'){

                if(e.value==" ")
                    $("#"+SaveId).val(null).trigger('change');
                else
                    $("#"+SaveId).val(e.value).trigger('change');
            }
            else if(type=='default'){
                tags.value = e.value
            }
            else if(type=='min'){
                tags.setAttribute('minlength',e.value)
            }
            else if(type=='max'){
                tags.setAttribute('maxlength',e.value)
            }
            else if(type=='text'){
                tag.innerText = e.value
            }
            else if(type=='button'){
                tags.innerHTML = e.value
            }
            else if(type=='checked'){
                let id = tags.id
                let checkboxs = e.value
                checkboxs = checkboxs.split("\n")
                document.getElementById(id).innerHTML=""
                let selected_option = document.querySelector("div.flexFormDetails>select")
                let checkbox_name = document.querySelector("div.flexFormDetails>input[data-property='data-message']")

                    if(checkbox_name){
                         if(checkbox_name.value!="")
                             checkbox_name = checkbox_name.value
                        else
                             checkbox_name = "checkbox[]"

                    }
                selected_option.innerHTML = ""
                if(checkboxs[0]!="") {
                    let option_set = document.createElement('option')
                    let option_text = document.createTextNode(" ")
                    option_set.setAttribute("value", " ")
                    option_set.appendChild(option_text)
                    selected_option.appendChild(option_set)
                }
                let pastDiv = document.getElementById(SaveId+"-div")
                    pastDiv = pastDiv.querySelector("div.formPaste>div.flexForm")
                    pastDiv.innerHTML=""
                if(tags.type=='checkbox')
                    checkboxs.forEach(function (checkbox){
                    let div1 = document.createElement('div')
                        div1.setAttribute('class',"form-group clearfix")
                    let div1_div = document.createElement('div')
                        div1_div.setAttribute('class',"icheck-primary d-inline")
                    let div1_div_input = document.createElement('input')
                        div1_div_input.setAttribute("type",'checkbox')
                        div1_div_input.setAttribute("value",checkbox)
                        div1_div_input.setAttribute("name",checkbox_name)
                        div1_div_input.setAttribute("id","checkbox-"+checkbox)
                    let div1_div_label = document.createElement('label')
                        div1_div_label.setAttribute("for","checkbox-"+checkbox)
                        div1_div_label.setAttribute("style",'color: #212529;')
                    let div1_div_label_text = document.createTextNode(checkbox)

                        div1_div.appendChild(div1_div_input)
                        div1_div_label.appendChild(div1_div_label_text)
                        div1_div.appendChild(div1_div_label)
                        div1.appendChild(div1_div)
                        pastDiv.appendChild(div1)

//                  CHECKBOX OPTIONS
                    let option_set = document.createElement('option')
                    let option_text = document.createTextNode(checkbox)

                    option_set.setAttribute("value",checkbox)

                    option_set.appendChild(option_text)
                    selected_option.appendChild(option_set)
                })
                else if(tags.type=='radio')
                    checkboxs.forEach(function (checkbox){
                        let div1 = document.createElement('div')
                        div1.setAttribute('class',"form-group clearfix")
                        let div1_div = document.createElement('div')
                        div1_div.setAttribute('class',"icheck-primary d-inline")
                        let div1_div_input = document.createElement('input')
                        div1_div_input.setAttribute("type",'radio')
                        div1_div_input.setAttribute("value",checkbox)
                        div1_div_input.setAttribute("name",checkbox_name)
                        div1_div_input.setAttribute("id","radio-"+checkbox)
                        let div1_div_label = document.createElement('label')
                        div1_div_label.setAttribute("for","radio-"+checkbox)
                        div1_div_label.setAttribute("style",'color: #212529;')
                        let div1_div_label_text = document.createTextNode(checkbox)

                        div1_div.appendChild(div1_div_input)
                        div1_div_label.appendChild(div1_div_label_text)
                        div1_div.appendChild(div1_div_label)
                        div1.appendChild(div1_div)
                        pastDiv.appendChild(div1)

//                  CHECKBOX OPTIONS
                        let option_set = document.createElement('option')
                        let option_text = document.createTextNode(checkbox)

                        option_set.setAttribute("value",checkbox)

                        option_set.appendChild(option_text)
                        selected_option.appendChild(option_set)
                    })
            }
            else if(type=='checking'){
                let val = e.value
                let pastDivs = document.getElementById(SaveId+"-div")
                    pastDivs = pastDivs.querySelectorAll("div.formPaste>div.flexForm>div>div>input")



                    pastDivs.forEach(function (input){
                        input.removeAttribute('checked')
                    })

                let pastDiv = document.getElementById(SaveId+"-div")
                    pastDiv = pastDiv.querySelector("div.formPaste>div.flexForm>div>div>input[value='"+val+"']")

                    pastDiv.setAttribute("checked","checked")
            }
    }else{
        alert("Please select input")
    }
}
function setInfoAttribute(details,e){
    let tag = document.getElementById(SaveId)

    if(tag.querySelector('div')){
//      checkbox and radioBox
//        Label
        let tag_label = document.getElementById(SaveId + "-div")

        if (tag_label.querySelector('label'))
            tag_label = tag_label.querySelector('label').innerHTML

        let change_label = details.querySelector('input[data-property="label"]')

        if (change_label) {
            change_label.value = tag_label
        }
//      input name
        let input_name = tag.querySelector('input').name
        let data_message = details.querySelector('input[data-property="data-message"]')
        if (data_message)
            data_message.value = input_name
//      disabled and required
        let disabled = tag.querySelector('input').disabled
        let required = tag.querySelector('input').required

        let change_required = details.querySelector('input[data-property="required"]')
        let change_disabled = details.querySelector('input[data-property="disabled"]')

        if (change_disabled) {
            if (disabled == true) {
                change_disabled.setAttribute('checked', 'checked')
            } else {
                change_disabled.removeAttribute('checked')
            }
        }

        if (change_required) {
            if (required == true) {
                change_required.setAttribute('checked', 'checked')
            } else {
                change_required.removeAttribute('checked')
            }
        }
//      textarea add blog
        let select_text = ""
        let selected_option = document.querySelector("div.flexFormDetails>select")

        if (selected_option)
            selected_option.innerHTML = ""
//Set default value
        let inputs = tag.querySelectorAll('input')
        let option_set = document.createElement('option')
        let option_text = document.createTextNode("")
        option_set.setAttribute("value", "")
        option_set.appendChild(option_text)
        selected_option.appendChild(option_set)

        inputs.forEach(function (input) {

                select_text += input.getAttribute('value') + "\n"
            let option = input.getAttribute('value')
            let option_check = input.getAttribute('checked')

                option_set = document.createElement('option')
                option_text = document.createTextNode(option)
                option_set.setAttribute("value", option)


                if(option_check=="checked")
                    option_set.setAttribute("selected", 'selected')

                option_set.appendChild(option_text)
                selected_option.appendChild(option_set)
        })

        let select = details.querySelector('textarea')
        if (select)
            select.value = select_text
    }
    else
    {
        let required = tag.getAttribute('required')
        let disabled = tag.getAttribute('disabled')
        let multiple = tag.getAttribute('multiple')

        let change_required = details.querySelector('input[data-property="required"]')
        let change_disabled = details.querySelector('input[data-property="disabled"]')


        let change_multiple = details.querySelector('input[data-property="multiple"]')

        let tag_label = document.getElementById(SaveId + "-div")
        if (tag_label.querySelector('label'))
            tag_label = tag_label.querySelector('label').innerHTML

        let change_label = details.querySelector('input[data-property="label"]')

        if (change_label) {
            change_label.value = tag_label
        }

        if (change_disabled) {
            if (disabled == 'true') {

                change_disabled.setAttribute('checked', disabled)
            } else {
                change_disabled.removeAttribute('checked')
            }
        }

        if (change_required) {
            if (required == 'true') {
                change_required.setAttribute('checked', required)
            } else {
                change_required.removeAttribute('checked')
            }
        }

        if (change_multiple) {
            if (multiple == 'multiple') {
                change_multiple.setAttribute('checked', true)
            } else {
                change_multiple.removeAttribute('checked')
            }
        }
        let select_text = ""
        let selected_option = document.querySelector("div.flexFormDetails>select")
        if (selected_option)
            selected_option.innerHTML = ""
//Set default value
        let selects = tag.querySelectorAll('select>option')
        selects.forEach(function (element) {
            select_text += element.getAttribute('value') + "\n"

            let option = element.getAttribute('value')
            let option_set = document.createElement('option')
            let option_text = document.createTextNode(option)
            option_set.setAttribute("value", option)
            option_set.appendChild(option_text)
            selected_option.appendChild(option_set)
        })

        let select = details.querySelector('textarea')
        if (select)
            select.value = select_text
//    Input name
        let input_name = tag.getAttribute('name')
        let data_message = details.querySelector('input[data-property="data-message"]')
        if (data_message)
            data_message.value = input_name
//    placeholder
        let placeholder = tag.getAttribute('placeholder')
        let set_placeholder = details.querySelector('input[data-property="placeholder"]')
        if (set_placeholder)
            set_placeholder.value = placeholder

//    default value
        let default_value = tag.value
        let set_default_value = details.querySelector('input[data-property="default"]')
        if (set_default_value)
            set_default_value.value = default_value
//    max length
        let max_length = tag.getAttribute('maxlength')
        let set_max_length = details.querySelector('input[data-property="max"]')
        if (set_max_length)
            set_max_length.value = max_length

//    min length
        let min_length = tag.getAttribute('minlength')
        let set_min_length = details.querySelector('input[data-property="min"]')
        if (set_min_length)
            set_min_length.value = min_length
//    text
        let data_text = tag.textContent
        let set_data_text = details.querySelector('textarea[data-property="text"]')
        if (set_data_text)
            set_data_text.value = data_text

        let button_text = tag.textContent
        let button = details.querySelector('input[data-property="button"]')
        if (button)
            button.value = button_text
    }
}
function changeFormName(e){
    document.getElementById("FormName").innerHTML = e.value
}
function saveToDB(){
    let saveArray = {
        formName:"",
        label:[],
        nameInput:[],
        formHtml:""
    }
    let saveDB = document.getElementById("workPlace")
        saveArray.formHtml = saveDB.outerHTML
    let $data = saveDB.querySelectorAll("label[for='formPaste']")
        saveArray.formName = document.getElementById("FormName").textContent
    $data.forEach(function (element){
        element = element.parentNode
        if(element.querySelector("label")){
            let parent = element.querySelector("label")
            parent = parent.parentNode
            let parent_input = parent.querySelector("div.flexForm>input")
            let parent_input2 = parent.querySelector("div.flexForm>*>input")
            let parent_input3 = parent.querySelector("div.flexForm>*>*>input")
            let parent_select = parent.querySelector("div.flexForm>select")
            let parent_textarea = parent.querySelector("div.flexForm>textarea")

            if(parent_input){
                if(parent_input.name!="norobot"){
                    saveArray.label.push(element.querySelector("label").textContent)
                    saveArray.nameInput.push(parent_input.name)
                }
            }
            if(parent_input2){
                if(parent_input2.name!="norobot") {
                    saveArray.label.push(element.querySelector("label").textContent)
                    saveArray.nameInput.push(parent_input2.name)
                }
            }
            if(parent_input3){
                if(parent_input3.name!="norobot") {
                    saveArray.label.push(element.querySelector("label").textContent)
                    saveArray.nameInput.push(parent_input3.name)
                }
            }
            if(parent_select){
                saveArray.label.push(element.querySelector("label").textContent)
                saveArray.nameInput.push(parent_select.name)
            }
            if (parent_textarea){
                saveArray.label.push(element.querySelector("label").textContent)
                saveArray.nameInput.push(parent_textarea.name)
            }
        }
    })
    saveArray = JSON.stringify(saveArray)
    ajax.saveTODB(saveArray)
}
