import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft, Info } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function RefundPolicy() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Button
            variant="ghost"
            className="mb-8 text-zinc-400 hover:text-white"
            onClick={() => setLocation("/")}
            data-testid="link-back-home"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight">
              Returns & Refund Policy
            </h1>
          </div>

          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl space-y-10">
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                Returns Policy
              </h2>
              <div className="text-zinc-400 leading-relaxed space-y-4">
                <p>
                  New unopened Engine Kits may be returned within 30 days of delivery for a full refund (minus any Restocking Fee if applicable). Items must be returned in same condition received. The original packaging must be completely intact. You are responsible for the return label fees.
                </p>
                <p>
                  Parts produced by RAP, such Crankshafts and Cylinder Heads, have a limited return/warranty window of 30 Days.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                Refund Expectations
              </h2>
              <div className="text-zinc-400 leading-relaxed space-y-4">
                <p>
                  Generally, you should expect to receive your refund within four weeks of giving your package to the return shipper. This time period includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Transit time for us to receive your return from the shipper (5 to 10 business days)</li>
                  <li>Time it takes us to process your return once we receive it (3 to 5 business days)</li>
                  <li>Time it takes your bank to process our refund request (5 to 10 business days)</li>
                </ul>
                <p className="italic">However, most refunds are completed more quickly than this.</p>
              </div>
            </section>

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4">
              <Info className="w-6 h-6 text-primary shrink-0" />
              <p className="text-sm text-zinc-300">
                If you need to return an item, simply use your order number with your invoice number, We'll notify you via e-mail of your refund status and eligibility.
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-red-500">
                Non-Returnable Items
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                Returns are not accepted on Engines, Stroker Engines, Stroker kits, custom builds, High Performance engines, or any items requiring machining.
              </p>
            </section>

            <section className="p-8 rounded-2xl bg-zinc-950/50 border border-white/5">
              <h2 className="text-xl font-display font-bold text-white mb-2">Restocking Fee</h2>
              <p className="text-zinc-400">
                All Engines & Items that are requested to be canceled or returned are subject to a restocking fee equal to <span className="text-white font-bold">8%</span> of the total amount of the purchase price.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
