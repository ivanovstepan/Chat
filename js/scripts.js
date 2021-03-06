	var name;
	var change =0;
	var indexForChange;
		var theMessage = function(text, userName,id) {
		return {
			message:text,
			user: userName,
			id: id,
		};
	};
	var uniqueId = function() {
		var date = Date.now();
		var random = Math.random() * Math.random();
		return Math.floor(date * random).toString();
	};
	var messageList = [];

	var appState = {
		mainUrl : 'http://localhost:999/chat',
		history:[],
		token : 'TN11EN'
	};
	function run(){
		var appContainer = document.getElementsByClassName('reader')[0];
		appContainer.addEventListener('click', delegateEvent);
		appContainer.addEventListener('change', delegateEvent);
		appContainer.addEventListener('click',delegateName);
		var messageText = document.getElementById("MessageText");
		messageText.addEventListener('keydown', function(e){
			if(e.keyCode == 13)
				onAddButtonClick(e);
		}
		)
		messageText.addEventListener('keydown', function(e){
			if(e.keyCode == 38)
				editLastMessage(e);
		}
		)
		messageText.addEventListener('keydown', function(e){
			if(e.keyCode == 40)
				deleteLastMessage(e);
		}
		)
		getAllMessages();
		updateMessages();		
	}
		function getAllMessages (continueWith) {
		var url = appState.mainUrl + '?token=' + appState.token;
		get(url, function(responseText) {
			checkConnect();
		var response = JSON.parse(responseText);

        createAllMessages(response.messages);

        continueWith && continueWith();
    }, function(){
    	document.getElementById('connection').className="btn offline";
    });
	}

	function createAllMessages(messageList) {
		for(var i = 0; i < messageList.length; i++)
			addMessage(messageList[i]);
		
	}
	
	function deleteLastMessage(){
		var messages = document.getElementsByClassName('SeeOneMessage');
		var names = document.getElementsByClassName('nameOfUser');
		if(!messages.length)return;
		for (var i=messages.length-1;i>0;i--){
			var element  = messages[i];
			 
			if(names[i].innerHTML==name+" : " && messages[i].getElementsByClassName("onlyMessage")[0].innerHTML!=" message has been deleted"){
				deleteMessageFromServer(i,function () {});
		        messages[i].innerHTML='<span class ="nameOfUser">' + name + ' : </span><span class="onlyMessage"> message has been deleted</span>'
		        break;
			}
		}
	}

	function deleteMessageFromServer(index,continueWith) {
		 var indexToken = index*8+11; 
		 var url = appState.mainUrl + '?token=' + "TN" +indexToken.toString() + "EN";
		    del(url, function () {
		     continueWith && continueWith();
		    });
}

	function editLastMessage(){

		change=1;
		var messages = document.getElementsByClassName('SeeOneMessage');
		var names = document.getElementsByClassName('nameOfUser');
		if(!messages.length)return;
		for (var i=messages.length-1;i>0;i--){
			var element  = messages[i];
			if(names[i].innerHTML==name+" : " && messages[i].getElementsByClassName("onlyMessage")[0].innerHTML!=" message has been deleted" ){
				document.getElementById("MessageText").value= element.lastChild.innerHTML;		
				indexForChange=i; 
				break;     
			}
		}

		

	}

	function delegateName(evtObj){
		if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-name')){
			NameAddButtonClick(evtObj);
		}
	}
	function NameAddButtonClick(){
		var MessageText = document.getElementById('NameText');
		name=MessageText.value;
		addName(MessageText.value);
		MessageText.value = '';
		document.getElementById("NameText").setAttribute('disabled',false);

	}

	function addName(value){
		if(!value){ return; }
		var item = createName(value);
		var divItem =document.createElement('div');
		divItem.classList.add('form-group');
		divItem.classList.add('user');
		divItem.setAttribute('id','user');
		divItem.appendChild(item);
		var items = document.getElementsByClassName('user')[0];
		items.appendChild(divItem);
	}

	function createName(text){
		var buttonItem = document.createElement('button');
		buttonItem.classList.add('btn');
		buttonItem.classList.add('btn-info');
		buttonItem.classList.add('form-group');
		buttonItem.classList.add('changeName');
		buttonItem.setAttribute('onclick','editName()');
		buttonItem.appendChild(document.createTextNode(text));
		return buttonItem;
	}

	 function editName() {
		 document.getElementById("NameText").disabled= false;
		 var user = document.getElementsByClassName("changeName");
		 var element=user[user.length-1];
		 document.getElementById("NameText").value= element.innerHTML; 
		 deleteUser();
	}

	function deleteUser(){
		var users = document.getElementsByClassName('changeName');	
		var element  = users[users.length-1];
		element.parentNode.removeChild(element);
	}

	function delegateEvent(evtObj) {
		if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-add')){
			onAddButtonClick(evtObj);
		}	
	}

	function onAddButtonClick(){
		var MessageText = document.getElementById('MessageText');
		var newMessage = theMessage(MessageText.value,name,indexForChange);
		if(MessageText.value == '')
			return;
		MessageText.value = '';
		if(change==1){
			change=0;
			changeMessages(newMessage, function () {  });
		}
		else
		storeMessages(newMessage, function() {
			console.log('Message sent ' + newMessage.text);
		});
	} 

