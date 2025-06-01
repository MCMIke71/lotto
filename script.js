document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const fieldCountInput = document.getElementById('fieldCount');
    const allowGlobalDuplicatesCheckbox = document.getElementById('allowGlobalDuplicates');
    const resultsDiv = document.getElementById('results');
    const infoDiv = document.getElementById('info');

    function generateLottoNumbers(availableNumbers = null) {
        const numbers = [];
        const maxNumber = 49;
        const numbersToGenerate = 6;

        const numbersPool = availableNumbers || Array.from({ length: maxNumber }, (_, i) => i + 1);
        for (let i = 0; i < numbersToGenerate; i++) {
            if (numbersPool.length === 0) {
                throw new Error('Nicht genügend verfügbare Zahlen');
            }
            const randomIndex = Math.floor(Math.random() * numbersPool.length);
            numbers.push(numbersPool.splice(randomIndex, 1)[0]);
        }

        return numbers.sort((a, b) => a - b);
    }

    function displayResults() {
        const fieldCount = parseInt(fieldCountInput.value);
        const allowGlobalDuplicates = allowGlobalDuplicatesCheckbox.checked;
        
        // Validierung der Eingabe
        if (fieldCount < 1 || fieldCount > 20) {
            alert('Bitte wählen Sie eine Anzahl zwischen 1 und 20 Feldern.');
            return;
        }

        // Info-Bereich zurücksetzen
        infoDiv.textContent = '';
        infoDiv.classList.remove('visible');

        resultsDiv.innerHTML = '';

        try {
            // Erstelle einen Pool für die ersten 8 Felder, wenn keine Wiederholungen erlaubt sind
            let firstEightNumbers = !allowGlobalDuplicates ? Array.from({ length: 49 }, (_, i) => i + 1) : null;
            
            for (let i = 1; i <= fieldCount; i++) {
                let numbers;
                
                if (i <= 8 && !allowGlobalDuplicates) {
                    // Für die ersten 8 Felder: Verwende den Pool für eindeutige Zahlen
                    numbers = generateLottoNumbers(firstEightNumbers);
                } else {
                    // Ab dem 9. Feld oder wenn Wiederholungen erlaubt sind: Generiere neue Zahlen
                    numbers = generateLottoNumbers();
                }
                
                const fieldDiv = document.createElement('div');
                fieldDiv.className = 'lotto-field';
                
                const fieldNumber = document.createElement('div');
                fieldNumber.className = 'field-number';
                fieldNumber.textContent = `Feld ${i}`;
                
                const numbersDiv = document.createElement('div');
                numbersDiv.className = 'numbers';
                
                numbers.forEach(number => {
                    const numberSpan = document.createElement('span');
                    numberSpan.className = 'number';
                    numberSpan.textContent = number;
                    numbersDiv.appendChild(numberSpan);
                });
                
                fieldDiv.appendChild(fieldNumber);
                fieldDiv.appendChild(numbersDiv);
                resultsDiv.appendChild(fieldDiv);
            }

            // Zeige Hinweis für Felder ab 9, wenn keine Wiederholungen erlaubt sind
            if (!allowGlobalDuplicates && fieldCount > 8) {
                infoDiv.textContent = 'Hinweis: Ab dem 9. Feld werden Zahlen aus früheren Feldern wiederholt.';
                infoDiv.classList.add('visible');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    generateBtn.addEventListener('click', displayResults);
}); 