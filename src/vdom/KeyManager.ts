interface KeyManagerDict {
    [key: string]: number,
}

class KeyManager {

    dict: KeyManagerDict = {};
    prefix: string = '-';

    addKey(tag: string): string {
        if (!this.dict[tag]) {
            this.dict[tag] = 0;
        }
        this.dict[tag]++;
        return tag + this.prefix + this.dict[tag].toString();
    }

};

export default new KeyManager();