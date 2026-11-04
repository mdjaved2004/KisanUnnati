function validateState() {
        const input = document.getElementById("state");
        const inputValue = input.value.trim();
        const options = document.querySelectorAll("#statesList option");

        let matchFound = false;

        for (let option of options) {
            if (option.value === inputValue) {
                matchFound = true;
				input.value = option.getAttribute('data-id');
                break;
            }
        }

        if (!matchFound) {
            alert("Please select a valid state from the list.");
            return false; 
        } 
        return true; 
    }