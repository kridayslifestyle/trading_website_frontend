"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value:80,  suffix:"+",  label:"Countries Served",  desc:"Active trade relationships worldwide"       },
  { value:500, suffix:"+",  label:"Products Exported", desc:"Across 5 major product categories"          },
  { value:2000,suffix:"+",  label:"Happy Clients",     desc:"Trusted by buyers & suppliers globally"     },
  { value:10,  suffix:"yr", label:"Years Experience",  desc:"Established and reliable trade partner"     },
];

function Counter({target,suffix,start}:{target:number;suffix:string;start:boolean}) {
  const [v,setV]=useState(0);
  useEffect(()=>{
    if(!start) return;
    let t0:number|null=null;
    const D=2000;
    const step=(ts:number)=>{
      if(!t0) t0=ts;
      const p=Math.min((ts-t0)/D,1);
      const e=1-Math.pow(1-p,3);
      setV(Math.floor(e*target));
      if(p<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },[start,target]);
  return <>{v}{suffix}</>;
}

export default function StatsSection() {
  const ref=useRef<HTMLDivElement>(null);
  const [started,setStarted]=useState(false);
  useEffect(()=>{
    const ob=new IntersectionObserver(([e])=>{if(e.isIntersecting){setStarted(true);ob.disconnect();}},{threshold:.3});
    if(ref.current) ob.observe(ref.current);
    return()=>ob.disconnect();
  },[]);

  return (
    <section ref={ref} className="stats-section">
      <div className="container-custom">
        <div className="stats-grid">
          {STATS.map(({value,suffix,label,desc})=>(
            <div key={label} className="stat-card">
              <div className="stat-num tabular-nums">
                <Counter target={value} suffix={suffix} start={started} />
              </div>
              <div className="stat-lbl">{label}</div>
              <div className="stat-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}