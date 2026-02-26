import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Bell } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 tracking-tight">Privacy Policy</h1>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Last Updated: February 26, 2026. Your privacy is important to us. This policy outlines how we handle your personal information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
            <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900">Data Protection</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.
              </p>
            </div>
            <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900">Secure Payments</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Your payment information is processed securely through encrypted channels. We do not store full credit card numbers on our servers.
              </p>
            </div>
          </div>

          <div className="prose prose-zinc max-w-none">
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                Information We Collect
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                When you use Rex Auto Parts (RAP), we collect information that you provide directly to us, such as when you create an account, request a quote, or make a purchase. This may include:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 space-y-2">
                <li>Name and contact information (email, phone number, address)</li>
                <li>Vehicle identification numbers (VIN) and part requirements</li>
                <li>Payment and billing information</li>
                <li>Communication history with our support team</li>
              </ul>
            </section>

            <section className="space-y-6 pt-12">
              <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                <Bell className="w-6 h-6 text-primary" />
                How We Use Your Information
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, including:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 space-y-2">
                <li>Processing your orders and delivering parts nationwide</li>
                <li>Providing customer support and technical assistance</li>
                <li>Sending you updates about your order status</li>
                <li>Improving our inventory selection based on demand patterns</li>
              </ul>
            </section>

            <section className="space-y-6 pt-12 border-t border-zinc-100">
              <h2 className="text-2xl font-bold text-zinc-900">Third-Party Sharing</h2>
              <p className="text-zinc-600 leading-relaxed">
                We do not sell your personal information. We only share data with trusted partners necessary to fulfill your requests, such as shipping carriers and payment processors.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
