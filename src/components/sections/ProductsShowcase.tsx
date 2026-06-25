import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PRODUCTS = [
  {
    emoji:"🪑",
    name:"Masaz Chairs & Furniture",
    desc:"Premium massage chairs, office furniture, living room sets — directly sourced from top Asian manufacturers.",
    tags:["🇨🇳 China","🇮🇩 Indonesia","🇻🇳 Vietnam"],
    tagClass:"bg-blue-50 text-blue-700",
    from:"from-blue-50/60",to:"to-indigo-50/40",border:"border-blue-100",
  },
  {
    emoji:"👗",
    name:"Clothing & Apparel",
    desc:"Ready-made garments, fashion wear, kids clothing, sportswear — all sizes, customisable branding available.",
    tags:["🇧🇩 Bangladesh","🇮🇳 Indo","🇹🇷 Turkey"],
    tagClass:"bg-pink-50 text-pink-700",
    from:"from-pink-50/60",to:"to-rose-50/40",border:"border-pink-100",
  },
  {
    emoji:"⚙️",
    name:"Engineering Tools & Machinery",
    desc:"Industrial machinery, precision tools, auto parts, heavy equipment — quality tested and certified.",
    tags:["🇩🇪 Germany","🇯🇵 Japan","🇮🇳 Indo"],
    tagClass:"bg-orange-50 text-orange-700",
    from:"from-orange-50/60",to:"to-amber-50/40",border:"border-orange-100",
  },
  {
    emoji:"🧵",
    name:"Textiles & Apparel",
    desc:"Raw fabrics, yarn, home textiles, denim, silk — sourced from verified mills with quality certifications.",
    tags:["🇮🇳 Indo","🇨🇳 China","🇵🇰 Pakistan"],
    tagClass:"bg-purple-50 text-purple-700",
    from:"from-purple-50/60",to:"to-violet-50/40",border:"border-purple-100",
  },
  {
    emoji:"🏠",
    name:"Home Products",
    desc:"Kitchenware, home décor, cleaning supplies, bedding, furniture — wide range for retail and wholesale buyers.",
    tags:["🇨🇳 China","🇮🇳 Indo","🇹🇭 Thailand"],
    tagClass:"bg-green-50 text-green-700",
    from:"from-green-50/60",to:"to-emerald-50/40",border:"border-green-100",
  },
];

export default function ProductsShowcase() {
  return (
    <section className="products-section section-pad">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label mb-4">What We Trade</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Product Categories
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Five core categories. Globally sourced. Quality guaranteed. Ready to ship anywhere in the world.
          </p>
        </div>

        {/* Grid */}
        <div className="products-grid">
          {PRODUCTS.map(({emoji,name,desc,tags,tagClass,from,to,border})=>(
            <div key={name} className={`prod-card bg-gradient-to-br ${from} ${to} border ${border}`}>
              <span className="prod-icon">{emoji}</span>
              <h3 className="font-display font-semibold text-slate-900 text-[1.05rem] mb-2">{name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tags.map(t=>(
                  <span key={t} className={`prod-tag ${tagClass}`}>{t}</span>
                ))}
              </div>
              <Link href="/products" className="prod-arrow">
                View Products <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="btn-primary">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}