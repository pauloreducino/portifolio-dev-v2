"use client";

import type React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Mail, Phone, MapPin, Wrench, ArrowRight } from "lucide-react";

export function Contact() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  // Toggle rápido pra reativar o formulário no futuro (true = mostra "Em construção")
  const FORM_UNDER_CONSTRUCTION = true;

  // Mantive o state caso você volte o form depois
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <section
      id="contato"
      className="py-20 lg:py-32 bg-accent/5 relative"
      ref={ref}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Vamos Conversar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estou disponível para novos projetos e oportunidades. Entre em
            contato!
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Coluna: Informações de contato (inalterada) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Informações de Contato
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Estou sempre aberto a discutir novos projetos, ideias criativas
                ou oportunidades para fazer parte da sua visão. Vamos criar algo
                incrível juntos!
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:paulo.a.reducino@gmail.com"
                className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">
                    paulo.a.reducino@gmail.com
                  </p>
                </div>
              </a>

              {/* Card do telefone agora abre o WhatsApp (wa.me) */}
              <a
                href="https://wa.me/5598970265510"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir WhatsApp para (98) 97026-5510"
                className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Telefone</p>
                  <p className="text-sm text-muted-foreground">
                    (98) 97026-5510
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Localização</p>
                  <p className="text-sm text-muted-foreground">
                    São Luís, Maranhão, Brasil
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Coluna: Placeholder "Em Construção" no lugar do formulário */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {FORM_UNDER_CONSTRUCTION ? (
              <div className="h-full rounded-xl border border-dashed border-border bg-card p-8 flex flex-col items-center justify-center text-center">
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-full bg-primary/10">
                  <Wrench className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl font-bold">Formulário em construção</h3>
                <p className="mt-2 text-muted-foreground max-w-md">
                  Em breve você poderá enviar sua mensagem por aqui. Enquanto
                  isso, fale comigo por e-mail ou WhatsApp.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:paulo.a.reducino@gmail.com?subject=Contato%20pelo%20site"
                    className="inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition"
                  >
                    Enviar e-mail
                    <ArrowRight size={16} className="ml-2" />
                  </a>
                  <a
                    href="https://wa.me/5598970265510"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border px-4 py-2 hover:bg-accent/50 transition"
                  >
                    Abrir WhatsApp
                  </a>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  *Se preferir, me chame também no{" "}
                  <a
                    href="https://wa.me/5598970265510"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    WhatsApp
                  </a>
                  .
                </p>
              </div>
            ) : (
              // 👉 Quando quiser ativar o formulário novamente, substitua este bloco pelo form original
              <div className="rounded-xl border border-border bg-card p-8">
                {/* coloque aqui o <form> antigo quando finalizar */}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
