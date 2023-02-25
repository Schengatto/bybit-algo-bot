export type Dictionary<T> = Record<string, T>;

export interface InitializableService {
    init(config?: any): void;
}