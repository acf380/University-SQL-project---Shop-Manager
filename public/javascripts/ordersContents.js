function editRow(n, id)
{       
        var buttonName = document.getElementById(`edit${n}`).innerText;
        n = parseInt(n);
        var len = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].childElementCount-3;
        switch(buttonName) {
                case 'Edit!' :
                        var prodId = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[0].getElementsByTagName('label')[0];
                        var ordId = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[1].getElementsByTagName('label')[0];
                        var numb = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[2].getElementsByTagName('label')[0];
                        
                        var prodIdInp = document.createElement("input");
                        prodIdInp.setAttribute('size', '5');
                        prodIdInp.value = prodId.innerText;
                        prodId.replaceWith(prodIdInp);

                        var ordIdInp = document.createElement("input");
                        ordIdInp.setAttribute('size', '5');
                        ordIdInp.value = ordId.innerText;
                        ordId.replaceWith(ordIdInp);
                       
                        var numbInp = document.createElement("input");
                        numbInp.setAttribute('size', '5');
                        numbInp.value = numb.innerText;
                        numb.replaceWith(numbInp);
                        
                        document.getElementById(`edit${n}`).innerText = "Save!";
                        break;
                case 'Save!' : 
                        var jsonString = '{"zawartosc_zamowienia":[';

                        jsonString += `{"val":"${id}"},`;
      
                        var ordIdInp = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[0].getElementsByTagName('input')[0];
                        var ordId = document.createElement("label");
                        ordId.setAttribute('size', '5');
                        jsonString += `{"val":"${ordIdInp.value}"},`;
                        ordId.innerText = ordIdInp.value;
                        ordIdInp.replaceWith(ordId);
                        
                        var prodIdInp = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[1].getElementsByTagName('input')[0];
                        var prodId = document.createElement("label");
                        prodId.setAttribute('size', '5');
                        jsonString += `{"val":"${prodIdInp.value}"},`;
                        prodId.innerText = prodIdInp.value;
                        prodIdInp.replaceWith(prodId);

                        var numbInp = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[n].getElementsByTagName('td')[2].getElementsByTagName('input')[0];
                        var numb = document.createElement("label");
                        numbInp.setAttribute('size', '5');
                        jsonString += `{"val":"${numbInp.value}"},`;
                        numb.innerText = numbInp.value;
                        numbInp.replaceWith(numb);

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
	hiddeninput.setAttribute("name", "zawartosc_zamowienia");
	hiddeninput.setAttribute("value", n);
	form.appendChild(hiddeninput);

	form.submit();
} 