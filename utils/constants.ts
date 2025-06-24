import { SolicitudServicioFormValues } from "@/forms";

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

  static createMessageForCitaTaller(
    customerTaller: SolicitudServicioFormValues
  ): string {
    return `*Hola Automotores Inka*
      *Cliente:* ${customerTaller.nombres} - ${
      customerTaller.numeroDocumento
    }(${customerTaller.tipoDocumento})
      *Email:* ${customerTaller.correo}
      ${customerTaller.celular ? `*Teléfono:* ${customerTaller.celular}` : ""}

      *Ubicación:* ${customerTaller.concesionario}
      *Sede:* ${customerTaller.sede}

      ${
        customerTaller.marca
          ? `*Marca del vehículo:* ${customerTaller.marca}`
          : ""
      }
      ${
        customerTaller.modelo
          ? `*Modelo del vehículo:* ${customerTaller.modelo}`
          : ""
      }
      ${
        customerTaller.placa
          ? `*Placa del vehículo:* ${customerTaller.placa}`
          : ""
      }
      ${
        customerTaller.kilometraje
          ? `*Km del vehículo:* ${customerTaller.kilometraje}km.`
          : ""
      }
      ${
        customerTaller.tipoServicio
          ? `*Tipo de servicio:* ${customerTaller.tipoServicio}`
          : ""
      }
    
      *Mensaje:*
      ${customerTaller.comentario ? `${customerTaller.comentario}` : ""}


      ---
      _Enviado desde el formulario web_
      `.trim();
  }
}
