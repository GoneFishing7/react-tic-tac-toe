export interface Symbols {
    [ply1: string]: string;
    ply2: string;
}

export interface Square {
    row: number;
    cell: number;
    symbol?: string;
}

// export interface SettingsInterface {
//     [whoIsO: string]: "ply1" | "ply2" | string | null;
//     whoIsMovingFirst: "ply1" | "ply2" | "rnd" | string | null;
//     playerTwoMode: Mode | string | null;
// }

export interface SettingsInterface {
    [index: string]: string | undefined | null;
}

export type Mode = "esy" | "med" | "imp" | "hum";
