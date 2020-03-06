export class BoardStory {
    id: string;
    title: string;
    storyPoints: number;
    priority: number; // todo? enums ?
    status: number;
    tasks: BoardTask[];
}

export class BoardTask {
    id: string;
    title: string;
    description: string;
    order: number;
    priority: number;
    status: number;
}

export class BoardResponse {
    stories: BoardStory[];
}