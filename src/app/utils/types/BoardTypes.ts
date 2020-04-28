export class BoardStory {
    id: string;
    title: string;
    storyPoints: number;
    priority: number; // todo? enums ?
    status: number;
    tasks: TaskList;

}

export class TaskList {
    todo: BoardTask[];
    inProgress: BoardTask[];
    done: BoardTask[];
    blocked: BoardTask[];
}

export class BoardTask {
    id: string;
    title: string;
    description: string;
    order: number;
    priority: number;
    status: number;
    assigneeName: string;
    assigneeId: string;
    blockedReason: string;
}

export class BoardResponse {
    stories: BoardStory[];
}

export class BoardName {
    id: string;
    boardName: string;
}

export class BoardNameList {
    boardNames: BoardName[];
}

export class BoardTopology {
    superStories: SuperStoryTopology[];
    boardTitle: string;
    superStoryCount: number;
    storyCount: number;
    taskCount: number;
}

export class SuperStoryTopology {
    id: string;
    title: string;
    stories: StoryTopology[];
}

export class StoryTopology {
    id: string;
    title: string;
    tasks: TaskTopology[];
}

export class TaskTopology {
    id: string;
    title: string;
}
