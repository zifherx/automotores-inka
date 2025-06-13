"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import { ContactFormAccesoriesValues, formContactAccesorios } from "@/forms";
import {
  CheckCircle,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormAccesoriesValues>({
    resolver: zodResolver(formContactAccesorios),
    defaultValues: {
      email: "",
      message: "",
      name: "",
      phone: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: ContactFormAccesoriesValues) => {
    console.log(values);
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2 text-slate-800">
          ¿No encuentras lo que buscas?
        </h3>
        <p className="text-slate-600">
          Completa el formulario y nuestro equipo te contactará a la brevedad
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-8 h-8 text-green-600" />
            </motion.div>
            <h4 className="text-xl font-semibold text-green-800 mb-2">
              ¡Consulta enviada exitosamente!
            </h4>
            <p className="text-green-700 mb-4">
              Tu consulta ha sido enviada por WhatsApp. Nos pondremos en
              contacto contigo pronto.
            </p>
            <Button
              variant="outline"
              onClick={() => setIsSubmitted(false)}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              Enviar otra consulta
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Personal Information */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre completo *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa tu nombre completo"
                            className="h-12"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Correo electrónico *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="tu@email.com"
                              className="h-12"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Teléfono
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+51 999 999 999"
                              className="h-12"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Mensaje *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe qué producto estás buscando, características específicas, o cualquier pregunta que tengas..."
                          className="min-h-[80px]"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 h-12 text-lg relative overflow-hidden group"
                  disabled={isSubmitting}
                >
                  <motion.span
                    className="flex items-center justify-center gap-2"
                    animate={{ opacity: isSubmitting ? 0 : 1 }}
                  >
                    <Send className="w-5 h-5" />
                    Enviar Consulta
                  </motion.span>

                  <AnimatePresence>
                    {isSubmitting && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="ml-2">Enviando...</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>

                {/* Form Info */}
                <div className="text-center text-sm text-slate-500 bg-slate-50 rounded-lg p-4">
                  <p className="flex items-center justify-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Tu consulta será enviada directamente por WhatsApp
                  </p>
                  <p>
                    Respuesta garantizada en menos de 2 horas en horario laboral
                  </p>
                </div>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
