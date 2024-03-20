var p2 = document.querySelector('.p2')
var p3 = document.querySelector('.p3')
var p4 = document.querySelector('.p4')


let form = document.getElementById('formWeather')
let locationText = document.getElementById('location')
let conditionText = document.getElementById('condition')
let tempText = document.getElementById('temp')
let timeText = document.getElementById('time')
let errorText = document.getElementById('error')

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    // console.log(address.value)
    weatherFunc()
    form.reset()
    p2.style.display = 'none'
    p3.style.display = 'none'
    p4.style.display = 'none'

    setTimeout(function(){
        p2.style.display = 'block'
    }, 1000 )
    setTimeout(function(){
        p3.style.display = 'block'
    }, 2000 )
    setTimeout(function(){
        p4.style.display = 'block'
    }, 3000 )
    
})
let weatherFunc = async ()=> {
    try{
        let address = document.getElementById('country').value

        const res = await fetch('http://localhost:3000/weather?address='+address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            errorText.innerText = data.error
            locationText.innerText = ''
            tempText.innerText = ''
            conditionText.innerText = ''
            timeText.innerText = ''
        }else{
            console.log(data)
            locationText.innerText = data.location //toked from query.address.. look at app.js
            conditionText.innerText = data.forcast.condition
            tempText.innerText = data.forcast.temp
            timeText.innerText = data.forcast.time
            errorText.innerText = ''
        }
    }catch(e){
        console.log(e)
    }

}





           

    
    

    
// for (var i = 0; i < texts.length; i++) {
//     (function(index) {
//         setTimeout(function() {
//             texts[index].style.display = 'block';
//         }, (index + 1) * 1000); // كل نص يظهر بعد نصف ثانية عن النص السابق
//     })(i);
// }