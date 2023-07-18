/**
 * Sets up the arguments and options available in the program.
 */
export declare function setupProgramArguments(): void;
/**
 * Represents the arguments and options of the program.
 */
export interface ProgramArguments {
    /** Website name. */
    website: string;
    /** Keywords to search for. */
    keywords: string[];
    /** File to read keywords from. */
    file?: string;
    /** Maximum page to search for. */
    maxPage: number;
}
/**
 * Gets the arguments and options of the program.
 * @returns Arguments and options.
 */
export declare function getProgramArguments(): ProgramArguments;
