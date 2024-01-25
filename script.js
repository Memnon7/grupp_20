const url = 'http://localhost:5000/bicycles';
window.addEventListener('load', fetchData);
function fetchData() {
    fetch(url)
        .then((result) => result.json())
        .then((bicycles) => {
            if (bicycles.length > 0) {
                
                let html = `<ul class="w-3/4 my-3 mx-auto flex flex-wrap gap-2 justify-center">`;
                bicycles.forEach((bicycle) => {
                    html += `
        <li
          class="bg-${bicycle.color}-200 basis-1/4 text-${bicycle.color}-900 p-2 rounded-md border-2 border-${bicycle.color}-400 flex flex-col justify-between">
          <h3> Model: ${bicycle.model}</h3> 
          <h3>Manufacturer: ${bicycle.manufacturer}</h3>
          <p> År: ${bicycle.year}</p>
          <div>
            <button
              class="rounded-md bg-white/50 p-1 text-sm"
              <button
              class="border border-${bicycle.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="setCurrentBicycle('${bicycle.id}')">
              Ändra
            </button>
            <button class="border border-${bicycle.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" type="button" onclick="deleteBicycle(${bicycle.id})">
              Ta bort
            </button>
          </div>
        </li>`;
                });
                html += `</ul>`;
                const listContainer = document.getElementById('listContainer');
                listContainer.innerHTML = '';
                listContainer.insertAdjacentHTML('beforeend', html);
            }
        });
}


function setCurrentBicycle(id) {
    console.log("current", id);
    fetch(`${url}/${id}`)
        .then((result) => {
            if (!result.ok) {
                showMessage("kunde inte hämta cyckeln du ville.", 'error');
                throw new Error('Network response was not ok');
            }
            return result.json();
        })
        .then((bicycle) => {
            console.log(bicycle);
            
            bicycleForm.model.value = bicycle.model;
            bicycleForm.manufacturer.value = bicycle.manufacturer;
            bicycleForm.year.value = bicycle.year;
            bicycleForm.color.value = bicycle.color;
            localStorage.setItem("currentId", bicycle.id);
            
        })
        .catch((error) => {
            showMessage("kunde inte hämta cyckeln du ville.", 'error');
        });
}




function deleteBicycle(id) {
    console.log('delete', id);
    
    fetch(`${url}/${id}`, { method: 'DELETE' })
        .then((result) => {
            showMessage("The bicycle has been deleted!", 'success');
            fetchData(); 
        })
        .catch((error) => {
            showMessage("fel skeede när du försökte ta bort cyckeln.", 'error'); 
        });
}




bicycleForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const serverBicycleObject = {
        model: bicycleForm.model.value,
        manufacturer: bicycleForm.manufacturer.value,
        year: bicycleForm.year.value,
        color: bicycleForm.color.value
    };

    const id = localStorage.getItem("currentId");
    
    if (id) serverBicycleObject.id = id;

    
    const request = new Request(url, {
        method: serverBicycleObject.id ? 'PUT' : 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(serverBicycleObject)
    });

    
    fetch(request)
    .then((response) => {
        showMessage(serverBicycleObject.id ? "The bicycle is updated!" : "The bicycle is created!", 'success');
        fetchData();
        localStorage.removeItem("currentId");
        bicycleForm.reset();
    })
    .catch((error) => {
        showMessage("An error occurred while handling the bicycle.", 'error');
    });
}

function showMessage(message, messageType) {
    const modal = document.getElementById('popup-modal');
    const messageBox = modal.querySelector('.text-gray-500');

    messageBox.textContent = message;
    modal.classList.remove('hidden');


    if (messageType === 'success') {
        messageBox.classList.remove('text-red-500');
        messageBox.classList.add('text-green-500');
    } else if (messageType === 'error') {
        messageBox.classList.remove('text-green-500');
        messageBox.classList.add('text-red-500');
    } else {
        messageBox.classList.remove('text-red-500', 'text-green-500');
    }

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 5000);
}

