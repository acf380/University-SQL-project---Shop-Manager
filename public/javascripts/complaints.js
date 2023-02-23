function editRow(n)
{       
        var buttonName = document.getElementById(`edit${n}`).innerText;
        n = parseInt(n);
        var len = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].childElementCount-3;
        switch(buttonName) {
                case 'Edit!' :
                        var ordId = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[1].getElementsByTagName('label')[0];
                        var state = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[2].getElementsByTagName('label')[0];
                        
                        var stateSelect = document.createElement('select');
                        stateSelect.setAttribute("id", "statSel");
                        let statesLabels = document.getElementById('states').getElementsByTagName("label");
                        for (var i=0; i<statesLabels.length; i++) 
                        {
                                var option = document.createElement('option');
                                option.setAttribute("value", statesLabels[i].innerText);
                                option.textContent = statesLabels[i].innerText;
                                stateSelect.appendChild(option);
                        }
                        state.replaceWith(stateSelect);

                        var ordIdInp = document.createElement("input");
                        ordIdInp.setAttribute('size', '5');
                        ordIdInp.value = ordId.innerText;
                        ordId.replaceWith(ordIdInp);
                        
                        document.getElementById(`edit${n}`).innerText = "Save!";
                        break;
                case 'Save!' : 
                        var jsonString = '{"reklamacja":[';

                        var comId = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[0].getElementsByTagName('label')[0];
                        jsonString += `{"val":"${comId.innerText}"},`;

                        var ordIdInp = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[1].getElementsByTagName('input')[0];
                        var ordId = document.createElement("label");
                        ordId.setAttribute('size', '5');
                        jsonString += `{"val":"${ordIdInp.value}"},`;
                        ordId.innerText = ordIdInp.value;
                        ordIdInp.replaceWith(ordId);

                        var stateSelect = document.getElementById('statSel');
                        var state = document.createElement("label");
                        state.setAttribute('size', '5');
                        jsonString += `{"val":"${stateSelect.selectedOptions[0].textContent}"},`;
                        state.innerText = stateSelect.selectedOptions[0].textContent;
                        stateSelect.replaceWith(state);

                        jsonString = jsonString.slice(0, -1);
                        jsonString += ']}';

                        let form = document.createElement("form");
                        form.method = "post";
                        form.action = "/update";
                        document.body.appendChild(form);

                        var hiddeninput = document.createElement("input");
                        hiddeninput.setAttribute("type", "hidden");
                        hiddeninput.setAttribute("name", "json");
                        hiddeninput.setAttribute("value", jsonString);
                        form.appendChild(hiddeninput);

                        form.submit();

                        document.getElementById(`edit${n}`).innerText = "Edit!";
                        break;
                default:
                        console.log("ERROR: WRONG BUTTON NAME!");
        }
}

function delRow(n)
{											
	let form = document.createElement("form");
	form.method = "post";
	form.action = "/delete";
	document.body.appendChild(form);

	var hiddeninput = document.createElement("input");
	hiddeninput.setAttribute("type", "hidden");
	hiddeninput.setAttribute("name", "reklamacja");
	hiddeninput.setAttribute("value", n);
	form.appendChild(hiddeninput);

	form.submit();
} 