const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repassword = document.getElementById("repassword");

function error(input, message){ //İki parametre ister. Biri ör username biri de mesajı
    input.className = 'form-control is-invalid'  //Bilgi eklemek için classname kullanılır. Form control tekrar yazılır. Silinmemesi için
    const div = input.nextElementSibling;
    div.innerText = message;
    div.className = "invalid-feedback"; //bs classı
}//is-invalid bootstrap özelliğidir. Kırmızı border ve sağ tarafta uyarı işareti..

function success(input){ //isvalid tam tersi.
    input.className = "form-control is-valid"
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

function checkRequired(inputs){ //Hepsini kapsayan inputs. Foreach ile her birini input'a çeviririz.
    inputs.forEach(function(input){
        if(input.value===''){
            error(input, `${input.id} is required.`); //.html dosyasındaki inputların id değerleri yansıtılır. Ör: email is required.
        }
        else{
            success(input);
        }
    })
}

function checkLength(input, min, max){
    if(input.value.length < min){
        error(input, `${input.id} en az ${min} karakter olmalıdır.`)
    }
    else if(input.value.length > max){
        error(input, `${input.id} en fazla ${max} karakter olmalıdır. `)
    }
    else{
        success(input); //Problem yoksa.
    }
}

function checkPasswords(input1,input2){
    if(input1.value!== input2.value){
        error(input2, 'Parolalar eşleşmiyor.')
    }
}

function checkPhone(input){
    var exp = /^\d{10}$/; //Phone number validation (sadece sayısal 10 karakter boşluksuz)
    if(!exp.test(input.value)){ // ! dikkat.
        error(input, "Telefon 10 karaktere sahip olmalıdır.")
    }
}

form.addEventListener("submit",function(e){ //E eventin referansıdır. Evente ulaşmak için
    e.preventDefault();
    checkRequired([username,email,phone,password,repassword]); //Dizi içerisine alındı. Inputs'un elemanları..
    checkLength(username, 7 , 16); 
    checkLength(password,7,15);
    checkPasswords(password,repassword);
    checkPhone(phone);
})