import { FC } from "react";

import {
  Body,
  Button,
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

import { formatPENPrice, formatUSDPrice } from "@/lib";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import { iEmailTemplate } from "@/types";

export const EmailTemplate: FC<Readonly<iEmailTemplate>> = ({
  celular,
  checkDatosPersonales,
  checkPromociones,
  concesionario,
  departamento,
  email,
  imageUrl,
  intencionCompra,
  marca,
  modelo,
  nombres,
  numeroDocumento,
  precioBase,
  tipoDocumento,
}) => (
  <Html>
    <Head />
    <Preview>Testing</Preview>
    <Tailwind>
      <Body className=" bg-grisInka/5 border-2 border-purple-600">
        <Container className="p-5 flex flex-col gap-2">
          <Section className="max-w-4xl mx-auto">
            <Img
              src="https://utfs.io/f/DvD6I6Zej8uOr9CrZMC5XkCSst3WvpLH2mABiaOEJ4gd7rqN"
              alt="Logo Automotores Inka"
              className="w-[250px] mb-5"
            />
          </Section>
          <Section className="max-w-4xl mx-auto p-2">
            <Heading className="text-3xl font-headMedium block leading-6">
              Gracias <span className="text-[#6b67f5]">{nombres},</span> por
              confiar en nosotros.
            </Heading>
          </Section>
          <Section className="max-w-4xl mx-auto">
            <Section className="flex flex-col-reverse gap-y-5 p-3">
              <Row>
                <Column>
                  <table className="border-slate-300 mx-auto border-2 w-full">
                    <thead className="text-center bg-[#6b67f5] text-white font-headMedium">
                      <tr>
                        <td className="p-2 border border-slate-300">
                          Parámetro
                        </td>
                        <td className="p-2 border border-slate-300">Valor</td>
                      </tr>
                    </thead>
                    <tbody className="text-center bg-white text-black text-sm font-textRegular">
                      <tr>
                        <td className="p-2 border border-slate-300 font-bold">
                          Tipo de Documento
                        </td>
                        <td className="p-2 border border-slate-300 uppercase">
                          {tipoDocumento}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-300 font-bold">
                          {tipoDocumento.toUpperCase()}
                        </td>
                        <td className="p-2 border border-slate-300 uppercase">
                          {numeroDocumento}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-300 font-bold">
                          Cliente
                        </td>
                        <td className="p-2 border border-slate-300">
                          {nombres}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-300 font-bold">
                          Celular
                        </td>
                        <td className="p-2 border border-slate-300">
                          {celular}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-300 font-bold">
                          Email
                        </td>
                        <td className="p-2 border border-slate-300">{email}</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-300 font-bold">
                          Sede
                        </td>
                        <td className="p-2 border border-slate-300 capitalize">
                          {departamento}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-300 font-bold">
                          Concesionario
                        </td>
                        <td className="p-2 border border-slate-300 capitalize">
                          {concesionario}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-300 font-bold">
                          Intención de compra
                        </td>
                        <td className="p-2 border border-slate-300 capitalize">
                          {intencionCompra.replace(/-/g, " ")}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-300 font-bold">
                          Autorización de Datos Personales
                        </td>
                        <td className="p-2 border border-slate-300 capitalize">
                          {checkDatosPersonales
                            ? "Si autorizo 👍"
                            : "No autorizo 👎"}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-300 font-bold">
                          Autorización de Newsletter
                        </td>
                        <td className="p-2 border border-slate-300 capitalize">
                          {checkPromociones
                            ? "Si autorizo 👍"
                            : "No autorizo 👎"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Column>
                <Column className="flex flex-col gap-1 items-center justify-center">
                  <Img
                    src={imageUrl}
                    alt={modelo}
                    className="w-full -mt-14 mb-8"
                  />
                  <Text className="font-headRegular text-2xl">{marca}</Text>
                  <Text className="font-headMedium text-3xl">{modelo}</Text>
                  <Section className="flex flex-row items-center justify-center gap-2">
                    <Text className="text-xl font-textItalicMedium">
                      {formatUSDPrice(precioBase)}
                    </Text>
                    <Text className="text-xl font-textMedium">|</Text>
                    <Text className="text-xl font-textItalicMedium">
                      {formatPENPrice(precioBase * 3.8)}
                    </Text>
                  </Section>
                </Column>
              </Row>
            </Section>
          </Section>
          <Section className="max-w-4xl mx-auto mt-8">
            <Section className="bg-[#6b67f5] rounded-lg text-center">
              <Section className="p-10 text-white flex flex-col gap-5">
                <Heading className="text-center font-headBold text-2xl">
                  Vive una gran experiencia
                </Heading>
                <Text className="leading-1 text-justify font-textRegular text-base">
                  Te invito a visitarnos en nuestros canales digitales o en
                  nuestra renovada página web dónde encontrarás una variedad de
                  modelos que se ajusten a tus necesidades.
                </Text>
                <Button
                  href="https://automotoresinka.pe"
                  target="_blank"
                  className="bg-[#ffffff] text-[#6b67f5] text-center text-[16px] px-3 py-2 rounded-md mx-auto"
                >
                  Ir a la web
                </Button>
              </Section>
            </Section>
          </Section>
          <Section className="w-full bg-[#090660] mt-10 text-white">
            <Section className="max-w-4xl mx-auto">
              <Section className="p-10 flex flex-col gap-5">
                <Section className="flex flex-row items-center justify-center gap-5">
                  <Link
                    href="https://www.facebook.com/dealer.automotoresinka"
                    target="_blank"
                  >
                    <FaFacebook
                      className="w-6 h-6 text-[#fff]"
                      strokeWidth={2}
                    ></FaFacebook>
                  </Link>
                  <Link
                    href="https://www.instagram.com/automotoresinka/"
                    target="_blank"
                  >
                    <FaInstagram
                      className="w-6 h-6 text-[#fff]"
                      strokeWidth={2}
                    ></FaInstagram>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/dealerautomotoresinka/"
                    target="_blank"
                  >
                    <FaLinkedinIn
                      className="w-6 h-6 text-[#fff]"
                      strokeWidth={2}
                    ></FaLinkedinIn>
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@automotoresinka"
                    target="_blank"
                  >
                    <FaTiktok
                      className="w-6 h-6 text-[#fff]"
                      strokeWidth={2}
                    ></FaTiktok>
                  </Link>
                </Section>
                <Text className="leading-5 text-base text-center font-textRegular">
                  Trabajamos comprometidos en buen servicio a nuestros clientes,
                  realizando todas nuestras actividades basándonos en la
                  productividad, transparencia y el cliente primero. Esta imagen
                  es posible gracias al trabajo constante y profesional de cada
                  miembro de nuestra organización porque para nosotros el
                  cliente es parte de nuestra familia.
                </Text>
              </Section>
            </Section>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
