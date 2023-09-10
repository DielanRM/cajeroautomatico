
const database = [
    {user: "miguel",
    pass: "123",
    saldo: "100"
    },
    {user: "guadalupe",
    pass: "234",
    saldo: "200"
    },
    {user: "alan",
    pass: "345",
    saldo: "300"}
]






//inicia sesión y abre en nueva pagina
function ingresar(){
    let username = document.getElementById("userName").value;
    let password = document.getElementById("passWord").value;
    let mensaje = document.getElementById("mensaje");
  
    for(let i = 0; i < database.length; i++){

    if(database[i].user === username && database[i].pass === password){
        window.location.href = "inicio.html"; 
        localStorage.setItem("nombre",username);    
    }
    else{
        mensaje.style.color = "red";
        mensaje.innerHTML = "Datos Incorrectos";
    }
  }
}






//Registra Nuevo Usuario
function registrar(){
        window.location.href = "registro.html"; 
}


//crea la cuenta de un nuevo usuario
function crearCuenta(){
    let nvoUsuario = document.getElementById("nvoUsuario").value;
    let contrasena = document.getElementById("contrasena").value;
    let contrasena2 = document.getElementById("contrasena2").value;
    let mensaje = document.getElementById("mensaje");
   
    
    if(contrasena === contrasena2){
        window.location.href = "index.html"; 
        localStorage.setItem("nombre1",nvoUsuario);
        localStorage.setItem("pass",contrasena);
        }
        else{
        mensaje.style.color = "red";
        mensaje.innerHTML = "La contraseña no coincide";
    }
}


//Variable global
let nombre = localStorage.getItem("nombre");
let nombre1 = localStorage.getItem("nombre1");
let bienvenida = document.getElementById("bienvenida");
var mostrar = document.getElementById("mostrar");


// agrega nuevo usuario al arreglo
let contra_sena = localStorage.getItem("pass");
database.push({user: nombre1, pass: contra_sena, saldo: 0});///////////////////////////////////////////////////////////
console.log(database);



//texto de bienbenida
bienvenida.innerHTML = `Bienvenido ${nombre}!` 
mostrar.style.color = "white"
mostrar.innerHTML = ""


//Realiza Consulta de saldo
const consultar = document.getElementById("consultar")
consultar.addEventListener("submit",(evento)=>{
    evento.preventDefault()

    for(let i = 0; i < database.length; i++){
        if(nombre === database[i].user){
            let saldo = parseFloat (database[i].saldo);
            mostrar.innerHTML = `Tu saldo es: $${saldo}`
            console.log(saldo);
        }
    }
})


//Realiza deposito
const deposito = document.getElementById("dep")
deposito.addEventListener("submit",(evento)=>{
    evento.preventDefault()
    
    let deposito = document.getElementById("deposito").value;
    let montoIngresado = parseFloat(deposito);
    
    for(let i = 0; i < database.length; i++){
        if(nombre === database[i].user){
            let saldo = parseFloat(database[i].saldo);
            let saldoMasDeposito = montoIngresado + saldo;  
                
                if(saldoMasDeposito > 990){
                mostrar.innerHTML = "No puedes exceder de $990";
                return saldo;
                }
                if(saldoMasDeposito <= 990)
                mostrar.innerHTML = `Has depositado $${montoIngresado} ahora tu saldo es: $${saldoMasDeposito}`;
                database.splice(i, 1, {user: nombre, saldo: saldoMasDeposito });
        }
    }    
})


//Realiza retiro
const retiro = document.getElementById("ret")
retiro.addEventListener("submit", (evento)=>{
    evento.preventDefault()

    
    let retiro = document.getElementById("retiro").value;
    let montoaRetirar = parseFloat(retiro);

    for(let i = 0; i < database.length; i++){
        if(nombre === database[i].user){
            let saldo = parseFloat(database[i].saldo);
            let saldoMenosRetiro = saldo - montoaRetirar;

                if(saldoMenosRetiro <= 10){
                mostrar.innerHTML = "Lo sentimos, no puedes tener menos de $10";
                return saldo;
                }
                if(saldoMenosRetiro >= 10){
                mostrar.innerHTML = `Has retirado $${montoaRetirar} ahora tu saldo es: $${saldoMenosRetiro}`;
                database.splice(i, 1, {user: nombre, saldo: saldoMenosRetiro });

                }
        }
    }
})


//salir del cajero
function salir(){
    let salir = document.getElementById("salir");
    window.location.href = "index.html"; 
}
