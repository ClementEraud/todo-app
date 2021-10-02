export interface UseCase {
    // Interface to ensure use cases implement an execute function.
    execute(...args: any[]): any
}
