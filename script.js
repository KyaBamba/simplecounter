/// the simplecounter. Paste your voiceover text to calculate its runtime.
/// Oliver Hillenbrand / v1.5 / 06.2025 / oliver.hillenbrand@simpleshow.com

// Move cursor to input field.
const input = document.getElementById('inputString');
input.setSelectionRange(0, 0);
input.focus();

// Trigger main function with enter key.
document.addEventListener("keyup", function (event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		document.getElementById("btn").click();
	}
});

// Initial variable to switch between minutes and seconds view.
let clicked = false;
let char = 0;

// Switch between minutes and seconds view with 's' key. Does not trigger when input is empty.
document.addEventListener("keyup", function (event) {
	event.preventDefault();
	if (event.keyCode === 83 && secondsEn > 0 && clicked === false) {
		toSecEn();
		toSecDe();
		clicked = true;
	} else if (event.keyCode === 83 && secondsEn > 0 && clicked === true) {
		countEn();
		countDe();
		clicked = false;
	}
});

// Initial variables to be passed between minutes and seconds function.
let secondsEn = 0;
let secondsDe = 0;

// Calculate words, runtime EN + DE and characters. Main function.
function countWords() {
	countChar();
	countEn();
	countDe();
}

// Calculate runtime EN.
function countEn() {
	// Count words inside the input field.
	s = document.getElementById("inputString").value;
	s = s.replace(/(^\s*)|(\s*$)/gi, "");
	s = s.replace(/[ ]{2,}/gi, " ");
	s = s.replace(/\n /, "\n");
	let count = s.split(' ').length;
	document.getElementById("wordcount").value = count;

	// Use EN-simpleshow formula to get time in decimal seconds.
	let we = document.getElementById("wordcount").value;
	let durEn = (we / 130) * 60;
	// Translate decimal seconds to minutes and seconds.
	let minEn = Math.floor(durEn / 60);
	let secEn = durEn % 60;
	// Round seconds to next 5.
	let secEnRnd = Math.round(Math.round(secEn / 5) * 5);
	// Make sure 60 seconds are displayed as 1 minute.
	if (secEnRnd == 60) {
		secEnRnd = 0;
		minEn = minEn + 1;
	}
	// Add leading 0.
	let en = minEn.toString().padStart(2, '0') + ':' + secEnRnd.toString().padStart(2, '0');
	// Show duration in EN field.
	document.getElementById("runtime-en").value = en;

	// Color time output red or green if greater or smaller than 3 minutes. 0 input will be black.
	if (minEn < 3) {
		document.getElementById("runtime-en").className = "green";
	}
	if (minEn == 3 && secEnRnd == 0) {
		document.getElementById("runtime-en").className = "green";
	}
	if (minEn >= 3 && secEnRnd > 0) {
		document.getElementById("runtime-en").className = "orange";
	}
	if (minEn >3 && secEnRnd == 0) {
		document.getElementById("runtime-en").className = "orange";
	}
	if (char > 5000) {
		document.getElementById("runtime-en").className = "red";
	}
	if (count == 1) {
		document.getElementById("runtime-en").className = "black";
	}

	// Set initial variable secondsEn for use in seconds function. 
	secondsEn = durEn;

	// Fallback: Prevents word count from displaying "1" at no input. 
	if (s == 0) {
		document.getElementById("wordcount").value = 0;
	}

	// Change text to "minutes" and click behaviour to toSecEn.
	document.getElementById("minutesEn").innerHTML = "minutes ";
	document.getElementById("minutesEn").onclick = toSecEn;
	document.getElementById("minutesEnImg").onclick = toSecEn;
}

