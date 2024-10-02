export class DiaryDTO {
    id: string;
    title: string;
    content: string;

    constructor(id: string, title: string, content: string) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    static fromJson(json: { [key: string]: any }): DiaryDTO {
        return new DiaryDTO(json['id'], json['title'], json['content']);
    }

    toJson(): { [key: string]: any } {
        return {
            id: this.id,
            title: this.title,
            content: this.content
        };
    }
}