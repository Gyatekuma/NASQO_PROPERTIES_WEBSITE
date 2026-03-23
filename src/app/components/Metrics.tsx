import React from 'react'
import { ArrowUpRight } from 'lucide-react';


interface metricsProps {
    title: string;
    subtext: string;
}

const Metrics: React.FC<metricsProps> = ({ title, subtext}) => {
    return (
        <div className="relative metrics_Card border border-neutral-200 py-[8%] md:py-[10%] lg:py-6 xl:py-3 2xl:py-5 px-[8%] xl:px-[6%] 2xl:px-[5%] rounded-2xl 2xl:rounded-3xl w-full flex flex-col cursor-pointer">
            <div className="absolute top-0 right-0 m-[5%] xl:m-[4%] icon rounded-full border border-neutral-200  w-[15%] xl:w-[12%] 2xl:h-[25%] xl:flex xl:items-center xl:justify-center h-[30%] xl:h-[28%] p-[2%] flex items-center">
                <ArrowUpRight className='w-5 h-auto text-black' />
            </div>
            <div className="text-value leading-2">
                <p className='font-bricolage tracking-tigher font-semibold text-4xl md:text-3xl xl:text-2xl 2xl:text-4xl'>{title}</p>
                <p className='font-mona tracking-tight text-neutral-500 text-xs xl:text-xs 2xl:text-sm'>{subtext}</p>
            </div>
        </div>
    )
}

export default Metrics
