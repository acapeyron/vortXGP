export class Preset {
    id!: number;
    name!: string;
    parameters!: string[];
    video!: string;
    desc!: any;

    constructor(name: string, parameters: string[], video: string, desc: string) {
        this.name = name;
        this.parameters = parameters;
        this.video = video;
        this.desc = desc;
    }
}
