let clientName = document.querySelector('#id_fullname')
let email = document.querySelector("#email-1")
let submit = document.querySelector('#submit-id-submit')
let pass = document.querySelector('#password')
let displayError = document.querySelector('#displayError')

email.addEventListener('change', function(e){
    // console.log (email.value)
})
pass.addEventListener('change', function (e){
    // console.log(pass.value.length)
    if (pass.value.length < 6) {
        displayError.innerHTML = 'Password is too short. Please enter more than 6 characters'
    }
})
submit.addEventListener('click', async function(e) {
    if (!clientName.value || !email.value || !pass.value) {
        displayError.innerHTML ='All feilds must be filled.'
    }else{
        let db = await axios.get('http://localhost:3000/users')
        let check = db.data.find(item => item.email === email.value)
        if (check) {
           displayError.innerHTML = "This email has already been sighned up" 
        } else {
            await axios.post('http://localhost:3000/users', { 
          clientName : clientName.value,
          email : email.value,
          password : pass.value,
          favorite: []
        })
        window.location.href = 'logIn.html'
        }    
    }
})