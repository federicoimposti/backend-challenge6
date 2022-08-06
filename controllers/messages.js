const fs = require('fs');

module.exports = class Messages {
    constructor(file) {
        this.file = file;
    }

    async save(obj) {
        try {
            
            const messages = await this.getAll();

            if (!messages || !messages.length) {
                obj.id = 1;
                await fs.promises.writeFile(this.file, JSON.stringify([obj], null, 2));

                return obj.id;
            }

            const lastMessage = messages.slice(-1);
            obj.id = parseInt(lastMessage[0]?.id) + 1;
            
            const addMessage = [...messages, obj];
            await fs.promises.writeFile(this.file, JSON.stringify(addMessage, null, 2));

            return obj.id;
        } catch (err) {
            throw new Error('Ocurrió un error al guardar el archivo.', err);
        }
    }

    async getAll() {
        try {
            const messages = await fs.promises.readFile(this.file, 'utf-8');
            return messages ? JSON.parse(messages) : null;
        } catch(err) {
            throw new Error('Ocurrió un error obteniendo los Mensajes.', err);
        }
    }
}
