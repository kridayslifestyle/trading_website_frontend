"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, X } from "lucide-react";

const CATEGORIES = ["All","Masaz Chairs & Furniture","Clothing & Apparel","Engineering Tools & Machinery","Textiles & Apparel","Home Products"];

const PRODUCTS = [
  { id:1,  name:"Luxury Massage Chair Pro",      category:"Masaz Chairs & Furniture",      emoji:"🪑", origin:"China",      moq:"10 units",  price:"$299–$599",  tags:["Premium","Bestseller"] },
  { id:2,  name:"Office Ergonomic Chair Set",    category:"Masaz Chairs & Furniture",      emoji:"🪑", origin:"Vietnam",    moq:"50 units",  price:"$49–$120",   tags:["Bulk Available"] },
  { id:3,  name:"Living Room Sofa Set",          category:"Masaz Chairs & Furniture",      emoji:"🛋️", origin:"China",      moq:"5 units",   price:"$199–$899",  tags:["Custom Orders"] },
  { id:4,  name:"Men's Casual Wear Collection",  category:"Clothing & Apparel",            emoji:"👔", origin:"Bangladesh", moq:"200 pcs",   price:"$5–$18",     tags:["OEM Available"] },
  { id:5,  name:"Women's Fashion Dresses",       category:"Clothing & Apparel",            emoji:"👗", origin:"Indo",       moq:"100 pcs",   price:"$8–$25",     tags:["Trending"] },
  { id:6,  name:"Kids Sportswear Bundle",        category:"Clothing & Apparel",            emoji:"🧒", origin:"Turkey",     moq:"200 pcs",   price:"$4–$12",     tags:["Seasonal"] },
  { id:7,  name:"Industrial CNC Machine",        category:"Engineering Tools & Machinery", emoji:"⚙️", origin:"Germany",    moq:"1 unit",    price:"$8,000+",    tags:["Heavy Machinery"] },
  { id:8,  name:"Precision Hand Tools Set",      category:"Engineering Tools & Machinery", emoji:"🔧", origin:"Japan",      moq:"100 sets",  price:"$25–$80",    tags:["Certified"] },
  { id:9,  name:"Auto Parts — Engine Kit",       category:"Engineering Tools & Machinery", emoji:"🔩", origin:"Indo",       moq:"50 units",  price:"$120–$450",  tags:["OEM"] },
  { id:10, name:"Cotton Yarn — Fine Count",      category:"Textiles & Apparel",            emoji:"🧵", origin:"Indo",       moq:"500 kg",    price:"$2.5/kg",    tags:["Raw Material"] },
  { id:11, name:"Denim Fabric Roll",             category:"Textiles & Apparel",            emoji:"👖", origin:"China",      moq:"1000 m",    price:"$3–$6/m",    tags:["Bulk"] },
  { id:12, name:"Silk Fabric Premium",           category:"Textiles & Apparel",            emoji:"🎀", origin:"Indo",       moq:"500 m",     price:"$8–$20/m",   tags:["Premium"] },
  { id:13, name:"Non-Stick Cookware Set",        category:"Home Products",                 emoji:"🍳", origin:"China",      moq:"100 sets",  price:"$15–$45",    tags:["Bestseller"] },
  { id:14, name:"Home Décor Bundle",             category:"Home Products",                 emoji:"🏺", origin:"Indo",       moq:"50 sets",   price:"$10–$60",    tags:["Handcrafted"] },
  { id:15, name:"Bedding & Pillow Set",          category:"Home Products",                 emoji:"🛏️", origin:"China",      moq:"200 sets",  price:"$12–$35",    tags:["OEM Available"] },
];

