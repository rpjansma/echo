export interface DolarServiceInterface<MetaType = any> {
  cotacaoCompra?: number;
  cotacaoVenda?: number;
  dataHoraCotacao?: Date;
}
export interface DolarServiceInterface extends Array<DolarServiceInterface> {}

export interface DolarServiceInterfaceApi {
  payload: DolarServiceInterface;
}
