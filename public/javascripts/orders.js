function editRow(n)
{       
        var buttonName = document.getElementById(`edit${n}`).innerText;
        n = parseInt(n);
        var len = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].childElementCount-3;

        switch(buttonName) {
                case 'Edit!' :
                        var state = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[2].getElementsByTagName('label')[0];
                        var carrier = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[3].getElementsByTagName('label')[0];
                
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
                        

                        var carrSelect = document.createElement('select');
                        carrSelect.setAttribute("id", "carrSel");
                        let carrLabels = document.getElementById('carriers').getElementsByTagName("label");
                        for (var i=0; i<statesLabels.length; i++) 
                        {
                                var option = document.createElement('option');
                                option.setAttribute("value", carrLabels[i].innerText);
                                option.textContent = carrLabels[i].innerText;
                                carrSelect.appendChild(option);
                        }
                        carrier.replaceWith(carrSelect);

                        document.getElementById(`edit${n}`).innerText = "Save!";
                        break;

                case 'Save!' : 
                        var jsonString = '{"zamowienie":[';
                        
                        var zamID = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[0].getElementsByTagName('label')[0];
                        jsonString += `{"val":"${zamID.innerText}"},`;

                        var stateSelect = document.getElementById('statSel');
                        var state = document.createElement("label");
                        state.setAttribute('size', '5');
                        jsonString += `{"val":"${stateSelect.selectedOptions[0].textContent}"},`;
                        state.innerText = stateSelect.selectedOptions[0].textContent;
                        stateSelect.replaceWith(state);
                        
                        var carrSelect = document.getElementById('carrSel');
                        var carrier = document.createElement("label");
                        carrier.setAttribute('size', '5');
                        jsonString += `{"val":"${carrSelect.selectedOptions[0].textContent}"},`;
                        carrier.innerText = carrSelect.selectedOptions[0].textContent;
                        carrSelect.replaceWith(carrier);

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
	hiddeninput.setAttribute("name", "zamowienie");
	hiddeninput.setAttribute("value", n);
	form.appendChild(hiddeninput);

	form.submit();
} 