// Calculate runtime DE. 
function countDe() {
	// Count words inside the input field.
	s = document.getElementById("inputString").value;
	s = s.replace(/(^\s*)|(\s*$)/gi, "");
	s = s.replace(/[ ]{2,}/gi, " ");
	s = s.replace(/\n /, "\n");
	let count = s.split(' ').length;
	document.getElementById("wordcount").value = count;

	// Use DE-simpleshow formula to get time in decimal seconds.
	let wd = document.getElementById("wordcount").value;
	let durDe = ((wd / 1.92) / 60) * 60;
	// Translate decimal seconds to minutes and seconds.
	let minDe = Math.floor(durDe / 60);
	let secDe = durDe % 60;
	// Round seconds to next 5.
	let secDeRnd = Math.round(Math.round(secDe / 5) * 5);
	// Make sure 60 seconds are displayed as 1 minute.
	if (secDeRnd == 60) {
		secDeRnd = 0;
		minDe = minDe + 1;
	}
	// Add leading 0.
	let de = minDe.toString().padStart(2, '0') + ':' + secDeRnd.toString().padStart(2, '0');
	// Show duration in DE field.
	document.getElementById("runtime-de").value = de;

	// Color time output red or green if greater or smaller than 3 minutes. 0 input will be black.
	if (minDe < 3) {
		document.getElementById("runtime-de").className = "green";
	}
	if (minDe == 3 && secDeRnd == 0) {
		document.getElementById("runtime-de").className = "green";
	}
	if (minDe >= 3 && secDeRnd > 0) {
		document.getElementById("runtime-de").className = "orange";
	}
	if (minDe > 3 && secDeRnd == 0) {
		document.getElementById("runtime-de").className = "orange";
	}
	if (char > 5000) {
		document.getElementById("runtime-de").className = "red";
	}
	if (count == 1) {
		document.getElementById("runtime-de").className = "black";
	}

	// Set initial variable secondsDe for use in seconds function. 
	secondsDe = durDe;

	// Fallback: Prevents word count from displaying "1" at no input. 
	if (s == 0) {
		document.getElementById("wordcount").value = 0;
	}

	// Change text to "minutes" and click behaviour to toSecDe.
	document.getElementById("minutesDe").innerHTML = "minutes ";
	document.getElementById("minutesDe").onclick = toSecDe;
	document.getElementById("minutesDeImg").onclick = toSecDe;

}

// Convert minutes output to seconds and reset click behaviour.
function toSecEn() {
	document.getElementById("runtime-en").value = Math.round(Math.round(secondsEn / 5) * 5);
	document.getElementById("minutesEn").innerHTML = "seconds ";
	document.getElementById("minutesEn").onclick = countEn;
	document.getElementById("minutesEnImg").onclick = countEn;
}

// Convert minutes output to seconds and reset click behaviour.
function toSecDe() {
	document.getElementById("runtime-de").value = Math.round(Math.round(secondsDe / 5) * 5);
	document.getElementById("minutesDe").innerHTML = "seconds ";
	document.getElementById("minutesDe").onclick = countDe;
	document.getElementById("minutesDeImg").onclick = countDe;
}

// Calculate character count.
function countChar() {
	// Count characters (strings) for simpleshow video maker.
	let str = document.getElementById("inputString").value;
	char = str.length;
	// Print value in defined field.
	document.getElementById("char").value = char;

	// Color character output black, orange or red, when bigger than 0, 2750 and 5000
	if (char > 5000) {
		document.getElementById("char").className = "red";
	}
	if (char > 2750 && char <= 5000) {
		document.getElementById("char").className = "orange";
	}
	if (char <= 2750) {
		document.getElementById("char").className = "black";
	}

	// Fallback: Prevents word count from displaying "1" at no input.
	if (char == 0) {
		document.getElementById("wordcount").value = 0;
	}
}

// Copy runtime EN to clipboard when clicking on the EN box.
const copyEn = document.getElementById('color-en');

copyEn.style.cursor = 'pointer';
copyEn.onclick = function () {
	if (secondsEn > 0) {
		const copyText = document.getElementById("runtime-en");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		navigator.clipboard
			.writeText(copyText.value)
			.then(() => {
				alert("Copied runtime to clipboard!");
			})
			.catch(() => {
				alert("something went wrong :(");
			});
	}
}

// Copy runtime DE to clipboard when clicking on the DE box.
const copyDe = document.getElementById('color-de');

copyDe.style.cursor = 'pointer';
copyDe.onclick = function () {
	if (secondsEn > 0) {
		const copyText = document.getElementById("runtime-de");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		navigator.clipboard
			.writeText(copyText.value)
			.then(() => {
				alert("Copied runtime to clipboard!");
			})
			.catch(() => {
				alert("something went wrong :(");
			});
	}
}

// Copy word count to clipboard when clicking on the word box.
const copyW = document.getElementById('words');

copyW.style.cursor = 'pointer';
copyW.onclick = function () {
	if (secondsEn > 0) {
		const copyText = document.getElementById("wordcount");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		navigator.clipboard
			.writeText(copyText.value)
			.then(() => {
				alert("Copied word count to clipboard!");
			})
			.catch(() => {
				alert("something went wrong :(");
			});
	}
}

// Copy character count to clipboard when clicking on the characters box.
const copyC = document.getElementById('characters');

copyC.style.cursor = 'pointer';
copyC.onclick = function () {
	if (secondsEn > 0) {
		const copyText = document.getElementById("char");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		navigator.clipboard
			.writeText(copyText.value)
			.then(() => {
				alert("Copied character count to clipboard!");
			})
			.catch(() => {
				alert("something went wrong :(");
			});
	}
}