function changeMessages(changeMessage, continueWith) {
    put(appState.mainUrl, JSON.stringify(changeMessage), function () {
        updateMessages();
    });
}
function addAllMessages(message) {
    if (messageList[message.id] == null) {
       var item = createMessage(message);
		var items = document.getElementsByClassName('MessagesPlace')[0];
		messageList.push(message);
		items.appendChild(item);
    }
}
	function addMessage(message) {

		if(!message){
			return;
		}
		var item = createMessage(message);
		var items = document.getElementsByClassName('MessagesPlace')[0];
		messageList.push(message);
		items.appendChild(item);
	}
	function createMessage(text){
		var divItem = document.createElement('div');
		var htmlAsText = '<div class="SeeOneMessage" ><span class ="nameOfUser"> name : </span><span class="onlyMessage">text</span></div>';
		divItem.innerHTML= htmlAsText;
		updateItem(divItem.firstChild, text);
		return divItem.firstChild;
	}

	function updateItem(divItem, task){
		divItem.setAttribute('data', task.id);
		divItem.lastChild.textContent = task.message;
		divItem.firstChild.innerHTML=task.user +' : ' ;
	} 

	function checkConnect(evtObj) {
	 document.getElementById('connection').className="btn online";
	}
	
function updateMessages(continueWith) {
    var url = appState.mainUrl + '?token=' + appState.token;
    get(url, function (responseText) {
        var response = JSON.parse(responseText).messages;
        checkConnect();
        for (var i = 0; i < response.length; i++) {
            var message = response[i];
            if (message.requst == "POST") {
                addAllMessages(message);
            }
            if (message.requst == "PUT") {
                addChangeMessage(message);
            }
            if (message.requst == "DELETE") {
                //addDeleteMessage(message);
            }
        }
        continueWith && continueWith();
    }, function(){
    	document.getElementById('connection').className="btn offline";
    });
    setTimeout(updateMessages, 1000);

}



function addChangeMessage(message) {
    if (messageList[message.id] != null) {
        var select = document.getElementsByClassName("onlyMessage")[message.id];
        select.innerHTML = message.message;
        messageList[message.id] = message;
    }
}


function get(url, continueWith, continueWithError) {
    ajax('GET', url, null, continueWith, continueWithError);
}
function post(url, data, continueWith, continueWithError) {
    ajax('POST', url, data, continueWith, continueWithError);
}
function put(url, data, continueWith, continueWithError) {
    ajax('PUT', url, data, continueWith, continueWithError);
}
function del(url, continueWith, continueWithError) {
    ajax('DELETE', url, null, continueWith, continueWithError);
}
function storeMessages(sendMessage, continueWith) {
    post(appState.mainUrl, JSON.stringify(sendMessage), function () {
        updateMessages();
    });
}

	function isError(text) {
		if(text == "")
			return false;
		
		try {
			var obj = JSON.parse(text);
		} catch(ex) {
			return true;
		}

		return !!obj.error;
	}

	function ajax(method, url, data, continueWith, continueWithError) {
		var xhr = new XMLHttpRequest();

		continueWithError = continueWithError || defaultErrorHandler;
		xhr.open(method || 'GET', url, true);

		xhr.onload = function () {
			if (xhr.readyState !== 4)
				return;

			if(xhr.status != 200) {
				continueWithError('Error on the server side, response ' + xhr.status);
				return;
			}

			if(isError(xhr.responseText)) {
				continueWithError('Error on the server side, response ' + xhr.responseText);
				return;
			}

			continueWith(xhr.responseText);
		};    

		xhr.ontimeout = function () {
			ontinueWithError('Server timed out !');
		}

		xhr.onerror = function (e) {
			var errMsg = 'Server connection error ' + appState.mainUrl + '\n'+
			'\n' +
			'Check if \n'+
			'- server is active\n'+
			'- server sends header "Access-Control-Allow-Origin:*"';

			continueWithError(errMsg);
		};

		xhr.send(data);
	}
	function sendMessage(message, continueWith) {
		post(appState.mainUrl, JSON.stringify(message), function(){
			updateMessages();
		});
	}

	function defaultErrorHandler(message) {
		console.error(message);
	}