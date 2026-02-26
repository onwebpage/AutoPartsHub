import { motion } from "framer-motion";
import { FileText, Gavel, Scale, AlertCircle } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="py-24 bg-white text-zinc-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Terms of Service</h1>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Please read these terms carefully before using our services. By accessing Rex Auto Parts, you agree to be bound by these terms.
            </p>
          </div>

          <div className="space-y-12 prose prose-zinc max-w-none">
            <section className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                1. Agreement to Terms
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                These Terms of Service constitute a legally binding agreement made between you and Rex Auto Parts (RAP), concerning your access to and use of our website and services.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Gavel className="w-6 h-6 text-primary" />
                2. Part Quality & Condition
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                All used and rebuilt parts are inspected before shipping. However, as they are recycled components:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 space-y-2">
                <li>Parts are sold "as-is" unless otherwise specified in the warranty documentation.</li>
                <li>Mileage on used engines is approximate based on vehicle records.</li>
                <li>Cosmetic imperfections that do not affect performance are not grounds for return.</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Scale className="w-6 h-6 text-primary" />
                3. Shipping & Delivery
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                We offer nationwide shipping. Delivery times are estimates and may vary based on carrier availability and destination. Risk of loss passes to the customer once the item is handed to the carrier.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-primary" />
                4. Liability Limitations
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                Rex Auto Parts is not responsible for any labor costs, loss of use, or consequential damages resulting from the installation or failure of any parts sold. Professional installation is highly recommended for all major components.
              </p>
            </section>

            <section className="pt-8 border-t border-zinc-100">
              <p className="text-sm text-zinc-400 italic">
                Rex Auto Parts reserves the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
