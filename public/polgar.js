const polgarArray = [];
const polgarTable = document.getElementById('polgarTable');

document.getElementById('polgarForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const myFormData = new FormData(e.target);
    const polgarData = Object.fromEntries(myFormData);

    
    polgarData.polgar_id= parseInt(polgarData.polgar_id);
   

    // Küldés a szervernek
    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(polgarData)
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg); 
        // Hozzáadás a táblázathoz
        polgarArray.push(polgarData);
        polgarTable.innerHTML = polgarArray.map((polgar, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${polgar.polgar_id}</td>
                <td>${polgar.nev}</td>
                <td>${polgar.szuletesi_datum}</td>
                <td>${polgar.lakcim} km</td>
                <td>${polgar.szemelyi_szam} Ft</td>
                <td>${polgar.neme}</td>
            </tr>
        `).join('');
        e.target.reset(); // Űrlap törlése
    })
    .catch(err => {
        console.error('Hiba történt:', err);
        alert('Hiba történt a mentés során.');
    });
});
