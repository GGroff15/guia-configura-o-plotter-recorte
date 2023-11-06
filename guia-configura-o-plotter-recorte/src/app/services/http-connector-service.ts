export interface HttpConnectorService<T> {

    listar(): Promise<T[]>;
    
    salvar(tipo: T): Promise<T>;
    
    obter(id: number): Promise<T>;

}