export default function ProductsPage() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter(p => {
    const matchCat    = active === "All" || p.category === active;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ paddingTop:"80px", background:"#f8faff", minHeight:"100vh" }}>

      {/* Hero banner */}
      <div style={{ background:"linear-gradient(135deg,#020e47 0%,#0e37b0 55%,#1a5cf2 100%)", padding:"4rem 0 3rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none" }}/>
        <div className="container-custom" style={{ position:"relative",zIndex:1,textAlign:"center" }}>
          <span style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"5px 14px",borderRadius:99,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",color:"rgba(191,219,254,1)",fontSize:".72rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase" as const,marginBottom:"1rem" }}>
            📦 Our Products
          </span>
          <h1 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#fff",marginBottom:".75rem",letterSpacing:"-.025em" }}>
            Browse Our Product Catalog
          </h1>
          <p style={{ color:"rgba(147,197,253,.9)",fontSize:"1.05rem",maxWidth:"520px",margin:"0 auto" }}>
            Quality-verified products across 5 categories. Ready to import or export worldwide.
          </p>
        </div>
      </div>

      <div className="container-custom" style={{ padding:"3rem 1.25rem" }}>

        {/* Search bar */}
        <div style={{ display:"flex",gap:"1rem",marginBottom:"1.75rem",flexWrap:"wrap" as const,alignItems:"center" }}>
          <div style={{ position:"relative",flex:1,minWidth:"220px" }}>
            <Search style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",width:16,height:16,color:"#94a3b8" }}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products…"
              style={{ width:"100%",padding:".75rem 1rem .75rem 2.75rem",borderRadius:"1rem",border:"1.5px solid #e2e8f0",fontSize:".875rem",background:"#fff",outline:"none",boxShadow:"0 2px 8px rgba(0,0,0,.04)" }}/>
            {search && <button onClick={()=>setSearch("")} style={{ position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer" }}><X style={{ width:14,height:14,color:"#94a3b8" }}/></button>}
          </div>
          <span style={{ fontSize:".85rem",color:"#64748b",whiteSpace:"nowrap" as const }}>{filtered.length} product{filtered.length!==1?"s":""} found</span>
        </div>

        {/* Category tabs */}
        <div style={{ display:"flex",gap:".625rem",flexWrap:"wrap" as const,marginBottom:"2.5rem" }}>
          {CATEGORIES.map(cat=>(
            <button key={cat} onClick={()=>setActive(cat)} style={{
              padding:".5rem 1.1rem",borderRadius:99,fontSize:".8125rem",fontWeight:600,
              border:"1.5px solid",cursor:"pointer",transition:"all .2s",
              background:active===cat?"#1a5cf2":"#fff",
              borderColor:active===cat?"#1a5cf2":"#e2e8f0",
              color:active===cat?"#fff":"#475569",
              boxShadow:active===cat?"0 4px 12px rgba(26,92,242,.3)":"none",
            }}>{cat}</button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length===0 ? (
          <div style={{ textAlign:"center",padding:"5rem 0",color:"#94a3b8" }}>
            <div style={{ fontSize:"3rem",marginBottom:"1rem" }}>🔍</div>
            <p style={{ fontSize:"1rem",fontWeight:600,color:"#475569" }}>No products found</p>
            <p style={{ fontSize:".875rem",marginTop:".5rem" }}>Try a different search or category</p>
          </div>
        ):(
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1.5rem" }}>
            {filtered.map(p=>(
              <div key={p.id} className="card" style={{ padding:"1.75rem",cursor:"pointer",transition:"transform .28s cubic-bezier(.34,1.56,.64,1),box-shadow .28s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-7px)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}>
                <div style={{ fontSize:"2.75rem",marginBottom:"1rem" }}>{p.emoji}</div>
                <div style={{ display:"flex",flexWrap:"wrap" as const,gap:".375rem",marginBottom:".875rem" }}>
                  {p.tags.map(t=>(
                    <span key={t} style={{ fontSize:".68rem",padding:"3px 9px",borderRadius:99,background:"rgba(26,92,242,.07)",color:"#1a5cf2",fontWeight:600,border:"1px solid rgba(26,92,242,.12)" }}>{t}</span>
                  ))}
                </div>
                <h3 style={{ fontFamily:"'Clash Display',sans-serif",fontSize:"1rem",fontWeight:600,color:"#0f172a",marginBottom:".375rem" }}>{p.name}</h3>
                <p style={{ fontSize:".8rem",color:"#64748b",marginBottom:"1.25rem" }}>📦 {p.category}</p>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5rem",marginBottom:"1.25rem" }}>
                  {[{l:"Origin",v:p.origin},{l:"MOQ",v:p.moq},{l:"Price",v:p.price}].map(({l,v})=>(
                    <div key={l} style={{ background:"#f8faff",borderRadius:".75rem",padding:".6rem .75rem",border:"1px solid #f1f5f9" }}>
                      <div style={{ fontSize:".65rem",fontWeight:600,color:"#94a3b8",textTransform:"uppercase" as const,letterSpacing:".05em",marginBottom:2 }}>{l}</div>
                      <div style={{ fontSize:".8125rem",fontWeight:600,color:"#1e293b" }}>{v}</div>
                    </div>
                  ))}
                </div>
                <Link href="/inquiry" style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:".7rem",borderRadius:"1rem",background:"linear-gradient(135deg,#1a5cf2,#3d7cf5)",color:"#fff",fontWeight:600,fontSize:".8125rem",boxShadow:"0 4px 12px rgba(26,92,242,.28)" }}>
                  Request Quote <ArrowRight style={{ width:14,height:14 }}/>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}