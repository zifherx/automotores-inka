export class APIMessages {
  // Mensajes de éxito
  static readonly CREATED_SUCCESS = "creado con éxito ✅";
  static readonly UPDATED_SUCCESS = "actualizado con éxito ✅";
  static readonly DELETED_SUCCESS = "eliminado con éxito ✅";
  static readonly FETCHED_SUCCESS = "obtenido con éxito ✅";
  static readonly LISTED_SUCCESS = "listado con éxito ✅";

  static getCreateMessage(resource: string): string {
    return `${resource} ${this.CREATED_SUCCESS}`;
  }

  static getUpdatedMessage(resource: string): string {
    return `${resource} ${this.UPDATED_SUCCESS}`;
  }

  static getDeletedMessage(resource: string): string {
    return `${resource} ${this.DELETED_SUCCESS}`;
  }

  static getFetchedMessage(resource: string): string {
    return `${resource} ${this.FETCHED_SUCCESS}`;
  }

  static getListedMessage(resource: string): string {
    return `${resource} ${this.LISTED_SUCCESS}`;
  }
}
