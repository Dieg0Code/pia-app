export class DiaryModel {
    title: string;
    content: string;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }

    static fromJson(json: { [key: string]: any }): DiaryModel {
        return new DiaryModel(json['title'], json['content']);
    }

    toJson(): { [key: string]: any } {
        return {
            title: this.title,
            content: this.content
        };
    }
}