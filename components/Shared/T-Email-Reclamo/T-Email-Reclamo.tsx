import { FC } from "react";

import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { iTEmailReclamo } from "@/types";

const urlSAI = process.env.URL_SAI ? `https://${process.env.URL_SAI}` : "";

export const TEmailReclamo: FC<Readonly<iTEmailReclamo>> = ({
  nombres,
  apellidos,
  fecha,
  hora,
  numeroReclamo,
  razonSocial,
  direccionSede,
  sedeCompra,
}) => {
  return (
    <Html>
      <Head />
      <Preview>
        {nombres}, tou reclamo ha sido registrado correctamente.
      </Preview>
      <Tailwind>
        <Body className="bg-white">
          <Container>
            <Section className="mx-8 my-5">
              <Img
                src={`${urlSAI}/images/logo-color.png`}
                width={250}
                alt="Logo Automotores Inka"
              />
            </Section>

            <Section className="rounded-xl border border-[rgb(0,0,0, 0.1)]">
              <Row>
                <Img
                  src={`${urlSAI}/images/sai-header.png`}
                  width={620}
                  alt="Imagen cabecera"
                  className="max-w-full"
                />
              </Row>

              <Row className="mt-5 mx-5 mb-0">
                <Column>
                  <Heading className="text-3xl font-bold text-center">
                    Hola {nombres} {apellidos},
                  </Heading>

                  <Heading as="h2" className="text-2xl font-bold text-center">
                    Tu reclamo ha sido registrado correctamente.
                  </Heading>

                  <Text>
                    <b>N° Reclamo: </b>
                    {numeroReclamo}
                  </Text>

                  <Text className="mt-1">
                    <b>Fecha: </b>
                    {fecha} {hora}
                  </Text>

                  <Text className="mt-1">
                    <b>Proveedor: </b>
                    {razonSocial}
                  </Text>

                  <Text className="mt-1">
                    <b>Concesionario: </b>
                    {sedeCompra}
                  </Text>

                  <Text>
                    Estaremos en contacto contigo a la brevedad posible luego de
                    revisar tu caso.
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section className="pt-11">
              <Img
                src={`${urlSAI}/images/sai-footer.png`}
                width={620}
                className="max-w-full"
              />
            </Section>

            <Text className="text-center text-xs text-slate-400">
              © 2024 | {razonSocial}, {direccionSede} |{" "}
              <a href="https://automotoresinka.pe">{urlSAI}</a>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
