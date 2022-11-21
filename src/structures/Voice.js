

const Requests = require('./Requests');

module.exports = class Voice {
    constructor(config) {
        this.request = new Requests({
            api: 'https://api16-normal-useast5.us.tiktokv.com/media/api'
        });
    }

    async create(speaker, content) {
        const params = {
            text_speaker: speaker,
            req_text: content,
            speaker_map_type: 0
        }

        const response = await this.request.get(
            '/text/speech/invoke/', params
        );

        if (!response) return null;

        return response;
    }
}