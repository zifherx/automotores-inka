import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/Shared/LoadingIcon";

import { EmailModuleFormValues, formEmailModule } from "@/forms";
import { iFormAddGeneral } from "@/types";
import { Send } from "lucide-react";
import { onToast } from "@/lib";

export function FormAddEmail(props: iFormAddGeneral) {
  const { setOpenDialog } = props;

  const router = useRouter();

  const [btnLoading, setBtnLoading] = useState(false);

  const form = useForm<EmailModuleFormValues>({
    resolver: zodResolver(formEmailModule),
    defaultValues: {
      email: "",
      isActive: true,
    },
  });

  const onSubmit = async (values: EmailModuleFormValues) => {
    setBtnLoading(true);

    try {
      const query = await axios.post("/api/system/email", values);
      if (query.status === 200) {
        onToast(query.data.message);
        setBtnLoading(false);
        setOpenDialog(false);
        router.refresh();
      }
    } catch (err) {
      setBtnLoading(false);
      onToast("Algo salió mal ❌", "", true);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-[70%,1fr] gap-5">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    placeholder="abc@email.com..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* isActive */}
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">Estado</FormLabel>
                <FormControl>
                  <div className="flex gap-1 pt-1 items-center">
                    <Switch
                      id="formSwitch"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="formSwitch">
                      {field.value ? "Activo 👍" : "Inactivo 👎"}
                    </Label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full font-headMedium text-xl uppercase bg-black hover:bg-grisDarkInka"
        >
          {btnLoading ? (
            <>
              <LoadingIcon effect="default" />
              Enviando...
            </>
          ) : (
            <>
              Enviar
              <Send className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
