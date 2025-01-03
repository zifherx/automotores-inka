import { jsPDF } from "jspdf";

import { tClaimAll } from "@/types";
import { formatPENPrice, formatUSDPrice } from "./formatPrice";

export const makePDFCorreoReclamo = (params?: tClaimAll) => {
  const doc = new jsPDF({ orientation: "portrait" });

  let img =
    "data:image/png;base64,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";

  doc.addImage(img, "PNG", 25, 43, 60, 15);

  //Header
  doc.setFillColor(229, 229, 229).rect(20, 20, 85, 10, "FD");
  doc.rect(20, 30, 14, 10);
  doc.rect(34, 30, 28, 10);
  doc.rect(62, 30, 20, 10);
  doc.rect(82, 30, 23, 10);
  doc.rect(105, 20, 85, 20);
  doc.rect(20, 40, 170, 20);

  //BODY
  doc.setFillColor(229, 229, 229).rect(20, 60, 170, 10, "FD");
  doc.rect(20, 70, 170, 10);
  doc.rect(20, 80, 170, 10);
  doc.rect(20, 90, 40, 10);
  doc.rect(60, 90, 40, 10);
  doc.rect(100, 90, 90, 10);
  doc.rect(20, 100, 170, 10);

  doc.setFillColor(229, 229, 229).rect(20, 110, 100, 10, "FD");
  doc.rect(120, 110, 25, 10);
  doc.rect(145, 110, 10, 10);
  doc.rect(155, 110, 25, 10);
  doc.rect(180, 110, 10, 10);
  doc.rect(20, 120, 140, 20);
  doc.rect(160, 120, 30, 20);

  doc.setFillColor(229, 229, 229).rect(20, 140, 100, 10, "FD");
  doc.rect(120, 140, 25, 10);
  doc.rect(145, 140, 10, 10);
  doc.rect(155, 140, 25, 10);
  doc.rect(180, 140, 10, 10);
  doc.rect(20, 150, 170, 20);
  doc.rect(20, 170, 130, 20);
  doc.rect(150, 170, 40, 15);
  doc.rect(150, 185, 40, 5);

  doc.setFillColor(229, 229, 229).rect(20, 190, 170, 10, "FD");
  doc.rect(20, 200, 85, 10);
  doc.rect(105, 200, 15, 10);
  doc.rect(120, 200, 15, 10);
  doc.rect(135, 200, 15, 10);
  doc.rect(150, 200, 40, 10);
  doc.rect(20, 210, 130, 20);
  doc.rect(150, 210, 40, 15);
  doc.rect(150, 225, 40, 5);

  doc.rect(20, 230, 85, 10);
  doc.rect(105, 230, 85, 10);

  //Texto Estáticos
  //Header
  doc
    .setFont("times", "bold")
    .setFontSize(12)
    .text("LIBRO DE RECLAMACIONES", 33, 26);
  doc
    .setFont("times", "bold")
    .setFontSize(12)
    .text("HOJA DE RECLAMACIÓN", 122, 26);
  doc
    .setFont("times", "normal")
    .setFontSize(12)
    .text(params!.numeroReclamo, 124, 36); //dinámico

  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("FECHA:", 27, 36, { align: "center" });
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("SUCURSAL:", 72, 36, { align: "center" });
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(`${params!.fecha} ${params!.hora}`, 36, 36); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.sedeCompra.toUpperCase(), 93, 36, { align: "center" }); //dinámico

  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.razonSocial.toUpperCase(), 185, 46, { align: "right" }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(`R.U.C. N° ${params!.rucEmpresa}`, 185, 51, { align: "right" }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(7)
    .text(params!.direccionSede.toUpperCase(), 185, 56, { align: "right" }); //dinámico

  //BODY
  doc
    .setFont("times", "bold")
    .setFontSize(8)
    .text("1. IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE", 22, 66);
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("NOMBRES Y APELLIDOS:", 22, 76);
  doc.setFont("times", "bold").setFontSize(7).text("DOMICILIO:", 22, 86);
  doc.setFont("times", "bold").setFontSize(7).text("DNI / CE:", 22, 96);
  doc.setFont("times", "bold").setFontSize(7).text("CELULAR:", 62, 96);
  doc.setFont("times", "bold").setFontSize(7).text("E-MAIL:", 102, 96);
  doc.setFont("times", "bold").setFontSize(7).text("PADRE O MADRE:", 22, 106);

  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(
      `${params!.nombres.toUpperCase()} ${params!.apellidos.toUpperCase()}`,
      55,
      76,
      { align: "left" }
    ); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.direccion!.toUpperCase(), 40, 86, { align: "left" }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.numeroDocumento, 35, 96, { align: "left" }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.celular, 78, 96, { align: "left" }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.email.toUpperCase(), 115, 96, { align: "left" }); //dinámico

  doc
    .setFont("times", "bold")
    .setFontSize(8)
    .text("2. IDENTIFICACIÓN DEL BIEN CONTRATADO", 22, 116);

  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("PRODUCTO", 132, 116, { align: "center" });
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("SERVICIO", 167, 116, { align: "center" });
  doc.setFont("times", "bold").setFontSize(7).text("DESCRIPCIÓN:", 22, 124);
  doc.setFont("times", "bold").setFontSize(7).text("VIN:", 95, 124);
  doc.setFont("times", "bold").setFontSize(7).text("PLACA:", 137, 124);
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("MONTO RECLAMADO:", 161, 124);

  doc
    .setFont("times", "normal")
    .setFontSize(12)
    .text(params!.tipoBien === "producto" ? "X" : "", 150, 116.5, {
      align: "center",
    }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(12)
    .text(params!.tipoBien === "servicio" ? "X" : "", 185, 116.5, {
      align: "center",
    }); //dinámico

  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.vin!.toUpperCase(), 102, 124, { align: "left" }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.placa!, 148, 124, { align: "left" }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.descripcionBien.toUpperCase(), 22, 129, {
      align: "left",
      maxWidth: 135,
    }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(13)
    .text(
      `${
        params!.moneda === "pen"
          ? formatPENPrice(params!.importeBien)
          : formatUSDPrice(params!.importeBien)
      }`,
      174,
      134,
      { align: "center" }
    ); //dinámico: Monto Reclamado

  doc
    .setFont("times", "bold")
    .setFontSize(8)
    .text("3. DETALLE DE LA RECLAMACIÓN Y PEDIDO DEL CONSUMIDOR", 22, 146);

  doc.setFont("times", "bold").setFontSize(7).text("DETALLE:", 22, 154);
  doc.setFont("times", "bold").setFontSize(7).text("PEDIDO:", 22, 174);
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("FIRMA DEL CONSUMIDOR", 171, 188.5, { align: "center" });

  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("RECLAMO", 132, 146, { align: "center" });
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("QUEJA", 167, 146, { align: "center" });

  doc
    .setFont("times", "normal")
    .setFontSize(12)
    .text(params!.tipoSolicitud === "reclamo" ? "X" : "", 150, 146.5, {
      align: "center",
    });
  doc
    .setFont("times", "normal")
    .setFontSize(12)
    .text(params!.tipoSolicitud === "queja" ? "X" : "", 185, 146.5, {
      align: "center",
    });

  doc
    .setFont("times", "normal")
    .setFontSize(7)
    .text(params!.detalleSolicitud.toUpperCase(), 36, 154, {
      align: "justify",
      maxWidth: 150,
    }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(7)
    .text(params!.pedidoSolicitud.toUpperCase(), 34, 174, {
      align: "justify",
      maxWidth: 112,
    }); //dinámico

  doc
    .setFont("times", "bold")
    .setFontSize(8)
    .text("4. OBSERVACIONES Y ACCIONES APOPTADAS POR EL PROVEEDOR", 22, 196);
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("FECHA DE COMUNICACIÓN DE LA RESPUESTA:", 22, 206);
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("FIRMA DEL PROVEEDOR", 171, 228.5, { align: "center" });
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(
      "1. RECLAMO: Disconformidad relacionada a los productos o servicios.",
      22,
      236
    );
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(
      "2. QUEJA: Malestar o descontento respecto a la atención al público.",
      107,
      236
    );

  //FOOTER
  doc
    .setFont("times", "bold")
    .setFontSize(10)
    .text(
      "Destinatario (consumidor, proveedor o INDECOPI según corresponda)",
      190,
      246,
      { align: "right" }
    );

  let legal1 =
    "* La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI";
  let legal2 =
    "* El proveedor deberá dar respuesta al reclamo en un plazo no mayor a quince (15) días hábiles.";

  doc
    .setFont("times", "normal")
    .setFontSize(10)
    .text(legal1, 22, 256, { align: "justify", maxWidth: 160 });
  doc
    .setFont("times", "normal")
    .setFontSize(10)
    .text(legal2, 22, 266, { align: "justify", maxWidth: 160 });

  //   doc.autoPrint();
  // doc.save(`${params?.numeroReclamo}-${params?.numeroDocumento}`); //Para pruebas de descarga

  return doc.output("arraybuffer"); //Para envío por correo.

  // if(enumAction == 1){
  // }else if(enumAction == 2){

  // }
};

export const makePDFReclamo = (params?: tClaimAll) => {
  const doc = new jsPDF({ orientation: "portrait" });

  let img =
    "data:image/png;base64,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";

  doc.addImage(img, "PNG", 25, 43, 60, 15);

  //Header
  doc.setFillColor(229, 229, 229).rect(20, 20, 85, 10, "FD");
  doc.rect(20, 30, 14, 10);
  doc.rect(34, 30, 28, 10);
  doc.rect(62, 30, 20, 10);
  doc.rect(82, 30, 23, 10);
  doc.rect(105, 20, 85, 20);
  doc.rect(20, 40, 170, 20);

  //BODY
  doc.setFillColor(229, 229, 229).rect(20, 60, 170, 10, "FD");
  doc.rect(20, 70, 170, 10);
  doc.rect(20, 80, 170, 10);
  doc.rect(20, 90, 40, 10);
  doc.rect(60, 90, 40, 10);
  doc.rect(100, 90, 90, 10);
  doc.rect(20, 100, 170, 10);

  doc.setFillColor(229, 229, 229).rect(20, 110, 100, 10, "FD");
  doc.rect(120, 110, 25, 10);
  doc.rect(145, 110, 10, 10);
  doc.rect(155, 110, 25, 10);
  doc.rect(180, 110, 10, 10);
  doc.rect(20, 120, 140, 20);
  doc.rect(160, 120, 30, 20);

  doc.setFillColor(229, 229, 229).rect(20, 140, 100, 10, "FD");
  doc.rect(120, 140, 25, 10);
  doc.rect(145, 140, 10, 10);
  doc.rect(155, 140, 25, 10);
  doc.rect(180, 140, 10, 10);
  doc.rect(20, 150, 170, 20);
  doc.rect(20, 170, 130, 20);
  doc.rect(150, 170, 40, 15);
  doc.rect(150, 185, 40, 5);

  doc.setFillColor(229, 229, 229).rect(20, 190, 170, 10, "FD");
  doc.rect(20, 200, 85, 10);
  doc.rect(105, 200, 15, 10);
  doc.rect(120, 200, 15, 10);
  doc.rect(135, 200, 15, 10);
  doc.rect(150, 200, 40, 10);
  doc.rect(20, 210, 130, 20);
  doc.rect(150, 210, 40, 15);
  doc.rect(150, 225, 40, 5);

  doc.rect(20, 230, 85, 10);
  doc.rect(105, 230, 85, 10);

  //Texto Estáticos
  //Header
  doc
    .setFont("times", "bold")
    .setFontSize(12)
    .text("LIBRO DE RECLAMACIONES", 33, 26);
  doc
    .setFont("times", "bold")
    .setFontSize(12)
    .text("HOJA DE RECLAMACIÓN", 122, 26);
  doc
    .setFont("times", "normal")
    .setFontSize(12)
    .text(params!.numeroReclamo, 124, 36); //dinámico

  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("FECHA:", 27, 36, { align: "center" });
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("SUCURSAL:", 72, 36, { align: "center" });
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(`${params!.fecha} ${params!.hora}`, 36, 36); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.sedeCodexHR.toUpperCase(), 93, 36, { align: "center" }); //dinámico

  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.razonSocial.toUpperCase(), 185, 46, { align: "right" }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(`R.U.C. N° ${params!.rucEmpresa}`, 185, 51, { align: "right" }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(7)
    .text(params!.direccionSede.toUpperCase(), 185, 56, { align: "right" }); //dinámico

  //BODY
  doc
    .setFont("times", "bold")
    .setFontSize(8)
    .text("1. IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE", 22, 66);
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("NOMBRES Y APELLIDOS:", 22, 76);
  doc.setFont("times", "bold").setFontSize(7).text("DOMICILIO:", 22, 86);
  doc.setFont("times", "bold").setFontSize(7).text("DNI / CE:", 22, 96);
  doc.setFont("times", "bold").setFontSize(7).text("CELULAR:", 62, 96);
  doc.setFont("times", "bold").setFontSize(7).text("E-MAIL:", 102, 96);
  doc.setFont("times", "bold").setFontSize(7).text("PADRE O MADRE:", 22, 106);

  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(
      `${params!.nombres.toUpperCase()} ${params!.apellidos.toUpperCase()}`,
      55,
      76,
      { align: "left" }
    ); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.direccion!.toUpperCase(), 40, 86, { align: "left" }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.numeroDocumento, 35, 96, { align: "left" }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.celular, 78, 96, { align: "left" }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.email.toUpperCase(), 115, 96, { align: "left" }); //dinámico

  doc
    .setFont("times", "bold")
    .setFontSize(8)
    .text("2. IDENTIFICACIÓN DEL BIEN CONTRATADO", 22, 116);

  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("PRODUCTO", 132, 116, { align: "center" });
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("SERVICIO", 167, 116, { align: "center" });
  doc.setFont("times", "bold").setFontSize(7).text("DESCRIPCIÓN:", 22, 124);
  doc.setFont("times", "bold").setFontSize(7).text("VIN:", 95, 124);
  doc.setFont("times", "bold").setFontSize(7).text("PLACA:", 137, 124);
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("MONTO RECLAMADO:", 161, 124);

  doc
    .setFont("times", "normal")
    .setFontSize(12)
    .text(params!.tipoBien === "producto" ? "X" : "", 150, 116.5, {
      align: "center",
    }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(12)
    .text(params!.tipoBien === "servicio" ? "X" : "", 185, 116.5, {
      align: "center",
    }); //dinámico

  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.vin!.toUpperCase(), 102, 124, { align: "left" }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.placa!, 148, 124, { align: "left" }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(params!.descripcionBien.toUpperCase(), 22, 129, {
      align: "left",
      maxWidth: 135,
    }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(13)
    .text(
      `${
        params!.moneda === "pen"
          ? formatPENPrice(params!.importeBien)
          : formatUSDPrice(params!.importeBien)
      }`,
      174,
      134,
      { align: "center" }
    ); //dinámico: Monto Reclamado

  doc
    .setFont("times", "bold")
    .setFontSize(8)
    .text("3. DETALLE DE LA RECLAMACIÓN Y PEDIDO DEL CONSUMIDOR", 22, 146);

  doc.setFont("times", "bold").setFontSize(7).text("DETALLE:", 22, 154);
  doc.setFont("times", "bold").setFontSize(7).text("PEDIDO:", 22, 174);
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("FIRMA DEL CONSUMIDOR", 171, 188.5, { align: "center" });

  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("RECLAMO", 132, 146, { align: "center" });
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("QUEJA", 167, 146, { align: "center" });

  doc
    .setFont("times", "normal")
    .setFontSize(12)
    .text(params!.tipoSolicitud === "reclamo" ? "X" : "", 150, 146.5, {
      align: "center",
    });
  doc
    .setFont("times", "normal")
    .setFontSize(12)
    .text(params!.tipoSolicitud === "queja" ? "X" : "", 185, 146.5, {
      align: "center",
    });

  doc
    .setFont("times", "normal")
    .setFontSize(7)
    .text(params!.detalleSolicitud.toUpperCase(), 36, 154, {
      align: "justify",
      maxWidth: 150,
    }); //dinámico
  doc
    .setFont("times", "normal")
    .setFontSize(7)
    .text(params!.pedidoSolicitud.toUpperCase(), 34, 174, {
      align: "justify",
      maxWidth: 112,
    }); //dinámico

  doc
    .setFont("times", "bold")
    .setFontSize(8)
    .text("4. OBSERVACIONES Y ACCIONES APOPTADAS POR EL PROVEEDOR", 22, 196);
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("FECHA DE COMUNICACIÓN DE LA RESPUESTA:", 22, 206);
  doc
    .setFont("times", "bold")
    .setFontSize(7)
    .text("FIRMA DEL PROVEEDOR", 171, 228.5, { align: "center" });
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(
      "1. RECLAMO: Disconformidad relacionada a los productos o servicios.",
      22,
      236
    );
  doc
    .setFont("times", "normal")
    .setFontSize(8)
    .text(
      "2. QUEJA: Malestar o descontento respecto a la atención al público.",
      107,
      236
    );

  //FOOTER
  doc
    .setFont("times", "bold")
    .setFontSize(10)
    .text(
      "Destinatario (consumidor, proveedor o INDECOPI según corresponda)",
      190,
      246,
      { align: "right" }
    );

  let legal1 =
    "* La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI";
  let legal2 =
    "* El proveedor deberá dar respuesta al reclamo en un plazo no mayor a quince (15) días hábiles.";

  doc
    .setFont("times", "normal")
    .setFontSize(10)
    .text(legal1, 22, 256, { align: "justify", maxWidth: 160 });
  doc
    .setFont("times", "normal")
    .setFontSize(10)
    .text(legal2, 22, 266, { align: "justify", maxWidth: 160 });

  //   doc.autoPrint();
  doc.save(`${params?.numeroReclamo}-${params?.numeroDocumento}`); //Para pruebas de descarga

  // return doc.output("arraybuffer"); //Para envío por correo.
};
