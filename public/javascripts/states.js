function editRow(n)
{	
	var buttonName = document.getElementById(`edit${n}`).innerText;
	n = parseInt(n);
	var len = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].childElementCount-2;

	switch(buttonName) {
		case 'Edit!' :
			var state = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[1].getElementsByTagName('label')[0];
			var input = document.createElement("input");
			input.setAttribute('size', '5');
			input.value = state.innerText;
			state.replaceWith(input);

			document.getElementById(`edit${n}`).innerText = "Save!";
			break;

		case 'Save!' : 
			var jsonString = '{"stan":[';

			var stateId = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[0].getElementsByTagName('label')[0];
			jsonString += `{"val":"${stateId.innerText}"},`;
			
			var edit = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[1].getElementsByTagName('input')[0];
			var state = document.createElement("label");
			state.setAttribute('size', '5');
			jsonString += `{"val":"${edit.value}"},`;
			state.innerText = edit.value;
			edit.replaceWith(state);

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
	hiddeninput.setAttribute("name", "stan");
	hiddeninput.setAttribute("value", n);
	form.appendChild(hiddeninput);

	form.submit();
} 