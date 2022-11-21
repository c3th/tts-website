
const socket = io();

const trollUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

var downloadBtn;
var submitBtn;
var select;
var buff;
var ctx;

function addRow() { }

function format(b64) {
    const str = 'data:audio/mp3;base64,';
    return [str, b64].join('');
}

function playAudio(audio) {
    const voice = new Audio(audio);
    voice.play();
}

function downloadAudio(filename, b64) {
    const str = format(b64);
    downloadBtn.setAttribute('href', str);
    downloadBtn.setAttribute('download', filename);
    return str;
}

function redirect() {
    if (screen.width <= 900) {
        window.location = trollUrl;
    }
}


window.onload = () => {
    downloadBtn = document.querySelector('.download');
    submitBtn = document.querySelector('input[type=submit]');
    select = document.querySelector('select');
    ctx = new AudioContext();
    // setTimeout(redirect(), 300);
}

window.onsubmit = () => {
    const select = document.querySelector('select');
    submitBtn.disabled = true;
    submitBtn.value = 'Loading...';

    const { value: textVal } = document.querySelector('input[type=text]');
    const { value: optionVal } = select.options[select.selectedIndex];

    socket.emit('onsubmit', {
        optionVal,
        textVal
    });
}

socket.on('voices', voices => {
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name;
        option.value = voice.id;
        select.appendChild(option);
    });
});

socket.on('response', ({ v_str }) => {
    const options = document.querySelector('.options');
    submitBtn.disabled = false;
    submitBtn.value = 'Submit';
    options.classList.remove('hidden');

    const audio = format(v_str);
    downloadBtn.onclick = () => {
        const { value: optionVal } = select.options[select.selectedIndex];
        const filename = `${optionVal}-${new Date().getTime()}.mp3`;
        console.log(audio);
        downloadAudio(filename, audio);
    }

    playAudio(audio);
});
