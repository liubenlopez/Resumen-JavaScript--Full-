/*
Create by: Liuben López Aparicio
https://www.linkedin.com/in/liuben-lopez-aparicio/
Date: 27/02/2024
*/

document.addEventListener("DOMContentLoaded", () => {

	let cierreAccordeon = true;
	document.getElementById("buttomActivarCierreAccordeon").addEventListener("click", () => {
		cierreAccordeon = !cierreAccordeon;
		document.querySelectorAll(".accordion-collapse").forEach((element) => {
			if (cierreAccordeon) {
				element.setAttribute("data-bs-parent", "#accordion");
			} else {
				element.removeAttribute("data-bs-parent");
			}
		});
	})

	//--------------------- Eventos -----------------------------
	// >>> propagacion de eventos
	let propagacionDeEventosActiva = false;
	const btnActivarDesactivarPropagacionDeEventos = document.getElementById("btnActivarDesactivarPropagacionDeEventos");
	btnActivarDesactivarPropagacionDeEventos.addEventListener("click", () => {
		propagacionDeEventosActiva = !propagacionDeEventosActiva;
		btnActivarDesactivarPropagacionDeEventos.textContent = propagacionDeEventosActiva ? "Desactivar propagación de eventos" : "Activar propagación de eventos";
	});
	const cajitas = document.querySelectorAll('.divParaPropagacionDeEventos');
	cajitas.forEach(div => {
		div.addEventListener("click", function (e) {
			if (propagacionDeEventosActiva)
				e.stopPropagation(); //para que el evento no se propague hacia el padre 
			console.log('stopPropagation: me diste click', e)
		})
	})
	// >>> preventDefault (Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo)
	let cancelacionDeEventosActiva = false;
	const btnActivarDesactivarCancelacionDeEventos = document.getElementById("btnActivarDesactivarCancelacionDeEventos");
	btnActivarDesactivarCancelacionDeEventos.addEventListener("click", () => {
		cancelacionDeEventosActiva = !cancelacionDeEventosActiva;
		btnActivarDesactivarCancelacionDeEventos.textContent = cancelacionDeEventosActiva ? "Desactivar cancelación de eventos" : "Activar cancelación de eventos";
	});
	const formularioEventoTest = document.querySelector("#formularioEventoTest");
	formularioEventoTest.addEventListener("submit", (e) => {
		if (cancelacionDeEventosActiva) e.preventDefault(); //Si no esta el preventDefault la pagina se va a recargar por el evento submit
		alert("preventDefault activo: " + cancelacionDeEventosActiva);
	});
	const anclaEventoTest = document.querySelector("#anclaEventoTest");
	anclaEventoTest.addEventListener("click", (e) => {
		if (cancelacionDeEventosActiva) e.preventDefault(); //Si no esta el preventDefault la pagina se va a recargar por el evento click al anchor
		alert("preventDefault activo: " + cancelacionDeEventosActiva);
	});
	// >>> Delegación de Eventos (En lugar de agregar un detector de eventos a todos y cada uno de los elementos similares, podemos agregar un detector de eventos
	//     a un elemento principal y llamar a un evento en un objetivo en particular utilizando la propiedad .target del objeto de evento.)
	//     Aquí no hay propagacion de eventos 
	const containerDelegaciónDeEventos = document.querySelector(".containerDelegaciónDeEventos");
	containerDelegaciónDeEventos.addEventListener("click", (e) => {
		if (e.target.id === "hijo") {
			alert("diste click en el mijo");
		}
		if (e.target.matches(".nieto")) {
			alert("diste click en el nieto");
		}
		if (e.target.dataset["div"] === "divPadre") { // data-set: e.target.dataset["div"] ó e.target.dataset.div;
			alert("diste click en padre");
		}
	});
	//--------------------- Eventos fin -----------------------------

	//--------------------- Listas -----------------------------
	// >>> Operaciones básicas con Listas
	const fastFoodList = ["🍕", "🍕", "🍔", "🍟", "🌭", "🍿", "🥓", "🥚", "🧇", "🥞", "🍞", "🥐"];
	const mostrarFastFoodList = () => {
		const divFastFoodList = document.getElementById("divFastFoodList");
		divFastFoodList.textContent = "";
		fastFoodList.forEach((fruta, index) => {
			// console.log(`${index}: ${fruta}`);
			divFastFoodList.textContent += fruta;
		});
	}
	mostrarFastFoodList();
	document.getElementById("buttomFastFoodListPush").addEventListener("click", () => {
		fastFoodList.push("🍕"); //Agrega elemento al final de la lista
		mostrarFastFoodList();
	});
	document.getElementById("buttomFastFoodListUnshift").addEventListener("click", () => {
		fastFoodList.unshift("🍔"); //Agrega elemento al inicio de la lista
		mostrarFastFoodList();
	});
	document.getElementById("buttomFastFoodListPop").addEventListener("click", () => {
		fastFoodList.pop(); //Elimina el último elemento de la lista
		mostrarFastFoodList();
	});
	document.getElementById("buttomFastFoodListShift").addEventListener("click", () => {
		fastFoodList.shift(); //Elimina el primer elemento de la lista
		mostrarFastFoodList();
	});
	// >>> Array methods (que no mutan el array original, sino que devuelven uno nuevo)
	const usersList = [
		{ id: 1, name: "John", age: 34 },
		{ id: 2, name: "Amy", age: 40 },
		{ id: 3, name: "Amy", age: 40 },
		{ id: 4, name: "Robert", age: 10 },
		{ id: 5, name: "Betty", age: 19 },
	];
	let usersListCopia = usersList;
	const mostrarUsersListModificada = () => {
		const divUserList = document.getElementById("divUserList");
		divUserList.textContent = "";
		usersList.forEach((user, index) => {
			divUserList.textContent += (JSON.stringify(user)) + "  ";
		});
		const divUserListModificada = document.getElementById("divUserListModificada");
		divUserListModificada.textContent = "";
		usersListCopia.forEach((user, index) => {
			divUserListModificada.textContent += (JSON.stringify(user)) + "  ";
		});
	}
	mostrarUsersListModificada();
	document.getElementById("buttomUsersListMap").addEventListener("click", () => {
		usersListCopia = usersList.map(user => user.name); //map devuelve el item modificado
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListMap2").addEventListener("click", () => {
		usersListCopia = usersList.map(user => { //map devuelve el item modificado
			// user.age *= 2; //Si se modifica directamente la propiedad si muta a la lista original
			return { id: user.id, name: user.name, age: user.age * 2 };
		});
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListFilter").addEventListener("click", () => {
		usersListCopia = usersList.filter(user => user.age > 30); //filter devuelve el item que coincide con la condición
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListFilter2").addEventListener("click", () => {
		usersListCopia = usersList.filter(user => user.name !== "John"); //filter devuelve el item que coincide con la condición
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListFind").addEventListener("click", () => {
		usersListCopia = usersList.find(user => user.name === "Amy"); //find (devuelve el valor del primer elemento del array que cumple la condicion, si no encuentra devuelve undefined)
		usersListCopia = [usersListCopia];
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListFind2").addEventListener("click", () => {
		usersListCopia = usersList.find(user => user.name === "Paul"); //find (devuelve el valor del primer elemento del array que cumple la condicion, si no encuentra devuelve undefined)
		usersListCopia = [usersListCopia];
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListSome").addEventListener("click", () => {
		usersListCopia = [usersList.some(user => user.name === "Amy")]; //some (comprueba si al menos un elemento del array cumple con la condición (true/false))
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListSome2").addEventListener("click", () => {
		usersListCopia = [usersList.some(user => user.name === "Paul")]; //some (comprueba si al menos un elemento del array cumple con la condición (true/false))
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListFindIndex").addEventListener("click", () => {
		usersListCopia = [usersList.findIndex((user) => user.name === "Amy")]; //findIndex (devuelve el índice del primer elemento de un array que cumpla con la función de prueba proporcionada. En caso contrario devuelve -1.)
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListFindIndex2").addEventListener("click", () => {
		usersListCopia = [usersList.findIndex((user) => user.name === "Paul")]; //findIndex (devuelve el índice del primer elemento de un array que cumpla con la función de prueba proporcionada. En caso contrario devuelve -1.)
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListSlice").addEventListener("click", () => {
		usersListCopia = usersList.slice(1, 3); //slice (devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin (fin no incluido).)
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListSlice2").addEventListener("click", () => {
		usersListCopia = usersList.slice(2, 6); //slice (devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin (fin no incluido).)
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListConcat").addEventListener("click", () => {
		const array1 = ["a", "b", "c", "d"];
		usersListCopia = usersList.concat(array1); //concat (se usa para unir dos o más arrays. Este método no cambia los arrays existentes, sino que devuelve un nuevo array.)
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListSpread").addEventListener("click", () => {
		const array1 = ["a", "b", "c", "d"];
		usersListCopia = [...array1, ...usersList]; //Spread Syntax (permite a un elemento iterable tal como un arreglo o cadena ser expandido en lugares donde son iterados.)
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListReduce").addEventListener("click", () => {
		const array1 = [1, 2, 3, 4, 5];
		usersListCopia = [array1.reduce((acc, valorActual) => acc + valorActual)]; //reduce (El valor devuelto de la funcion reductora se asigna al acumulador, cuyo valor se recuerda en cada iteracion y al final se convierte en el valor resultante)
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListReduce2").addEventListener("click", () => {
		usersListCopia = usersList.reduce((acc, valorActual) => { //reduce (El valor devuelto de la funcion reductora se asigna al acumulador, cuyo valor se recuerda en cada iteracion y al final se convierte en el valor resultante)
			const index = acc.findIndex((user) => user.nombre == valorActual.name);
			if (index == -1) {
				acc.push({ nombre: valorActual.name, cantidad: 1 });
			} else {
				acc[index].cantidad++;
			}
			return acc;
		}, []); //El segundo parametro de la funcion reduce es el tipo de lo q devuelve
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListReduce3").addEventListener("click", () => {
		usersListCopia = [usersList.reduce((acc, valorActual) => { //reduce (El valor devuelto de la funcion reductora se asigna al acumulador, cuyo valor se recuerda en cada iteracion y al final se convierte en el valor resultante)
			acc[valorActual.name] = (acc[valorActual.name] || 0) + 1;
			return acc;
		}, {})]; //El segundo parametro de la funcion reduce es el tipo de lo q devuelve
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListFlat").addEventListener("click", () => {
		const array1 = [1, 2, [3, 4, [5, 6, [7, 8]]]];
		usersListCopia = array1.flat(3); //flat (Aplanar matrices anidadas hasta la profundidad que se le dice, es experimental aun)
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListSplit").addEventListener("click", () => {
		const cadenaMeses = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec";
		usersListCopia = cadenaMeses.split(","); //split (divide un objeto de tipo String en un array mediante un separador)
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListJoin").addEventListener("click", () => {
		const array1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		usersListCopia = [array1.join("-")]; //join (une todos los elementos de una matriz (o un objeto similar a una matriz) en una cadena y devuelve esta cadena (si no se le asigna el separador pone comas))
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListSet").addEventListener("click", () => {
		usersListCopia = new Set(["🍕", "🍕", "🍕", "🍔", "🍟"]);//En el Set no se insertan elementos repetios
		mostrarUsersListModificada();
	});
	document.getElementById("buttomUsersListMapObj").addEventListener("click", () => {
		const objMap = new Map([["pizza", "🍕"], ["burger", "🍔"], ["popcorn", "🍳"]]);//Mapas o diccionarios
		objMap.set("popcorn", "🍿"); //modifica existente
		objMap.set("hot dog", "🌭"); //inserta
		objMap.set("cheese", "🧀"); //inserta
		objMap.delete("hot dog");
		console.log(objMap);
		console.log("has 🌭: ", objMap.has("hot dog"));
		console.log("has 🍔: ", objMap.has("burger"));
		console.log("get 🍔: ", objMap.get("burger"));
		usersListCopia = objMap;
		mostrarUsersListModificada();
	});
	//--------------------- Listas fin -----------------------------

	//--------------------- Objetos -----------------------------
	// >>> Pase de datos por valor (Si es un dato primitivo es por valor)
	let a = "Valor inicial";
	let b = a;
	a = "Valor cambiado";
	console.log("Pase de datos por valor:\n", "a:", a, " | b:", b);
	// >>> Pase de datos por referencia (Si es un dato no primitivo (funct, obj, arrays) es por referencia)
	const arrayA = ["Valor inicial"];
	const arrayB = arrayA;
	arrayA.push("Otro valor");
	console.log("Pase de datos por valor:\n", "arrayA:", arrayA, "\narrayB:", arrayB);
	// >>> (Se denomina objeto literal al objeto cuyas propiedades están declaradas textualmente en el código.)
	// Podemos decir la variable nombre tiene asignada un string literal ya que se asigna el valor "Tom" textualmente.
	const gato = {
		nombre: "Tom",
		duerme: true,
		edad: 5,
		enemigos: ["agua", "perros"],
		metodoComer: function () {
			return `${this.nombre} comiendo`;
		},
		metodoDormir() {
			return `${this.nombre} durmiendo`;
		},
		metodoJugar: () => { //Las funciones flecha no tienen this o super y no se deben usar como metodos
			return `${this.nombre} jugando`;
		},
		listarEnemigos() {
			let enemigos = "";
			this.enemigos.forEach((item, index) => { enemigos += `Enemigo ${index}: ${item}` + (index == this.enemigos.length - 1 ? '' : ' | ') }); //Si se puede usar arrow funct dentro de los metodos
			return enemigos;
		},
		get atributoNombre() {
			return this.nombre;
		},
		set atributoNombre(name) {
			this.nombre = name;
		}
	}
	const mostrarObjetoGato = () => {
		const divObjetoGato = document.getElementById("divObjetoGato");
		divObjetoGato.textContent = JSON.stringify(gato);
	}
	mostrarObjetoGato();
	const operacionesSobreObjetoGato = document.querySelector("#operacionesSobreObjetoGato");
	operacionesSobreObjetoGato.addEventListener("click", (e) => {
		if (e.target.id === "buttomVeryAttrColor") {
			//Si el valor de un atributo puede ser undefined se pregunta por el con ? antes de acceder a sus propiedades (gato.color?.otracosa)
			//Para verificar si tiene el atributo se usa el método hasOwnProperty("color").
			alert("gato.color: " + gato.color + " | gato.hasOwnProperty('color'): " + gato.hasOwnProperty("color"));
			if (!gato.hasOwnProperty("color"))
				gato.color = "pardo"; //Se le pueden agregar propiedades
			console.log("Objeto literal: \n", gato.nombre + ' ' + gato.color + ' ' + gato["edad"]); //Se puede acceder a un atributo de las dos formas obj.attr o obj["attr"]
			mostrarObjetoGato();
		}
		if (e.target.id === "buttomDeleteAttrColor") {
			if (!gato.hasOwnProperty("color"))
				alert('No existe el atributo color')
			delete gato.color; //Eliminando atributos
			mostrarObjetoGato();
		}
		if (e.target.id === "buttomEjecutarMetodos") {
			let resultados = "Resultados de los métodos:\n";
			resultados += gato.metodoComer();
			resultados += " - " + gato.metodoDormir();
			resultados += " - " + gato.metodoJugar();
			resultados += " - " + gato.listarEnemigos();
			alert(resultados);
		}
		if (e.target.id === "buttomIterarAtributos") {
			let atributos = "";
			for (item in gato) { //(for in) es para iterar objetos (for of) para iterar listas
				atributos += "\n" + `${item}: ${gato[item]}`;
			}
			console.log(atributos)
			alert("Total de atributos y métodos:" + atributos);
		}
		if (e.target.id === "buttomObjectKeys") {
			console.log('Object.keys:\n', Object.keys(gato));//Devuelve un array de 'clave'
			alert("Object.keys: " + Object.keys(gato));
		}
		if (e.target.id === "buttomGetOwnPropertyNames") {
			console.log('Object.getOwnPropertyNames:\n', Object.getOwnPropertyNames(gato)); //Similar a keys pero coge las propiedades no numerables tambien
			alert("Object.getOwnPropertyNames: " + Object.getOwnPropertyNames(gato));
		}
		if (e.target.id === "buttomObjectValues") {
			// Object.values(gato) devuelve una list con los valores de los atributos del objeto (lo q es mejor que usar "for in" y despues acceder al atributo "gato[item]" )
			// y eso se puede iterar con forEach ex.: Object.values(gato).forEach(item => console.log(item))
			console.log('Object.values:\n', Object.values(gato));//Devuelve un array 'valor'
			alert("Object.values:\n" + Object.values(gato));
		}
		if (e.target.id === "buttomObjectEntries") {
			console.log('Object.entries:\n', Object.entries(gato));//Devuelve un array de ['clave','valor']
			alert("Object.entries:\n" + Object.entries(gato));
		}
		if (e.target.id === "buttomGet") {
			// >>> get (la funcion get se manejan como si fuera un atributo mas del objeto "sin ponerle parentisis")
			console.log("Get funct. to attrib nombre: ", gato.atributoNombre);
			alert("Get funct. to attrib nombre: " + gato.atributoNombre);
		}
		if (e.target.id === "buttomSet") {
			// >>> set (la funcion set se manejan como si fuera un atributo mas del objeto "sin ponerle parentisis")
			gato.atributoNombre = "Tommy";
			console.log("Get funct. to attrib nombre: ", gato.atributoNombre);
			alert("Get funct. to attrib nombre: " + gato.atributoNombre);
			mostrarObjetoGato();
		}
	});
	// >>> Destructing object (Destructuracion en objetos)
	const mostrarObjetoGatoDestructuring = (valor) => {
		const divObjetoGatoDestructuring = document.getElementById("divObjetoGatoDestructuring");
		divObjetoGatoDestructuring.textContent = valor;
	}
	mostrarObjetoGatoDestructuring(JSON.stringify(gato));
	document.getElementById("destructuringSobreObjetoGato").addEventListener("click", (e) => {
		if (e.target.id === "buttomDestructuringSobreObjetoGato") {
			//Se pueden obtener los atributos y funciones del obj como (const nombreGato = gato.nombre;) de una forma mas simple que esta,
			//Si existe una var con el nombre de uno de los atributos se puede usar un alias (nombre: nombreAlias)
			const { nombre: nombreAlias, duerme, enemigos, otra = "Por defecto", metodoComer } = gato;
			console.log("Destructuring Obj.:\n", nombreAlias, duerme, enemigos, otra, typeof metodoComer);
			console.log("metodoComer: ", metodoComer()); //Los valores que halla dentro del metodo que sean obtenidos con this no van a funcionar porque el metodo esta extraido del Objeto
			mostrarObjetoGatoDestructuring([nombreAlias, duerme, enemigos, otra, metodoComer]);
		}
		if (e.target.id === "buttomDestructuringArray") {
			//Destructuring array
			const [enemigo1, enemigo2, enemigo3] = gato.enemigos;
			console.log("Destructuring Array.:\n", enemigo1, enemigo2, enemigo3);
			mostrarObjetoGatoDestructuring([enemigo1, enemigo2, enemigo3]);
		}
	});
	//--------------------- Objetos fin -----------------------------

	//--------------------- DOM -----------------------------
	document.querySelector("#buttomEjecutarQuerySelector").addEventListener("click", () => {
		// >>> DOM queries
		console.log('querySelector: ', document.querySelector('p')); //querySelector siempre devuelve el primero que coincida aunque haya mas de uno
		console.log('querySelector: ', document.querySelector('#ptext')); //querySelector siempre devuelve el primero que coincida aunque haya mas de uno
		console.log('querySelector: ', document.querySelector('.text-danger')); //querySelector siempre devuelve el primero que coincida aunque haya mas de uno
		console.log('querySelector: ', document.querySelector('.container .text-danger')); //querySelector siempre devuelve el primero que coincida aunque haya mas de uno
		let divMostrarSelectores = document.querySelector('#divMostrarSelectores');
		divMostrarSelectores.textContent = "";
		const newparrafo = document.createElement("p");
		newparrafo.style.cssText = "margin-bottom: 0; margin-top: 10px;";
		newparrafo.textContent = document.querySelector('#ptext').innerHTML;
		divMostrarSelectores.appendChild(newparrafo);
	});
	document.querySelector("#buttomEjecutarQuerySelectorAll").addEventListener("click", () => {
		// >>> DOM queries
		console.log('querySelectorAll: ', document.querySelectorAll('.text-danger'));
		console.log('querySelectorAll: ', document.querySelectorAll('#elementosDePrueba .text-danger'));
		let divMostrarSelectores = document.querySelector('#divMostrarSelectores');
		divMostrarSelectores.textContent = "";
		document.querySelectorAll('#elementosDePrueba .text-danger').forEach((node) => {
			console.log(node);
			const newparrafo = document.createElement("p");
			newparrafo.classList.add(["text-danger"]);
			newparrafo.style.cssText = "margin-bottom: 0; margin-top: 10px;";
			newparrafo.textContent = node.textContent;
			divMostrarSelectores.appendChild(newparrafo);
		});
	});
	// >>> Creacion de elementos y agregado al DOM
	const newparrafo = document.createElement("p");
	newparrafo.textContent = "Parrafo 1 creado desde JS";
	newparrafo.style.cssText = "margin-bottom: 0;";
	const divMostrarElementosCreados = document.querySelector('#divMostrarElementosCreados');
	divMostrarElementosCreados.appendChild(newparrafo);//Genera reflow (si se va a agregar muchos elementos mejor usar fragment)
	const newparrafos = ["Parrafo 2 creado desde JS", "Parrafo 3 creado desde JS"];
	newparrafos.forEach(parrafo => {
		//Agregar contenido con innerHTML representa una vulnerabilidad porque es posible hacer un ataque crosssite scripting mediante el
		// divMostrarElementosCreados.innerHTML += "<img src='x' onerror='alert(\"Ejecutado desde un innerHTML\")'>"; 
		divMostrarElementosCreados.innerHTML += `<p style="margin-bottom: 0; margin-top: 10px;">${parrafo}</p>`;//Genera reflow (si se va a agregar muchos elementos mejor usar fragment)
	});
	document.getElementById("buttomCrearElemento").addEventListener("click", () => {
		const newparrafo = document.createElement("p");
		newparrafo.textContent = "Parrafo " + (divMostrarElementosCreados.childElementCount + 1) + " creado desde JS";
		newparrafo.style.cssText = "margin-bottom: 0; margin-top: 10px;";
		divMostrarElementosCreados.appendChild(newparrafo);//Genera reflow (si se va a agregar muchos elementos mejor usar fragment)
	});
	document.getElementById("buttomGenerarFragment").addEventListener("click", () => {
		const divMostrarFragmentCreado = document.querySelector('#divMostrarFragmentCreado');
		const myfragment = document.createDocumentFragment();
		const newparrafos2 = ["Parrafo 1 creado desde JS", "Parrafo 2 creado desde JS", "Parrafo 3 creado desde JS"];
		newparrafos2.forEach(parrafo => {
			const p = document.createElement("p");
			p.style.cssText = "margin-bottom: 0; margin-top: 10px;";
			p.textContent = parrafo + " (from fragment)";
			myfragment.appendChild(p);//No genera reflow porque es una estructura en memoria que no esta agregada en el DOM
		});
		const referenciaNodo = divMostrarFragmentCreado.firstChild;
		divMostrarFragmentCreado.insertBefore(myfragment, referenciaNodo);//Igual a appendChild pero inserta antes de un nodo que se le da como referencia
	});
	document.getElementById("buttomGenerarTemplate").addEventListener("click", () => {
		const templateParrafo = document.querySelector('#templateParrafo');//Se obtiene el template y se debe clonar
		const clone = templateParrafo.content.cloneNode(true);
		clone.querySelector('p').textContent = "Párrafo generado a través de un HTML template"
		document.getElementById("divMostrarTemplate").appendChild(clone);
	});
	//--------------------- DOM fin -----------------------------

	//--------------------- Formularios -----------------------------
	// >>> Expresiones Regulare (Las expresiones regulares (a menudo llamadas RegExp o RegEx) son patrones que se utilizan para hacer coincidir combinaciones de caracteres en cadenas.)
	//     /patron/flags
	// 	   i Ignora mayúsculas y minúsculas. Se suele denominar insensible a mayús/minús.
	//     g Búsqueda global. Sigue buscando coincidencias en lugar de pararse al encontrar una.
	//     m Multilínea. Permite a ^ y $ tratar los finales de línea \r o \n
	const regExpLiteral = /bluuweb/i; //notación literal
	const regExpObjeto = new RegExp("bluuweb", "i"); //notación de objeto
	console.log("RegExp: ", regExpLiteral.test("BLuUweb")); // true
	console.log("RegExp: ", regExpLiteral.test("bluweb")); // false
	console.log("RegExp: ", regExpObjeto.test("BLuUwEB")); // true
	console.log("RegExp: ", regExpObjeto.test("bluweb")); // false
	const regExpLiteral2 = /[0-9]/gi;
	console.log("RegExp: ", regExpLiteral2.test("234")); //true
	const regExpLiteral3 = /bluuweb|bluweb/gi;
	console.log("RegExp: ", regExpLiteral3.test("bluweb")); // true
	// >>> Formulario validado con HTML5
	document.getElementById("formularioValidadoConHTML").addEventListener("submit", (e) => {
		e.preventDefault();
		const formulariouserName = document.querySelector("#formularioValidadoConHTML input[name='userName']");
		const formulariouserEmail = document.querySelector("#formularioValidadoConHTML input[name='userEmail']");
		document.getElementById("divMostrarValoresForm").innerHTML = "<div class='mt10'>Nombre: " + formulariouserName.value + "</div>" + "<div>Email: " + formulariouserEmail.value + "</div>"
	});
	// >>> Formulario validado con JS
	const formulario2userName = document.querySelector("#formularioValidadoConJS input[name='userName']");
	const formulario2userEmail = document.querySelector("#formularioValidadoConJS input[name='userEmail']");
	const alertSuccess = document.getElementById("alertSuccess");
	const alertName = document.getElementById("alertName");
	const alertEmail = document.getElementById("alertEmail");
	const pintarMensajeExito = () => {
		alertSuccess.classList.remove("d-none");
		alertSuccess.textContent = "Mensaje enviado con éxito";
	};
	const pintarMensajeError = (errores) => {
		console.log("errores: ", errores);
		errores.forEach((item) => {
			item.tipo.classList.remove("d-none");
			item.tipo.textContent = item.msg;
		});
	};
	document.getElementById("formularioValidadoConJS").addEventListener("submit", (e) => {
		e.preventDefault();
		console.log(formulario2userName.value);
		console.log(formulario2userEmail.value);
		const regUserName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
		const regUserEmail = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
		alertSuccess.classList.add("d-none");
		const errores = [];
		// Todo esto lo hace bootstrap mas facil 'invalid-feedback'
		if (!regUserName.test(formulario2userName.value) || !formulario2userName.value.trim()) {
			formulario2userName.classList.add("is-invalid");
			errores.push({
				tipo: alertName,
				msg: "Formato no válido en el campo nombre, inserte solo letras",
			});
		} else {
			formulario2userName.classList.remove("is-invalid");
			formulario2userName.classList.add("is-valid");
			alertName.classList.add("d-none");
		}
		if (!regUserEmail.test(formulario2userEmail.value) || !formulario2userEmail.value.trim()) {
			formulario2userEmail.classList.add("is-invalid");
			errores.push({
				tipo: alertEmail,
				msg: "Escriba un correo válido",
			});
		} else {
			formulario2userEmail.classList.remove("is-invalid");
			formulario2userEmail.classList.add("is-valid");
			alertEmail.classList.add("d-none");
		}
		if (errores.length !== 0) {
			pintarMensajeError(errores);
			return;
		}
		console.log("Formulario enviado con éxito");
		pintarMensajeExito();
		// >>> FormData ( La interfaz FormData proporciona una manera sencilla de construir un conjunto de parejas clave/valor que representan los campos de un formulario y sus valores, que pueden ser enviados fácilmente.)
		const inputsFormData = new FormData(document.getElementById("formularioValidadoConJS"));
		console.log("FormData: ", inputsFormData);
		console.log("FormData: (get('userName')) ", inputsFormData.get("userName"));
		console.log("FormData: (get('userEmail)) ", inputsFormData.get("userEmail"));
		for (let campo of inputsFormData.values()) {
			console.log("FormData: (values) ", campo);
		}
		for (let campo of inputsFormData.entries()) {
			console.log("FormData: (entries) ", campo);
		}
		document.getElementById("divMostrarValoresForm").innerHTML = "<div class='mt10'>Nombre: " + formulario2userName.value + "</div>" + "<div>Email: " + formulario2userEmail.value + "</div>"
	});
	//--------------------- Formularios fin -----------------------------

	//--------------------- Async -----------------------------
	// >>> Callbacks (Una función de callback es una función que se pasa a otra función como un argumento, que luego se invoca dentro de la función externa para completar algún tipo de rutina o acción.)
	const posts = [
		{
			userId: 1,
			id: 1,
			title: "sunt aut facere repellat provident",
			body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit",
		},
		{
			userId: 1,
			id: 2,
			title: "qui est esse",
			body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat",
		},
		{
			userId: 1,
			id: 3,
			title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
			body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel",
		},
	];
	const findPostById = (id, callback) => {
		setTimeout(() => {
			const post = posts.find(item => item.id == id);
			if (post) {
				callback(null, post); //Por convencion el primer argumento de una funcion callback siempre es error y el segun es la respuesta de exito
			} else {
				callback(`No se encontro el post ${id}`);
			}
		}, 2000);
	}
	document.getElementById("buttomCallbakFindPostById1").addEventListener("click", () => {
		document.getElementById("divResultadoCallbaks").textContent = "Buscando...";
		findPostById(1, (error, post) => {
			if (error) {
				document.getElementById("divResultadoCallbaks").textContent = error;
				return console.log("callback: ", error); //Este return dentro de un if hace una funcion similar a break
			}
			document.getElementById("divResultadoCallbaks").textContent = JSON.stringify(post);
			console.log("callback: ", post);
		});
	});
	document.getElementById("buttomCallbakFindPostById4").addEventListener("click", () => {
		document.getElementById("divResultadoCallbaks").textContent = "Buscando...";
		findPostById(4, (error, post) => {
			if (error) {
				document.getElementById("divResultadoCallbaks").textContent = error;
				return console.log("callback: ", error); //Este return dentro de un if hace una funcion similar a break
			}
			document.getElementById("divResultadoCallbaks").textContent = JSON.stringify(post);
			console.log("callback: ", post);
		});
	});
	document.getElementById("buttomCallbakFindPostByIdRange").addEventListener("click", () => {
		document.getElementById("divResultadoCallbaks").textContent = "Buscando...";
		findPostById(1, (error, post) => { // Callback Hell (Para evitar esto se inventaron las promesas)
			document.getElementById("divResultadoCallbaks").textContent = "";
			if (error) {
				document.getElementById("divResultadoCallbaks").innerHTML = "<div>" + error + "</div>";
			} else {
				document.getElementById("divResultadoCallbaks").innerHTML = "<div>" + JSON.stringify(post) + "</div>";
				console.log("callback 1: ", post);
				findPostById(2, (error, post) => {
					if (error) {
						document.getElementById("divResultadoCallbaks").innerHTML += "<div>" + error + "</div>";
					} else {
						document.getElementById("divResultadoCallbaks").innerHTML += "<div>" + JSON.stringify(post) + "</div>";
						console.log("callback 2: ", post);
						findPostById(3, (error, post) => {
							if (error) {
								document.getElementById("divResultadoCallbaks").innerHTML += "<div>" + error + "</div>";
							} else {
								document.getElementById("divResultadoCallbaks").innerHTML += "<div>" + JSON.stringify(post) + "</div>";
								console.log("callback 3: ", post);
								findPostById(4, (error, post) => {
									if (error) {
										document.getElementById("divResultadoCallbaks").innerHTML += "<div>" + error + "</div>";
									} else {
										document.getElementById("divResultadoCallbaks").innerHTML += "<div>" + JSON.stringify(post) + "</div>";
										console.log("callback 4: ", post);
									}
								});
							}
						});
					}
				});
			}

		});
	});
	document.getElementById("buttomCallbakFindPostById142").addEventListener("click", () => {
		document.getElementById("divResultadoCallbaks").textContent = "Buscando...";
		findPostById(1, (error, post) => { // Callback Hell (Para evitar esto se inventaron las promesas)
			document.getElementById("divResultadoCallbaks").textContent = "";
			if (error) {
				document.getElementById("divResultadoCallbaks").innerHTML = "<div>" + error + "</div>";
			} else {
				document.getElementById("divResultadoCallbaks").innerHTML = "<div>" + JSON.stringify(post) + "</div>";
				console.log("callback 1: ", post);
				findPostById(4, (error, post) => {
					if (error) {
						document.getElementById("divResultadoCallbaks").innerHTML += "<div>" + error + "</div>";
						document.getElementById("divResultadoCallbaks").innerHTML += "<div>Si hay un error no continua el proceso</div>";
					} else {
						document.getElementById("divResultadoCallbaks").innerHTML += "<div>" + JSON.stringify(post) + "</div>";
						console.log("callback 2: ", post);
						findPostById(2, (error, post) => {
							if (error) {
								document.getElementById("divResultadoCallbaks").innerHTML += "<div>" + error + "</div>";
							} else {
								document.getElementById("divResultadoCallbaks").innerHTML += "<div>" + JSON.stringify(post) + "</div>";
								console.log("callback 3: ", post);
							}
						});
					}
				});
			}

		});
	});
	// >>> Promesas (Una Promise es un objeto que representa la terminación o el fracaso de una operación asíncrona. El codigo que debajo de la promesa se sigue ejecutando.)
	const findPostByIdWithPromise = (id) => new Promise((resolve, reject) => {
		setTimeout(() => {
			const post = posts.find(item => item.id == id);
			if (post) {
				resolve(post);
			} else {
				reject(`No se encontro el post ${id}`);
			}
		}, 2000);
	});
	document.getElementById("buttomPromesasFindPostById1").addEventListener("click", () => {
		document.getElementById("divResultadoPromesas").textContent = "Buscando...";
		findPostByIdWithPromise(1)
			.then(post => {
				document.getElementById("divResultadoPromesas").textContent = JSON.stringify(post);
				console.log("Promise resolve 1: \n", post);
			})
			.catch(e => {
				document.getElementById("divResultadoPromesas").textContent = e;
				console.log("Promise reject: \n", e)
			});
	});
	document.getElementById("buttomPromesasFindPostById4").addEventListener("click", () => {
		document.getElementById("divResultadoPromesas").textContent = "Buscando...";
		findPostByIdWithPromise(4)
			.then(post => {
				document.getElementById("divResultadoPromesas").textContent = JSON.stringify(post);
				console.log("Promise resolve 1: \n", post);
			})
			.catch(e => {
				document.getElementById("divResultadoPromesas").textContent = e;
				console.log("Promise reject: \n", e)
			});
	});
	document.getElementById("buttomPromesasFindPostByIdRange").addEventListener("click", () => {
		document.getElementById("divResultadoPromesas").textContent = "Buscando...";
		findPostByIdWithPromise(1)
			.then(post => {
				document.getElementById("divResultadoPromesas").innerHTML = "<div>" + JSON.stringify(post) + "</div>";
				console.log("Promise resolve 1: \n", post);
				return findPostByIdWithPromise(2);
			})
			.then(post => {
				document.getElementById("divResultadoPromesas").innerHTML += "<div>" + JSON.stringify(post) + "</div>";
				console.log("Promise resolve 2: \n", post);
				return findPostByIdWithPromise(3);
			})
			.then(post => {
				document.getElementById("divResultadoPromesas").innerHTML += "<div>" + JSON.stringify(post) + "</div>";
				console.log("Promise resolve 3: \n", post);
				return findPostByIdWithPromise(4);
			})
			.catch(e => {
				document.getElementById("divResultadoPromesas").innerHTML += "<div>" + e + "</div>";
				console.log("Promise reject: \n", e);
			});
	});
	document.getElementById("buttomPromesasFindPostById142").addEventListener("click", () => {
		document.getElementById("divResultadoPromesas").textContent = "Buscando...";
		findPostByIdWithPromise(1)
			.then(post => {
				document.getElementById("divResultadoPromesas").innerHTML = "<div>" + JSON.stringify(post) + "</div>";
				console.log("Promise resolve 1: \n", post);
				return findPostByIdWithPromise(4);
			})
			.then(post => {
				document.getElementById("divResultadoPromesas").innerHTML += "<div>" + JSON.stringify(post) + "</div>";
				console.log("Promise resolve 2: \n", post);
				return findPostByIdWithPromise(2);
			})
			.then(post => {
				document.getElementById("divResultadoPromesas").innerHTML += "<div>" + JSON.stringify(post) + "</div>";
				console.log("Promise resolve 3: \n", post);
				return findPostByIdWithPromise(3);
			})
			.catch(e => {
				document.getElementById("divResultadoPromesas").innerHTML += "<div>" + e + "</div>";
				document.getElementById("divResultadoPromesas").innerHTML += "<div>Si hay un error no continua el proceso</div>";
				console.log("Promise reject: \n", e);
			});
	});
	// >>> async await (await siempre espera una promesa)
	//siempre que haya un await hay que marcar la funcion como asycn
	document.getElementById("buttomAsyncAwaitFindPostById1").addEventListener("click", () => {
		const buscar = async (id) => {
			document.getElementById("divResultadoAsyncAwait").textContent = "Buscando...";
			try {
				const post = await findPostByIdWithPromise(id);
				document.getElementById("divResultadoAsyncAwait").innerHTML = "<div>" + JSON.stringify(post) + "</div>";
				console.log("async await: \n", post);
			} catch (e) {
				document.getElementById("divResultadoAsyncAwait").innerHTML = "<div>" + e + "</div>";
				console.log("async await error: \n", e);
			}
		}
		buscar(1);
	});
	document.getElementById("buttomAsyncAwaitFindPostById4").addEventListener("click", () => {
		const buscar = async (id) => {
			document.getElementById("divResultadoAsyncAwait").textContent = "Buscando...";
			try {
				const post = await findPostByIdWithPromise(id);
				document.getElementById("divResultadoAsyncAwait").innerHTML = "<div>" + JSON.stringify(post) + "</div>";
				console.log("async await: \n", post);
			} catch (e) {
				document.getElementById("divResultadoAsyncAwait").innerHTML = "<div>" + e + "</div>";
				console.log("async await error: \n", e);
			}
		}
		buscar(4);
	});
	document.getElementById("buttomAsyncAwaitFindPostByIdRange").addEventListener("click", () => {
		const buscarMultipleSecuencial = async () => {
			document.getElementById("divResultadoAsyncAwait").textContent = "Buscando...";
			try {
				//Se puede hacer multiples llamadas a promesas desde dentro de una funcion async 
				//(pero lo que esta debajo de await no se ejecuta hasta que se responde la anterior y si da error salta sin ejecutar lo que sigue)
				const post1 = await findPostByIdWithPromise(1);
				document.getElementById("divResultadoAsyncAwait").innerHTML = "<div>" + JSON.stringify(post1) + "</div>";
				console.log("async await: \n", post1);
				const post2 = await findPostByIdWithPromise(2);
				document.getElementById("divResultadoAsyncAwait").innerHTML += "<div>" + JSON.stringify(post2) + "</div>";
				console.log("async await: \n", post2);
				const post3 = await findPostByIdWithPromise(3);
				document.getElementById("divResultadoAsyncAwait").innerHTML += "<div>" + JSON.stringify(post3) + "</div>";
				console.log("async await: \n", post3);
				const post4 = await findPostByIdWithPromise(4);
				document.getElementById("divResultadoAsyncAwait").innerHTML += "<div>" + JSON.stringify(post4) + "</div>";
				console.log("async await: \n", post4);
			} catch (e) {
				document.getElementById("divResultadoAsyncAwait").innerHTML += "<div>" + e + "</div>";
				console.log("async await error: \n", e);
			}
		}
		buscarMultipleSecuencial();
	});
	document.getElementById("buttomAsyncAwaitFindPostById142").addEventListener("click", () => {
		const buscarMultipleSecuencial = async () => {
			document.getElementById("divResultadoAsyncAwait").textContent = "Buscando...";
			try {
				//Se puede hacer multiples llamadas a promesas desde dentro de una funcion async 
				//(pero lo que esta debajo de await no se ejecuta hasta que se responde la anterior y si da error salta sin ejecutar lo que sigue)
				const post1 = await findPostByIdWithPromise(1);
				document.getElementById("divResultadoAsyncAwait").innerHTML = "<div>" + JSON.stringify(post1) + "</div>";
				console.log("async await: \n", post1);
				const post4 = await findPostByIdWithPromise(4);
				document.getElementById("divResultadoAsyncAwait").innerHTML += "<div>" + JSON.stringify(post4) + "</div>";
				console.log("async await: \n", post4);
				const post2 = await findPostByIdWithPromise(2);
				document.getElementById("divResultadoAsyncAwait").innerHTML += "<div>" + JSON.stringify(post2) + "</div>";
				console.log("async await: \n", post2);
			} catch (e) {
				document.getElementById("divResultadoAsyncAwait").innerHTML += "<div>" + e + "</div>";
				document.getElementById("divResultadoAsyncAwait").innerHTML += "<div>Si hay un error no continua el proceso</div>";
				console.log("async await error: \n", e);
			}
		}
		buscarMultipleSecuencial();
	});
	document.getElementById("buttomAsyncAwaitPromiseAll").addEventListener("click", () => {
		document.getElementById("divResultadoAsyncAwait").textContent = "Buscando...";
		const buscarMultipleSimultanea = async () => {
			try {
				//Se puede hacer multiples llamadas a promesas con await Promise.all, 
				//pero no las llamadas son simultaneas (si da alguna un error se cancelan todas las Promesas y salta al catch)
				const resultadosPosts = await Promise.all([
					findPostByIdWithPromise(1),
					findPostByIdWithPromise(2),
					// findPostByIdWithPromise(4),
					findPostByIdWithPromise(3)
				]);
				document.getElementById("divResultadoAsyncAwait").textContent = "";
				resultadosPosts.forEach((post) => {
					document.getElementById("divResultadoAsyncAwait").innerHTML += "<div>" + JSON.stringify(post) + "</div>";
				})
				console.log(">> async await Promise.all: \n", resultadosPosts);
			} catch (e) {
				document.getElementById("divResultadoAsyncAwait").innerHTML = "<div>" + e + "</div>";
				console.log(">> async await error Promise.all: \n", e);
			}
		}
		buscarMultipleSimultanea();
	});
	//--------------------- Async fin -----------------------------

	//--------------------- Fetch -----------------------------
	// >>> fetch (La API Fetch proporciona una interfaz para recuperar recursos (incluso a través de la red))
	//fetch (traer/buscar) If you throw the ball the dog will fetch it, 
	//fetch devuelve una Promise
	const mostrarResultadosDeFetch = (posts) => {
		document.getElementById("divResultadoFetch").textContent = "";
		document.getElementById("fetchRespCount").textContent = "";
		posts.forEach((post) => {
			document.getElementById("divResultadoFetch").innerHTML += "<div>" + JSON.stringify(post) + "</div>";
		});
		document.getElementById("fetchRespCount").textContent = posts.length;
	}
	document.getElementById("buttomFetchFindPostById1").addEventListener("click", () => {
		document.getElementById("divResultadoFetch").textContent = "Buscando...";
		fetch("https://jsonplaceholder.typicode.com/posts/1")
			.then(response => { return response.json() }) //Hay que hacerle un them a response.json() porque lo que devuelve es un Promise tambien
			.then(json => { mostrarResultadosDeFetch([json]); })
			.catch(error => console.log('fetch error: ', error))
			.finally(() => console.log("fetch finalizó, Id:1"));
	});
	document.getElementById("buttomFetchFindPostById4").addEventListener("click", async () => {
		document.getElementById("divResultadoFetch").textContent = "Buscando...";
		const id = 4;
		try {
			const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
			const json = await res.json();
			mostrarResultadosDeFetch([json]);
		} catch (e) {
			console.log("fetch error: ", e);
		}
	});
	document.getElementById("buttomFetchFindPostAll").addEventListener("click", async () => {
		document.getElementById("divResultadoFetch").textContent = "Buscando...";
		try {
			const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
			const data = await res.json();
			mostrarResultadosDeFetch(data);
		} catch (e) {
			console.log("fetch error: ", e);
		}
	});
	//Emjemplo contra la REST API de rick y morty
	const loadingData = estado => {
		const loading = document.querySelector("#loading");
		if (estado) {
			loading.classList.remove('d-none');
		} else {
			loading.classList.add('d-none');
		}
	}
	loadingData(false);
	const pintarCard = data => {
		const cards = document.querySelector("#card-dinamica");
		const templateCard = document.querySelector("#template-card").content;
		const fragment = document.createDocumentFragment(); //Lo guarda aparte del DOM para renderizar una sola vez el DOM
		data.results.forEach(element => {
			const clone = templateCard.cloneNode(true);
			clone.querySelector("h5").textContent = element.name;
			clone.querySelector("p").textContent = element.species;
			clone.querySelector("img").setAttribute("src", element.image);
			fragment.appendChild(clone);
		});
		cards.appendChild(fragment);
	}
	document.getElementById("buttomFetchGetAllCharacters").addEventListener("click", async () => {
		try {
			loadingData(true);
			const res = await fetch("https://rickandmortyapi.com/api/character");
			const data = await res.json();
			pintarCard(data);
		} catch (e) {
			console.log("fetchData error: ", e)
		} finally {
			loadingData(false);
		}
	})
	//--------------------- Fetch fin -----------------------------


	//--------------------- Objetos -----------------------------
	// >>> POO (JS es un lenguaje basado en prototipos pero tiene formas de usar la programación orientada a objetos)
	function Persona(nombre) { //función constructora del objeto persona 
		this.nombre = nombre;
	}
	const persona1 = new Persona("Carlos");
	console.log(persona1);
	const mostrarObjetoPersona = () => {
		document.getElementById("divMostrarObjetoPersona").innerHTML = "<div>nombre: " + persona1.nombre + "</div>";
	}
	mostrarObjetoPersona();
	document.getElementById("buttomAddPrototypeSaludar").addEventListener("click", () => {
		//Los metodos prototipos no estan instanciados en los objetos, solo se usan o se instancian en 
		//los objetos que los necesiten (ahorro de memoria)
		if (!persona1.saludar) {
			document.getElementById("divMostrarObjetoPersona").innerHTML += "<div>saludar: function () {...} </div>";
		}
		//La funcion saludar se agrega al prototipo de la funcion Persona, junto al constructor de esta, 
		//por lo que no se refleja en directamente en las instancias de esta (persona1)
		Persona.prototype.saludar = function () {
			return `${this.nombre} dice hola!`;
		}
		console.log(persona1);
	});
	document.getElementById("buttomSaludar").addEventListener("click", () => {
		if (persona1.saludar) {
			document.getElementById("divMostrarSaludo").innerHTML = "<div>" + (persona1.saludar()) + "</div>";
		} else {
			document.getElementById("divMostrarSaludo").innerHTML = "<div>El objeto Persona (Carlos) no tiene el método saludar, debe agregarlo.</div>";
		}
		console.log(persona1);
	});
	//Clases
	//Esto es por detras es igual a la funcion constructora de Persona (function Persona(nombre)) pero mas comprencible
	//Los metodos dentro de un objeto definido con class se comvierten automaticamente en funciones protoripo (Persona.prototype.saludar)
	class ClasePersona {
		constructor(name = "Nombre default", age = 0) {//Se puede setiar los valores por default
			this.name = name;
			this.age = age;
		}
		saludar = function () { return `${this.name} dice hola desde la clase Persona`; };
	}
	let myClase = new ClasePersona("Marta", 34); //Si pones solo una se asume q es la primera ClasePersona(34), para que se pase a la segunda hay que rellenar con null ClasePersona(null,34)
	const mostrarClasePersona = () => {
		console.log("Clase Persona: ", myClase.name + " " + myClase.age);
		document.getElementById("divMostrarClasePersona").innerHTML = "<div>name: " + myClase.name + "</div>";
		document.getElementById("divMostrarClasePersona").innerHTML += "<div>age: " + myClase.name + "</div>";
		document.getElementById("divMostrarClasePersona").innerHTML += "<div>saludar: function () {...} </div>";
	}
	mostrarClasePersona();
	document.getElementById("buttomSaludarClasePersona").addEventListener("click", () => {
		document.getElementById("divMostrarSaludoClasePersona").innerHTML = "<div>" + (myClase.saludar()) + "</div>";
		console.log("Clase Persona: ", myClase.saludar());
	});
	//Herancia
	class Estudiante extends ClasePersona {
		#notas = []; //Atributos privados con #, no accesibles fuera de la clase (Aunque en el front end todo es publico porque si se imprime el estudiante este campo se ve, es solo organizativo para evitar colisiones)
		constructor(name, edad, notas = []) {
			super(name, edad);
			this.#notas = notas;
		}
		saludar = function () { return `${this.name} dice hola desde la clase Estudiante`; }; //Este metodo sobre escribe al padre (Se llama polimorfismo)
		set _notas(nota) { this.#notas.push(nota); }
		get _notas() { return this.#notas; }
	}
	const estudiante = new Estudiante("Maria", 25); //Si no se definen en el constructor de estudiante la captura de los datos que se le pasan a la clase esta se los pasa al constructor de la clase superior
	estudiante._notas = 9;
	estudiante._notas = 8;
	estudiante._notas = 10;
	const mostrarClaseEstudiante = () => {
		console.log("Clase Estudiante: ", estudiante.name + " " + estudiante.age + " " + estudiante._notas);
		document.getElementById("divMostrarClaseEstudiante").innerHTML = "<div>name: " + estudiante.name + "</div>";
		document.getElementById("divMostrarClaseEstudiante").innerHTML += "<div>age: " + estudiante.age + "</div>";
		document.getElementById("divMostrarClaseEstudiante").innerHTML += "<div>notas: " + estudiante._notas + "</div>";
		document.getElementById("divMostrarClaseEstudiante").innerHTML += "<div>saludar: function () {...} </div>";
		document.getElementById("divMostrarClaseEstudiante").innerHTML += "<div>set _notas(nota) {...} </div>";
		document.getElementById("divMostrarClaseEstudiante").innerHTML += "<div>get _notas() {...} </div>";
	}
	mostrarClaseEstudiante();
	document.getElementById("buttomSaludarClaseEstudiante").addEventListener("click", () => {
		document.getElementById("divMostrarSaludoClaseEstudiante").innerHTML = "<div>" + (estudiante.saludar()) + "</div>";
		console.log("Clase Estudiante: ", estudiante.saludar());
	});
	document.getElementById("buttomAgregarNotaClaseEstudiante").addEventListener("click", () => {
		estudiante._notas = 7;
		mostrarClaseEstudiante();
	});
	//--------------------- Objetos fin -----------------------------

});

//--------------------- Módulos -----------------------------
// >>> JS módulos (Proporcionar mecanismos para dividir código JavaScript en módulos separados, que se puedan importar cuando sea necesario)
// (requiere servidor porque directo desde el file da error de CORS) Si se importa algo hay que ir al html y declarar el script como type="module" y Si es js el script q se importa hay que agregar la extencion o da error la importacion
//IIFE (Immediately invoked function expression) Es un patrón de diseño también conocido cómo función autoejecutable que sirve para encapsular codigo
//y evitar colisiones entre las variable o funciones del controller y los modulos (funcionAnonima(){})()
//La función se convierte en una expresión de función que es ejecutada inmediatamente. La variable dentro de la expresíon no puede ser accesada desde afuera.
//Desventaja: No tenemos alcance de nuestras variables y se nos puede salir de las manos.
(function () {
	//No hay colisión entre esta variable y la del modulo1 con el mismo nombre
	const varDeFuncionAutoejecutable = "Variable de Funcion Autoejecutable en el controlador.";
	console.log(varDeFuncionAutoejecutable);
})();
//export e import
// para acceder a las funciones del módulo hay que exportarlas. Esto se hace usando la declaración export.
// Se pueden exportar funciones, var, let, const y, como veremos más adelante clases.
import { frutas } from "./modules/modulo1.js"
console.log(frutas);
//Se pueden usar alias para el elemento que se va a exportar con vistas a evitar colisiones de nombres
import { mostrarMelones, aliasFunctMostrarMangos, Fruta as ClaseFruta } from "./modules/modulo2.js";
console.log(mostrarMelones());
console.log(aliasFunctMostrarMangos());
const fruta = new ClaseFruta("🥥"); //wind + . (abre los emojis)
console.log("Objeto desde modulo2: ", fruta);
// >>> Otra variante de importacion
// import * as Modulo2 from "./modulo2.js"
// console.log(Modulo2.frutas);
// Modulo2.pintarMelones();
// Modulo2.pintarMangos();
// const fruta = new Modulo2.Fruta("🥥");
// console.log("Objeto desde modulo2: ", fruta);
document.getElementById("buttomElementosModulo1").addEventListener("click", () => {
	document.getElementById("divResultadoModulos").textContent = "Frutas desde modulo1: " + frutas;
});
document.getElementById("buttomElementosModulo2").addEventListener("click", () => {
	document.getElementById("divResultadoModulos").innerHTML = "<div>" + mostrarMelones() + "</div><div>" + aliasFunctMostrarMangos() + "</div>";
});
//--------------------- Módulos fin -----------------------------

/*
Create by: Liuben López Aparicio
https://www.linkedin.com/in/liuben-lopez-aparicio/
Date: 27/02/2024
*/