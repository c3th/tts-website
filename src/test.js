

const Voice = require('./structures/Voice');

const fse = require('fs-extra');
const path = require('path');

function writeAudioFile(fileName, audio) {
    return fse.writeFileSync(fileName, Buffer.from(audio, 'base64'));
}

(async () => {

    const speaker = 'en_us_stitch';
    const content = "This is my family. I found it, all on my own. It's little, and broken, but still good. Yeah. Still good.";

    const voice = new Voice();
    const v = await voice.create(speaker, content);
    
    writeAudioFile('./stitch.mp3', v.data.v_str);

})();