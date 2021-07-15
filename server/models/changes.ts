export type Changes = {
    spells: {
        created: any,
        updated: any,
        deleted: string[],
    },
};
export type ChangeSet = {
    changes: Changes,
    timestamp: number,
};
