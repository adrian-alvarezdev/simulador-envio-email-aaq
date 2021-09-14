//  CREAMOS LAS VARIABLES

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formularioEnviar = document.querySelector('#enviar-mail');
const resetBtn = document.querySelector('#resetBtn');
const er =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// REGISTRO DE EVENT LISTENERS O EVENTOS

eventListeners();

function eventListeners() {
	document.addEventListener('DOMContentLoaded', iniciarApp);

	// REGISTRAMOS LOS EVENTOS QUE SUSEDERAN EN LOS CAMPOS DE LOS FORMULARIOS

	email.addEventListener('blur', validarFormulario);
	asunto.addEventListener('blur', validarFormulario);
	mensaje.addEventListener('blur', validarFormulario);
	// enviar email
	formularioEnviar.addEventListener('submit', enviarEmail);
	// resetear formulario

	btnReset.addEventListener('click', resetear);
}

//  FUNCIONES

// 1. desabilitaremos el boton de enviar
//   cursor-not-allowed 'opacity-50', agregamos estas 2 clase
// para desabilitar el cursor y bahar el color del boton

function iniciarApp() {
	btnEnviar.disabled = true;
	btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// VALIDAMOS LOS CAMPOS

function validarFormulario(e) {
	if (e.target.value.length > 0) {
		// ELIMINAMOS ERRORES

		const error = document.querySelector('p.error');
		if (error) {
			error.remove();
		}

		e.target.classList.remove('fondo-rojo');

		e.target.classList.add('fondo-verde');
	} else {
		e.target.classList.remove('fondo-verde');

		e.target.classList.add('fondo-rojo');

		mostrarError('Todos los campos son obligatorios');
	}

	if (e.target.type === 'email') {
		if (er.test(e.target.value)) {
			// ELIMINAMOS ERRORES

			if (error) {
				error.remove();
			}

			e.target.classList.remove('fondo-rojo');

			e.target.classList.add('fondo-verde');
		} else {
			e.target.classList.remove('fondo-verde');

			e.target.classList.add('fondo-rojo');

			mostrarError('eMAIL NO VALIDO');
		}
	}

	if (er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
		btnEnviar.disabled = false;
		btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
	}
}

// creamos esta funcion para mostrar el mensaje de error

function mostrarError(mensaje) {
	const mensajedeerror = document.createElement('p');
	mensajedeerror.textContent = mensaje;
	mensajedeerror.classList.add(
		'border',

		'background-red-500',
		'text-red-500',
		'p-3',
		'mt-10',
		'text-center',
		'error'
	);

	const errores = document.querySelectorAll('.error');
	if (errores.length === 0) {
		formularioEnviar.appendChild(mensajedeerror);
	}
}

// ENVIA EL EMAIL, MUESTRA EL SPINER Y EL MENSAJE

function enviarEmail(event) {
	event.preventDefault();
	//  mostrar spinner
	const spinner = document.querySelector('#spinner');
	spinner.style.display = 'flex';

	// DESAPUES DE 3 SEGUNDOS OCULTAR EL SPINNER Y MOSTYRTAR EL MENSAJE
	setTimeout(() => {
		spinner.style.display = 'none';
		// mostra mensaje de email enviado
		const mensajeEnviado = document.createElement('p');
		mensajeEnviado.textContent = 'EL MENSAJE SE ENVIO FULL';
		formularioEnviar.insertBefore(mensajeEnviado, spinner);
		mensajeEnviado.classList.add(
			'text-center',
			'my-10',
			'p-5',
			'bg-green-500',
			'text-white'
		);

		setTimeout(() => {
			mensajeEnviado.remove();
			resetear();
		}, 5000);
	}, 3000);
}

//  RESETEAR EL FOMRMULARIO

function resetear(e) {
	formularioEnviar.reset();

	e.preventDefault();
	iniciarApp();
}
