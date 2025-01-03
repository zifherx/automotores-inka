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

import { formatPENPrice, formatPENTipoCambio, formatUSDPrice } from "@/lib";
import { iTEmailCotizacion } from "@/types";

const urlSAI = process.env.URL_SAI ? `https://${process.env.URL_SAI}` : "";

export const TEmailCotizacion: FC<Readonly<iTEmailCotizacion>> = ({
  nombres,
  imageUrl,
  tipoDocumento,
  numeroDocumento,
  departamento,
  concesionario,
  celular,
  email,
  intencionCompra,
  checkDatosPersonales,
  checkPromociones,
  marca,
  modelo,
  precioBase,
  tcambio,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Gracias {nombres} por cotizar con nosotros!</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="bg-white w-[680px] max-w-full mx-0 my-auto p-5 mb-16">
            <Section className="flex bg-transparent px-5 py-8">
              <Img
                src={`${urlSAI}/images/logo-color.png`}
                width={250}
                alt="Logo Automotores Inka"
              />
            </Section>

            <Section className="bg-[#1b5094] rounded-t-lg flex flex-col">
              <Row>
                <Column className="p-5">
                  <Heading className="text-white text-2xl font-headBold">
                    {nombres},
                  </Heading>
                  <Text className="text-white text-base font-textRegular">
                    Gracias por confiar en nosotros <br />
                    Pronto... tu nuevo auto estará en tu garage.
                  </Text>
                </Column>
                <Column className="px-7 py-3">
                  <Img
                    src="https://utfs.io/f/DvD6I6Zej8uO8jgAjtfcEgOfKoyeu0JP1iQAtzpnGFdXD8Rw"
                    width={340}
                    className="max-w-full"
                  />
                </Column>
              </Row>
            </Section>

            <Section className="border-collapse border-spacing-0 text-[#333333] bg-[#FAFAFA] rounded-sm text-sm">
              <Row className="mt-5">
                <Column colSpan={2}>
                  <Section>
                    <Row>
                      <Column className="pl-5 border-solid border-white border-b-2 border-r-2 border-l-0 border-t-0 h-11">
                        <Text className="m-0 p-0 leading-6 text-[#666666] text-xs">
                          CLIENTE
                        </Text>
                        <Link className="text-sm m-0 p-0 leading-6 text-[#1b5094] underline">
                          {nombres}
                        </Link>
                      </Column>
                    </Row>
                    <Row>
                      <Column className="pl-5 border-solid border-white border-b-2 border-r-2 border-l-0 border-t-0 h-11">
                        <Text className="m-0 p-0 leading-6 text-[#666666] text-xs">
                          TIPO
                        </Text>
                        <Text className="text-sm m-0 p-0 leading-6 uppercase">
                          {tipoDocumento}
                        </Text>
                      </Column>
                      <Column className="pl-5 border-solid border-white border-b-2 border-r-2 border-l-0 border-t-0 h-11">
                        <Text className="m-0 p-0 leading-6 text-[#666666] text-xs">
                          N° DOCUMENTO
                        </Text>
                        <Text className="text-sm m-0 p-0 leading-6">
                          {numeroDocumento}
                        </Text>
                      </Column>
                    </Row>
                    <Row>
                      <Column className="pl-5 border-solid border-white border-b-2 border-r-2 border-l-0 border-t-0 h-11">
                        <Text className="m-0 p-0 leading-6 text-[#666666] text-xs">
                          CELULAR
                        </Text>
                        <Text className="text-sm m-0 p-0 leading-6">
                          {celular}
                        </Text>
                      </Column>
                      <Column className="pl-5 border-solid border-white border-b-2 border-r-2 border-l-0 border-t-0 h-11">
                        <Text className="m-0 p-0 leading-6 text-[#666666] text-xs">
                          EMAIL
                        </Text>
                        <Link className="text-sm m-0 p-0 leading-6 text-[#1b5094] underline">
                          {email}
                        </Link>
                      </Column>
                    </Row>
                    <Row>
                      <Column className="pl-5 border-solid border-white border-b-2 border-r-2 border-l-0 border-t-0 h-11">
                        <Text className="m-0 p-0 leading-6 text-[#666666] text-xs">
                          SEDE
                        </Text>
                        <Text className="text-sm m-0 p-0 leading-6 capitalize">
                          {departamento}
                        </Text>
                      </Column>
                      <Column className="pl-5 border-solid border-white border-b-2 border-r-2 border-l-0 border-t-0 h-11">
                        <Text className="m-0 p-0 leading-6 text-[#666666] text-xs">
                          CONCESIONARIO
                        </Text>
                        <Text className="text-sm m-0 p-0 leading-6">
                          {concesionario}
                        </Text>
                      </Column>
                    </Row>
                    <Row>
                      <Column className="pl-5 border-solid border-white border-b-2 border-r-2 border-l-0 border-t-0 h-11">
                        <Text className="m-0 p-0 leading-6 text-[#666666] text-xs">
                          INTENCIÓN DE COMPRA
                        </Text>
                        <Link className="text-sm m-0 p-0 leading-6">
                          {intencionCompra.toUpperCase().replace(/-/g, " ")}
                        </Link>
                      </Column>
                    </Row>
                    <Row>
                      <Column className="pl-5 border-solid border-white border-b-2 border-r-2 border-l-0 border-t-0 h-11">
                        <Text className="m-0 p-0 leading-6 text-[#666666] text-xs">
                          AUTORIZACION DE DATOS PERSONALES
                        </Text>
                        <Text className="text-sm m-0 p-0 leading-6">
                          {checkDatosPersonales
                            ? "Sí autorizo 😃"
                            : "No autorizo 😭"}
                        </Text>
                      </Column>
                      <Column className="pl-5 border-solid border-white border-b-2 border-r-2 border-l-0 border-t-0 h-11">
                        <Text className="m-0 p-0 leading-6 text-[#666666] text-xs">
                          AUTORIZACION DE NEWSLETTER
                        </Text>
                        <Text className="text-sm m-0 p-0 leading-6">
                          {checkPromociones == "yes"
                            ? "Sí autorizo 😃"
                            : "No autorizo 😭"}
                        </Text>
                      </Column>
                    </Row>
                  </Section>
                </Column>
                <Column
                  colSpan={2}
                  className="pl-5 border-solid border-white border-b border-r border-l-0 border-t-0 h-11"
                >
                  <Text className="m-0 p-0 leading-6 text-[#666666] text-xs">
                    UNIDAD VEHICULAR
                  </Text>
                  <Text className="text-sm m-0 p-0 leading-6">{marca}</Text>
                  <Text className="text-sm m-0 p-0 leading-6">{modelo}</Text>
                  <Text className="text-sm m-0 p-0 leading-6">
                    {formatUSDPrice(precioBase)} |{" "}
                    {formatPENPrice(precioBase * tcambio)}
                  </Text>
                  <Text className="text-xs mx-0 p-0 leading-6">
                    Tipo Cambio ({formatPENTipoCambio(tcambio)})
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section>
              <Row>
                <Column>
                  <Img
                    src={imageUrl}
                    alt={`${marca} - ${modelo}`}
                    className="mx-auto"
                  />
                </Column>
              </Row>
            </Section>

            <Section className="flex py-4 px-6 bg-[#6b67f5]">
              <Heading
                as="h2"
                className="text-white text-center mt-0 mb-4 text-2xl font-headBold"
              >
                Vive una gran experiencia
              </Heading>
              <Text className="text-white text-center mx-auto text-lg leading-5 font-textRegular">
                Te invito a visitarnos en nuestros canales digitales o en
                nuestra renovada página web dónde encontrarás una variedad de
                modelos que se ajusten a tus necesidades.
              </Text>

              <Link
                className="block my-3 w-fit mx-auto rounded-lg px-3 py-2 font-textMedium bg-white text-[#6b67f5]"
                href={urlSAI}
                target="_blank"
              >
                I a la web
              </Link>
            </Section>

            <Section className="flex py-4 px-6 bg-[#090660]">
              <Row>
                <Column>
                  <Section className="flex items-center justify-center">
                    <Row align="center">
                      <Column className="pr-3">
                        <Link
                          href="https://www.instagram.com/automotoresinka/"
                          target="_blank"
                        >
                          <Img
                            src="https://utfs.io/f/DvD6I6Zej8uO20aqbPT3BpMcxZlhkub9aQzStfN6WwJvC1Gq"
                            // src={`${urlSAI}/images/redes/facebook.svg`}
                            alt="Facebook SAI"
                            width={28}
                          />
                        </Link>
                      </Column>
                      <Column className="pr-3">
                        <Link
                          href="https://www.instagram.com/automotoresinka/"
                          target="_blank"
                        >
                          <Img
                            src="https://utfs.io/f/DvD6I6Zej8uOhC4JYG2uylUM0mQnqz3PpfiG8dICN1Ojabcw"
                            // src={`${url}/images/redes/instagram.svg`}
                            alt="Instagram SAI"
                            width={28}
                          />
                        </Link>
                      </Column>
                      <Column className="pr-3">
                        <Link
                          href="https://www.linkedin.com/company/dealerautomotoresinka/"
                          target="_blank"
                        >
                          <Img
                            src="https://utfs.io/f/DvD6I6Zej8uOWx6v4FApJ4CeoEFZr652K1zUxsbnXYavlBIP"
                            // src={`${urlSAI}/images/redes/linkedin.svg`}
                            alt="LinkedIn SAI"
                            width={28}
                          />
                        </Link>
                      </Column>
                      <Column>
                        <Link
                          href="https://www.tiktok.com/@automotoresinka"
                          target="_blank"
                        >
                          <Img
                            src="https://utfs.io/f/DvD6I6Zej8uOY5otruae3gWhtraLwbdSHvyAlekizfxo81Kn"
                            // src={`${urlSAI}/images/redes/tiktok.svg`}
                            alt="Tiktok SAI"
                            width={28}
                          />
                        </Link>
                      </Column>
                    </Row>
                  </Section>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text className="text-white mx-auto text-xs text-center leading-5 font-textRegular">
                    Te invito a visitarnos en nuestros canales digitales o en
                    nuestra renovada página web dónde encontrarás una variedad
                    de modelos que se ajusten a tus necesidades.
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section>
              <Row>
                <Column align="center" className="block mt-10">
                  <Img
                    src={`${urlSAI}/images/logo-color.png`}
                    width="150"
                    alt="Automotores Inka"
                  />
                </Column>
              </Row>
            </Section>

            <Section>
              <Text className="text-center leading-5 text-sm">
                Copyright © 2024 Automotores Inka <br />{" "}
                <Link href="https://www.automotoresinka.pe">
                  Todos los derechos reservados
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
