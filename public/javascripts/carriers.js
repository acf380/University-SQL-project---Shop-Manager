function editRow(n)
{	
	var buttonName = document.getElementById(`edit${n}`).innerText;
	n = parseInt(n);
	var len = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].childElementCount-2;

	switch(buttonName) {
		case 'Edit!' :
			var carrier = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[1].getElementsByTagName('label')[0];
			var input = document.createElement("input");
			input.setAttribute('size', '5');
			input.value = carrier.innerText;
			carrier.replaceWith(input);

			document.getElementById(`edit${n}`).innerText = "Save!";
			break;

		case 'Save!' : 
			var jsonString = '{"przewoznik":[';

			var carrId = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[0].getElementsByTagName('label')[0];
			jsonString += `{"val":"${carrId.innerText}"},`;
			
			var edit = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[1].getElementsByTagName('input')[0];
			var carrier = document.createElement("label");
			carrier.setAttribute('size', '5');
			jsonString += `{"val":"${edit.value}"},`;
			carrier.innerText = edit.value;
			edit.replaceWith(carrier);

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
	hiddeninput.setAttribute("name", "przewoznik");
	hiddeninput.setAttribute("value", n);
	form.appendChild(hiddeninput);

	form.submit();
} 