import { NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';

export class ItemSearchQuery {
    itemType: number;
    searchQuery: string;
}

export class AgileItemShort {
    title: string;
    order: number;
    id: string;
}

export class CreateAgileItem {
    itemType: number;
    title: string;
    description: string;
    dueBy: Date;
    priority: number;
    board: string;
    assigneeId: string;
    createdBy: string;
    assigneeName: string;
    parentId?: string;
    storyPoints?: number;
    story?: string;
    order?: number;
    estimatedTime?: number;
}

export class AgileItem {
    id: string;
    agileItemType: number;
    title: string;
    description: string;
    createdOn: Date;
    dueBy: Date;
    priority: number;
    board: string;
    status: number;
    assigneeId: string;
    createdBy: string;
    assigneeName: string;
    parentId?: string;
    parentTitle: string;
    storyPoints?: number;
    story?: string;
    order?: number;
    isActive: boolean;
    isComplete: boolean;
    estimatedTime?: number;
    loggedTime?: number;
    totalChildren?: number;
    completeChildren?: number;
    blockedReason?: string;
}

export class AgileItemOverview {
    id: string;
    assigneeId: string;
    title: string;
    description: string;
    order?: number;
    assigneeName: string;
    priority: number;
    status: NgbPaginationNumber;
    isComplete: boolean
}
